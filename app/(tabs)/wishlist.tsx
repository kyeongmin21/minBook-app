import {FlatList, View, Text} from 'react-native';
import {useAuthStore} from '@/store/authStore';
import {commonStyles} from '@/styles/commonStyles';
import {useWishlistStore} from '@/store/useWishlistStore';
import {wishlistStyles} from '@/styles/wishlistStyles';
import {useEffect} from 'react';
import {BookItem} from '@/components/BookItem';
import Header from '@/components/Header';
import LoginRequired from '@/components/LoginRequired';


export default function TabWishScreen() {
    const {wishlist, toggleWishlist, fetchWishlist} = useWishlistStore();
    const {isLoggedIn} = useAuthStore();


    useEffect(() => {
        if (isLoggedIn) {
            fetchWishlist();
        }
    }, [isLoggedIn]);

    if (!isLoggedIn) {
        return <LoginRequired />;
    }

    return (
        <View style={commonStyles.container}>
            <Header/>
            <FlatList
                data={wishlist}
                numColumns={2}
                columnWrapperStyle={commonStyles.columnWrapper}
                keyExtractor={(item) => item.isbn}
                ListHeaderComponent={
                    <Text style={{textAlign: 'center', marginVertical: 10}}>북마크</Text>
                }
                renderItem={({item}) => (
                    <BookItem
                        item={item}
                        isWished={wishlist.some(w => w.isbn === item.isbn)}
                        onToggle={toggleWishlist}
                    />
                )}
                ListEmptyComponent={
                    <View style={wishlistStyles.emptyContainer}>
                        <Text style={wishlistStyles.emptyText}>찜한 도서가 없습니다.</Text>
                    </View>
                }
            />
        </View>
    );
}
