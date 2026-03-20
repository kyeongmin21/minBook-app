import {View, TextInput, FlatList, Text} from 'react-native';
import Header from "@/components/Header";
import {useState, useEffect} from 'react';
import {searchBooks} from '@/api/books';
import {BookItem} from "@/components/BookItem";
import {useQuery, keepPreviousData} from '@tanstack/react-query';
import {useWishlistStore} from '@/store/useWishlistStore';
import {homeStyles} from "@/styles/homeStyles";


export default function HomeScreen() {
    const [query, setQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const {wishlist, toggleWishlist} = useWishlistStore();

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

    return (
        <View style={homeStyles.container}>
            <Header />
            <FlatList data={data}
                      numColumns={2}
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
                              onToggle={toggleWishlist}
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

