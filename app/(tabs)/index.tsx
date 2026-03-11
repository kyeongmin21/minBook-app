import {Image} from "expo-image";
import {StyleSheet, View, TextInput, FlatList, Text, Pressable} from 'react-native';
import {useState, useEffect} from 'react';
import {useQuery, keepPreviousData} from '@tanstack/react-query';
import {searchBooks} from '@/api/books';
import {useWishlistStore} from '@/store/useWishlistStore';
import {Ionicons} from '@expo/vector-icons';


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
        <View style={styles.container}>
            <FlatList data={data}
                      numColumns={2}
                      columnWrapperStyle={styles.columnWrapper}
                      contentContainerStyle={{flexGrow: 1}}
                      keyExtractor={(item, index) => item.isbn + index}
                      ListHeaderComponent={
                          <View>
                              <Image
                                  source={require('@/assets/images/logo.png')}
                                  style={styles.logo}
                              />
                              <TextInput
                                  style={styles.input}
                                  placeholder={"검색어를 입력하세요"}
                                  value={query}
                                  onChangeText={setQuery}
                              />
                          </View>
                      }

                      renderItem={({item}) => {
                          const isWished = wishlist.some((w) => w.isbn === item.isbn);

                          return (
                              <View style={styles.itemContainer}>
                                  <View>
                                      <Image source={{uri: item.thumbnail}} style={styles.thumbnail} contentFit="cover"/>
                                      {/* 하트 버튼 */}
                                      <Pressable
                                          onPress={() => toggleWishlist(item)}
                                          style={styles.wishlistIcon}>
                                          <Ionicons
                                              name={isWished ? "heart" : "heart-outline"}
                                              size={28}
                                              color={isWished ? "#f3ff3e" : "#f3ff3e"}
                                          />
                                      </Pressable>
                                  </View>
                                  <View style={styles.textContainer}>
                                      <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
                                      <Text style={styles.authors}>{item.authors}</Text>
                                      <Text style={styles.price}>{item.price?.toLocaleString()}원</Text>
                                      <Text style={styles.date}>{item.datetime?.split('T')[0]}</Text>
                                  </View>
                              </View>
                          )
                      }}
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
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    logo: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        marginTop: 15
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 15,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 10,
        backgroundColor: '#f9f9f9',
    },
    columnWrapper: {
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    itemContainer: {
        width: '50%',
        paddingVertical: 30,   // 위아래 한꺼번에
        paddingHorizontal: 10, // 좌우 한꺼번에
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    thumbnail: {
        width: '100%',
        aspectRatio: 2 / 3, // 책 표지 특유의 비율을 유지
        borderRadius: 8,
        backgroundColor: '#eee',
    },
    wishlistIcon: {
        position: 'absolute',
        top: 5,
        right: 5
    },
    textContainer: {
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
    },
    authors: {
        fontSize: 14,
        color: '#666',
    },
    price: {
        fontSize: 14,
        marginTop: 5,
        marginBottom: 5,
        color: '#ff6b6b',
    },
    date: {
        fontSize: 12,
        color: '#666',
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
