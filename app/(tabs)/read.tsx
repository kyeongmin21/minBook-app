import {View, Text, FlatList, Modal, TextInput, Pressable} from 'react-native';
import {Image} from 'expo-image';
import {useReadStore, ReadBook} from '@/store/readStore';
import {readStyles} from '@/styles/readStyles';
import {useAuthStore} from '@/store/authStore';
import {useState, useEffect} from 'react';
import {Ionicons} from '@expo/vector-icons';
import Header from '@/components/Header';
import LoginRequired from '@/components/LoginRequired';
import {Loading} from "@/components/Loading";


export default function TabReadScreen() {
    const {isLoggedIn, isInitialized} = useAuthStore();
    const {readList, updateReview, fetchReadList} = useReadStore();
    const [selected, setSelected] = useState<ReadBook | null>(null);
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [readAt, setReadAt] = useState('');

    const openModal = (item: ReadBook) => {
        setSelected(item);
        setRating(item.rating);
        setReview(item.review);
        setReadAt(item.readAt);
    };

    const closeModal = () => setSelected(null);

    const handleSave = async () => {
        if (!selected) return;
        await updateReview(selected.book.isbn, rating, review, readAt);
        closeModal();
    };

    useEffect(() => {
        if (isLoggedIn) {
            fetchReadList();
        }
    }, [isLoggedIn]);

    if (!isInitialized) return <Loading />; // 세션 확인 중엔 로딩중표시
    if (!isLoggedIn) return <LoginRequired/>;

    return (
        <View style={readStyles.container}>
            <Header/>
            <FlatList
                data={readList}
                contentContainerStyle={{paddingVertical: 8}}
                keyExtractor={(item) => item.book.isbn}
                renderItem={({item}) => (
                    <Pressable onPress={() => openModal(item)} style={readStyles.cardContainer}>
                        {/* 위쪽: 책표지 + 기본정보 */}
                        <View style={{flexDirection: 'row', gap: 12}}>
                            <Image source={{uri: item.book.thumbnail}} style={readStyles.thumbnail}/>
                            <View style={readStyles.cardInfo}>
                                <Text style={readStyles.cardTitle} numberOfLines={2}>{item.book.title}</Text>
                                <Text style={readStyles.cardAuthors}>{item.book.authors?.join(', ')}</Text>
                                <Text style={readStyles.cardDate}>📅 {item.readAt}</Text>
                                {item.rating > 0 && (
                                    <Text style={readStyles.cardRating}>{'★'.repeat(item.rating)}</Text>
                                )}
                            </View>
                        </View>

                        {/* 아래쪽: 감상평 */}
                        {item.review ? (
                            <Text style={readStyles.cardReview}>{item.review}</Text>
                        ) : (
                            <Text style={readStyles.cardReviewEmpty}>감상평을 남겨보세요</Text>
                        )}
                    </Pressable>
                )}
                ListEmptyComponent={
                    <View style={readStyles.emptyContainer}>
                        <Ionicons name='book-outline' size={48} color='#ccc'/>
                        <Text style={readStyles.emptyText}>읽은 책이 없어요</Text>
                    </View>
                }
            />

            {/* 감상평 모달 */}
            <Modal visible={!!selected} animationType='slide' transparent>
                <Pressable style={readStyles.modalOverlay} onPress={closeModal}/>
                <View style={readStyles.modalContent}>
                    <Text style={readStyles.modalTitle} numberOfLines={1}>
                        {selected?.book.title}
                    </Text>

                    {/* 별점 */}
                    <View style={readStyles.starContainer}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Pressable key={star} onPress={() => setRating(star)}>
                                <Ionicons
                                    name={star <= rating ? 'star' : 'star-outline'}
                                    size={32}
                                    color='#f5a623'
                                />
                            </Pressable>
                        ))}
                    </View>

                    {/* 읽은 날짜 */}
                    <TextInput
                        value={readAt}
                        onChangeText={setReadAt}
                        placeholder='읽은 날짜 (예: 2025-03-20)'
                        style={readStyles.input}
                    />

                    {/* 감상평 */}
                    <TextInput
                        value={review}
                        onChangeText={setReview}
                        placeholder='감상평을 남겨보세요'
                        multiline
                        numberOfLines={4}
                        style={readStyles.reviewInput}
                    />

                    {/* 저장 버튼 */}
                    <Pressable onPress={handleSave} style={readStyles.saveBtn}>
                        <Text style={readStyles.saveBtnText}>저장</Text>
                    </Pressable>
                </View>
            </Modal>
        </View>
    );
}