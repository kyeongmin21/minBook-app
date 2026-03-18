import {Image} from "expo-image";
import {Book} from "@/types/wishlist";
import {View, Text, Pressable} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import {commonStyles} from "@/styles/commonStyles";


interface BookItemProps {
    item: Book;
    isWished: boolean;
    onToggle: (item: Book) => void;
}

export const BookItem = ({item, isWished, onToggle}: BookItemProps) => {
    return (
        <View style={commonStyles.itemContainer}>
            <View>
                <Image source={{uri: item.thumbnail}} style={commonStyles.thumbnail} contentFit="cover"/>
                <Pressable onPress={() => onToggle(item)} style={commonStyles.wishlistIcon}>
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
                <Text style={commonStyles.date}>{item.datetime?.split('T')[0]}</Text>
            </View>
        </View>
    );
};