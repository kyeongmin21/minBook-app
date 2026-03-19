import {FlatList, View, Text, Pressable} from 'react-native';
import {useRouter} from 'expo-router';
import {BookItem} from "@/components/BookItem";
import Header from "@/components/Header";
import {useAuthStore} from '@/store/authStore';
import {commonStyles} from "@/styles/commonStyles";
import {useWishlistStore} from "@/store/useWishlistStore";
import {wishlistStyles} from "@/styles/wishlistStyles";


export default function TabWishScreen() {
    const {wishlist, toggleWishlist} = useWishlistStore();
    const {isLoggedIn} = useAuthStore();
    const router = useRouter();

    if (!isLoggedIn) {
        return (
            <View style={wishlistStyles.loginContainer}>
                <Text style={wishlistStyles.loginText}>로그인 후 이용할 수 있어요.</Text>
                <Pressable style={wishlistStyles.loginBtn} onPress={() => router.push('/login')}>
                    <Text style={wishlistStyles.loginBtnText}>로그인하러 가기</Text>
                </Pressable>
            </View>
        );
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
                ListEmptyComponent={<Text>찜한 도서가 없습니다.</Text>}
            />
        </View>
    );
}
