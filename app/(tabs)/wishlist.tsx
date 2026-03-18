import {FlatList, View, Text} from 'react-native';
import {BookItem} from "@/components/BookItem";
import {useWishlistStore} from "@/store/useWishlistStore";
import {commonStyles} from "@/styles/commonStyles";
import Header from "@/components/Header";


export default function TabWishScreen() {
    const {wishlist, toggleWishlist} = useWishlistStore();

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

