import {Image} from 'expo-image';
import {Book} from '@/types/book'
import {useEffect, useState} from 'react';
import {Ionicons} from '@expo/vector-icons';
import {Loading} from '@/components/Loading';
import {View, Text, ScrollView, Pressable} from 'react-native';
import {router, useLocalSearchParams} from 'expo-router';
import {useWishlistStore} from '@/store/useWishlistStore';
import {detailStyles} from '@/styles/detailStyles';
import {useReadStore} from '@/store/readStore';
import {useBookStore} from '@/store/useBookStore';
import {useAuthStore} from "@/store/authStore";
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {fetchPublicReviews} from "@/api/publicReviews";


export default function BookDetailScreen() {
    const insets = useSafeAreaInsets();

    const {selectedBook} = useBookStore();
    const {detail} = useLocalSearchParams();
    const {readList, toggleRead} = useReadStore();
    const {wishlist, toggleWishlist} = useWishlistStore();

    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);
    const [publicReviews, setPublicReviews] = useState<any[]>([]);

    const {user} = useAuthStore();
    const handleProfilePress = (userId: string) => {
        if (userId === user?.user_id) {
            // 내 프로필
            router.push('/(tabs)/profile');
        } else {
            // 다른 사람 프로필
            router.push(`/(protected)/user/${userId}`);
        }
    };


    useEffect(() => {
        if (!book) return;
        fetchPublicReviews(book.isbn)
            .then(setPublicReviews)
            .catch(console.error);
    }, [book]);


    useEffect(() => {
        setBook(null);
        setLoading(true);

        const fetchBook = async () => {
            const isbn = decodeURIComponent((detail as string).replace(/\+/g, ' '));

            // 1. selectedBook 있고 isbn 일치하면 바로 사용
            if (selectedBook && selectedBook.isbn === isbn) {
                setBook(selectedBook);
                setLoading(false);
                return;
            }

            // 2. Zustand wishlist에서 찾기
            const wished = wishlist.find(w => w.isbn === isbn);
            if (wished) {
                setBook(wished);
                setLoading(false);
                return;
            }

            // 3. 둘 다 없으면 카카오 API (새로고침한 경우)
            const isbnOnly = isbn.split(' ').pop();// 13자리 isbn만 사용
            const res = await fetch(
                `https://dapi.kakao.com/v3/search/book?query=${isbnOnly}&target=isbn`,
                {headers: {Authorization: `KakaoAK ${process.env.EXPO_PUBLIC_KAKAO_API_KEY}`}}
            );
            const json = await res.json();

            if (json.documents?.[0]) setBook(json.documents[0]);
            setLoading(false);
        };

        fetchBook();
    }, [detail]);

    if (loading) return <Loading/>;
    if (!book) return <Text>책을 찾을 수 없습니다.</Text>;

    const isRead = readList.some(r => r.book.isbn === book.isbn);
    const isWished = wishlist.some(w => w.isbn === book.isbn);


    return (
        <ScrollView style={detailStyles.container}>

            {/* 뒤로가기 */}
            <Pressable style={[detailStyles.backBtn, {marginTop: insets.top}]}
                       onPress={() => router.back()}>
                <Ionicons name='arrow-back' size={24} color='#1a1a1a'/>
            </Pressable>

            {/* 책 표지 */}
            <View style={detailStyles.thumbnailArea}>
                <Image source={{uri: book.thumbnail}} style={detailStyles.thumbnail} contentFit='cover'/>
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
                        name={isWished ? 'heart' : 'heart-outline'}
                        size={20}
                        color={isWished ? '#ff3e3e' : '#1a1a1a'}
                    />
                    <Text style={detailStyles.btnText}>{isWished ? '찜 취소' : '찜하기'}</Text>
                </Pressable>

                {/* 읽었어요 */}
                <Pressable
                    onPress={() => toggleRead(book)}
                    style={[detailStyles.btn, detailStyles.readBtn]}
                >
                    <Ionicons name={isRead ? 'book-outline' : 'book'} size={20} color='#fff'/>
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


            {/* 읽은책 공개한 사람들이 작성한 감상평 */}
            {publicReviews.length > 0 && (
                <View style={detailStyles.reviewSection}>
                    <Text style={detailStyles.reviewSectionTitle}>독자 리뷰</Text>
                    {publicReviews.map((item, index) => (
                        <View key={index} style={detailStyles.reviewCard}>
                            {/* 프로필 + 날짜 */}
                            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 6}}>
                                <Pressable onPress={() => handleProfilePress(item.profiles?.user_id)}>
                                    {item.profiles?.avatar_url ? (
                                        <Image
                                            source={{uri: item.profiles.avatar_url}}
                                            style={detailStyles.reviewAvatar}
                                            contentFit='cover'
                                        />
                                    ) : (
                                        <View style={[detailStyles.reviewAvatar, detailStyles.reviewAvatarFallback]}>
                                            <Ionicons name='person' size={14} color='#aaa'/>
                                        </View>
                                    )}
                                </Pressable>

                                <View style={{flex: 1, marginLeft: 8}}>
                                    <Pressable onPress={() => handleProfilePress(item.profiles?.user_id)}>
                                        <Text style={detailStyles.reviewNickname}>
                                            {item.profiles?.nickname ?? '익명'}
                                        </Text>
                                    </Pressable>
                                    <Text style={detailStyles.reviewDate}>
                                        {item.read_at?.slice(0, 10)}
                                    </Text>
                                </View>

                                {/* 별점 */}
                                {item.rating > 0 && (
                                    <Text style={detailStyles.reviewRating}>
                                        {'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}
                                    </Text>
                                )}
                            </View>

                            <Text style={detailStyles.reviewText}>{item.review}</Text>
                        </View>
                    ))}
                </View>
            )}
        </ScrollView>
    );
}