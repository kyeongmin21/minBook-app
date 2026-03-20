import {Image} from 'expo-image';
import {Ionicons} from '@expo/vector-icons';
import {View, Text, ScrollView, Pressable} from 'react-native';
import {router} from 'expo-router';
import {useWishlistStore} from '@/store/useWishlistStore';
import {detailStyles} from "@/styles/detailStyles";
import {useReadStore} from "@/store/readStore";
import {useBookStore} from "@/store/useBookStore";


export default function BookDetailScreen() {
    const {selectedBook} = useBookStore();
    const book = selectedBook;

    const {readList, toggleRead} = useReadStore();
    const {wishlist, toggleWishlist} = useWishlistStore();

    if (!book) return null;

    const isRead = readList.some(r => r.isbn === book.isbn);
    const isWished = wishlist.some(w => w.isbn === book.isbn);

    return (
        <ScrollView style={detailStyles.container}>

            {/* 뒤로가기 */}
            <Pressable style={detailStyles.backBtn} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="#1a1a1a"/>
            </Pressable>

            {/* 책 표지 */}
            <View style={detailStyles.thumbnailArea}>
                <Image source={{uri: book.thumbnail}} style={detailStyles.thumbnail} contentFit="cover"/>
            </View>

            {/* 책 정보 */}
            <View style={detailStyles.infoArea}>
                <Text style={detailStyles.title}>{book.title}</Text>
                <Text style={detailStyles.price}>{book.price?.toLocaleString()}원</Text>
                <Text style={detailStyles.authors}>
                    {Array.isArray(book.authors) ? book.authors.join(', ') : book.authors}
                </Text>
                <Text style={detailStyles.date}>{book.datetime?.split('T')[0]}</Text>
            </View>

            {/* 버튼 영역 */}
            <View style={detailStyles.btnArea}>
                {/* 찜하기 */}
                <Pressable
                    style={[detailStyles.btn, detailStyles.wishBtn]}
                    onPress={() => toggleWishlist(book)}
                >
                    <Ionicons
                        name={isWished ? "heart" : "heart-outline"}
                        size={20}
                        color={isWished ? "#ff3e3e" : "#1a1a1a"}
                    />
                    <Text style={detailStyles.btnText}>{isWished ? '찜 취소' : '찜하기'}</Text>
                </Pressable>

                {/* 읽었어요 */}
                <Pressable
                    onPress={() => toggleRead(book)}
                    style={[detailStyles.btn, detailStyles.readBtn]}
                >
                    <Ionicons name={isRead ? "book-outline" : "book"} size={20} color="#fff"/>
                    <Text style={[detailStyles.btnText, {color: '#fff'}]}>
                        {isRead ? '읽기 취소' : '읽었어요'}
                    </Text>
                </Pressable>
            </View>

            {/* 책 소개 */}
            {book.contents ? (
                <View style={detailStyles.contentsArea}>
                    <Text style={detailStyles.contentsTitle}>책 소개</Text>
                    <Text style={detailStyles.contents}>{book.contents}</Text>
                </View>
            ) : null}
        </ScrollView>
    );
}