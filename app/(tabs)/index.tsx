import {View, TextInput, FlatList, Text, Alert, Platform} from 'react-native';
import Header from "@/components/Header";
import {useState, useEffect} from 'react';
import {searchBooks} from '@/api/books';
import {BookItem} from "@/components/BookItem";
import {useQuery, keepPreviousData} from '@tanstack/react-query';
import {useGridColumns} from "@/hooks/useGridColumns";
import {router} from 'expo-router';
import {homeStyles} from "@/styles/homeStyles";
import {useAuthStore} from "@/store/authStore";
import {useWishlistStore} from '@/store/useWishlistStore';
import {Book} from "@/types/book";


export default function HomeScreen() {
    const {isLoggedIn} = useAuthStore();
    const [query, setQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const {wishlist, toggleWishlist} = useWishlistStore();
    const {numColumns, itemWidth} = useGridColumns();

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query);
        }, 400);
        return () => clearTimeout(timer);
    }, [query]);


    const {data, isLoading, isError} = useQuery({
        queryKey: ['books', debouncedQuery],
        queryFn: () => searchBooks(debouncedQuery || '에세이'),
        placeholderData: keepPreviousData, // 검색어가 바뀔때 이전 결과를 유지해주는 옵션
    });

    const handleToggleWishlist = (item: Book) => {
        if (!isLoggedIn) {
            if (Platform.OS === 'web') {
                const confirm = window.confirm('로그인 후 이용 가능합니다. 로그인하시겠습니까?');
                if (confirm) router.push('/login');
            } else {
                Alert.alert(
                    '로그인 필요',
                    '로그인 후 이용 가능합니다. 로그인하시겠습니까?',
                    [
                        {text: '취소', style: 'cancel'},
                        {text: '로그인', onPress: () => router.push('/login')},
                    ]
                );
            }
            return;
        }
        toggleWishlist(item);
    };


    return (
        <View style={homeStyles.container}>
            <Header/>
            <FlatList data={data}
                      numColumns={numColumns}
                      key={numColumns}
                      columnWrapperStyle={homeStyles.columnWrapper}
                      contentContainerStyle={{flexGrow: 1}}
                      keyExtractor={(item, index) => item.isbn + index}
                      ListHeaderComponent={
                          <TextInput
                              style={homeStyles.input}
                              placeholder={"검색어를 입력하세요"}
                              value={query}
                              onChangeText={setQuery}
                          />
                      }

                      renderItem={({item}) => (
                          <BookItem
                              item={item}
                              isWished={wishlist.some(w => w.isbn === item.isbn)}
                              onToggle={handleToggleWishlist}
                              itemWidth={itemWidth}
                          />
                      )}
                      ListEmptyComponent={
                          isLoading ? (
                              <View style={homeStyles.emptyContainer}>
                                  <Text style={homeStyles.emptyText}>로딩 중...</Text>
                              </View>
                          ) : isError ? (
                              <View style={homeStyles.emptyContainer}>
                                  <Text style={homeStyles.emptyText}>에러 발생!</Text>
                              </View>
                          ) : null
                      }
            />
        </View>
    );
}

