import {StyleSheet, View, TextInput, FlatList, Text} from 'react-native';
import Header from "@/components/Header";
import {useState, useEffect} from 'react';
import {searchBooks} from '@/api/books';
import {BookItem} from "@/components/BookItem";
import {useQuery, keepPreviousData} from '@tanstack/react-query';
import {useWishlistStore} from '@/store/useWishlistStore';
import {commonStyles} from "@/styles/commonStyles";


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
        placeholderData: keepPreviousData,
    });

    return (
        <View style={commonStyles.container}>
            <Header />
            <FlatList data={data}
                      numColumns={2}
                      columnWrapperStyle={styles.columnWrapper}
                      contentContainerStyle={{flexGrow: 1}}
                      keyExtractor={(item, index) => item.isbn + index}
                      ListHeaderComponent={
                          <TextInput
                              style={styles.input}
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
                              <View style={styles.emptyContainer}>
                                  <Text style={styles.emptyText}>로딩 중...</Text>
                              </View>
                          ) : isError ? (
                              <View style={styles.emptyContainer}>
                                  <Text style={styles.emptyText}>에러 발생!</Text>
                              </View>
                          ) : null
                      }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 15,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        borderRadius: 10,
        backgroundColor: '#f9f9f9',
    },
    columnWrapper: {
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 100,
    },
    emptyText: {
        fontSize: 16,
        color: '#999',
        fontWeight: '500',
    },
});
