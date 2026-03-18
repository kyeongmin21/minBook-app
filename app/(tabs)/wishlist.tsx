import {Image} from "expo-image";
import {FlatList, StyleSheet, View, Text} from 'react-native';
import {BookItem} from "@/components/BookItem";
import {useWishlistStore} from "@/store/useWishlistStore";
import {commonStyles} from "@/styles/commonStyles";


export default function TabWishScreen() {
    const {wishlist, toggleWishlist} = useWishlistStore();

    return (
        <View style={styles.container}>
            <Image
                source={require('@/assets/images/logo.png')}
                style={styles.logo}
            />

            <Text style={{ textAlign: 'center' }}>북마크</Text>
            <FlatList
                data={wishlist}
                numColumns={2}
                columnWrapperStyle={commonStyles.columnWrapper}
                keyExtractor={(item) => item.isbn}
                renderItem={({ item }) => (
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
});