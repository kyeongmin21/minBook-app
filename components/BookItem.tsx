import {Image} from "expo-image";
import {Book} from "@/types/wishlist";
import {View, Text, Pressable} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import {router} from "expo-router";
import {commonStyles} from "@/styles/commonStyles";


interface BookItemProps {
    item: Book;
    isWished: boolean;
    onToggle: (item: Book) => void;
}

export const BookItem = ({item, isWished, onToggle}: BookItemProps) => {
    return (
        <Pressable
            style={commonStyles.itemContainer}
            onPress={() => router.push({
                pathname: '/book/[detail]',
                params: {
                    detail: item.isbn,
                    title: item.title,
                    thumbnail: item.thumbnail,
                    authors: JSON.stringify(item.authors),
                    price: item.price,
                    datetime: item.datetime,
                    contents: item.contents,
                    publisher: item.publisher,
                }
            })}
        >
            <View>
                <Image source={{uri: item.thumbnail}} style={commonStyles.thumbnail} contentFit="cover"/>
                <Pressable
                    onPress={(e) => {
                        e.stopPropagation(); // ← 카드 클릭 이벤트 막기
                        onToggle(item);
                    }}
                    style={commonStyles.wishlistIcon}
                >
                    <Ionicons
                        name={isWished ? "heart" : "heart-outline"}
                        size={28}
                        color="#f3ff3e"
                    />
                </Pressable>
            </View>
            <View style={commonStyles.textContainer}>
                <Text style={commonStyles.title} numberOfLines={2}>{item.title}</Text>
                <Text
                    style={commonStyles.authors}>{Array.isArray(item.authors) ? item.authors.join(', ') : item.authors}</Text>
                <Text style={commonStyles.price}>{item.price?.toLocaleString()}원</Text>
            </View>
        </Pressable>
    );
};