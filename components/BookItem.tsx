import {Image} from "expo-image";
import {Book} from "@/types/wishlist";
import {View, Text, Pressable} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import {router} from "expo-router";
import {commonStyles} from "@/styles/commonStyles";
import {useBookStore} from '@/store/useBookStore';


interface BookItemProps {
    item: Book;
    isWished: boolean;
    onToggle: (item: Book) => void;
}

export const BookItem = ({item, isWished, onToggle}: BookItemProps) => {
    const {setSelectedBook} = useBookStore();

    return (
        <Pressable
            style={commonStyles.itemContainer}
            onPress={() => {
                setSelectedBook(item);
                router.push(`/book/${item.isbn}`);
            }}
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