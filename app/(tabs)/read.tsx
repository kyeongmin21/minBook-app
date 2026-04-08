import {View, Text, FlatList, Modal, TextInput, StyleSheet, ScrollView, KeyboardAvoidingView,
    Alert, Pressable, Platform,} from 'react-native';
import {Image} from 'expo-image';
import {ReadBook} from '@/types/book'
import {useReadStore} from '@/store/readStore';
import {readStyles} from '@/styles/readStyles';
import {useAuthStore} from '@/store/authStore';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useState, useEffect} from 'react';
import {Ionicons} from '@expo/vector-icons';
import {Loading} from '@/components/Loading';
import LoginRequired from '@/components/LoginRequired';
import MonthlyBarChart from '@/components/MonthlyBarChart';


export default function TabReadScreen() {
    const {isLoggedIn, isInitialized} = useAuthStore();
    const {readList, updateReview, fetchReadList, deleteBook, togglePublic} = useReadStore();
    const [selected, setSelected] = useState<ReadBook | null>(null);
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [readAt, setReadAt] = useState('');
    const [selectedYear, setSelectedYear] = useState<string>('전체');

    // 년도 목록 (내림차순)
    const years = ['전체', ...[...new Set(
        readList.map(item => item.readAt?.slice(0, 4)).filter(Boolean)
    )].sort((a, b) => Number(b) - Number(a))];

    // 필터된 책 목록
    const filteredList = (selectedYear === '전체'
            ? readList
            : readList.filter(item => item.readAt?.startsWith(selectedYear))
    ).sort((a, b) => {
        if (!a.readAt) return 1;   // 날짜 없으면 뒤로
        if (!b.readAt) return -1;
        return b.readAt.localeCompare(a.readAt);  // 최신순 (내림차순)
    });

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

    const handleDelete = () => {
        if (!selected) return;
        if (Platform.OS === 'web') {
            const ok = confirm(`'${selected.book.title}'을(를) 목록에서 삭제할까요?`);
            if (!ok) return;
            deleteBook(selected.book.isbn);
            closeModal();
        } else {
            Alert.alert(
                '삭제 확인',
                `'${selected.book.title}'을(를) 목록에서 삭제할까요?`,
                [
                    {text: '취소', style: 'cancel'},
                    {
                        text: '삭제',
                        style: 'destructive',
                        onPress: async () => {
                            await deleteBook(selected.book.isbn);
                            closeModal();
                        },
                    },
                ]
            );
        }
    };

    useEffect(() => {
        if (isLoggedIn) fetchReadList();
    }, [isLoggedIn]);

    if (!isInitialized) return <Loading/>;


    return (
        <View style={readStyles.container}>
            {isLoggedIn ? (
                <>
                    <FlatList
                        data={filteredList}
                        contentContainerStyle={{paddingVertical: 8}}
                        keyExtractor={(item) => item.book.isbn}
                        ListHeaderComponent={
                            <View>
                                {/* 셀렉트박스 */}
                                <ScrollView
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={readStyles.yearPickerContainer}>
                                    {years.map(year => (
                                        <Pressable
                                            key={year}
                                            onPress={() => setSelectedYear(year)}
                                            style={[
                                                readStyles.yearBtn,
                                                selectedYear === year && readStyles.yearBtnActive,
                                            ]}>
                                            <Text style={[
                                                readStyles.yearBtnText,
                                                selectedYear === year && readStyles.yearBtnTextActive,
                                            ]}>{year}</Text>
                                        </Pressable>
                                    ))}
                                </ScrollView>

                                {/* 막대그래프 */}
                                {selectedYear !== '전체' && (
                                    <MonthlyBarChart
                                        selectedYear={selectedYear}
                                        totalCount={filteredList.length}
                                        readList={readList}
                                    />
                                )}
                            </View>
                        }
                        renderItem={({item}) => (
                            <Pressable onPress={() => openModal(item)} style={readStyles.cardContainer}>
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
                        <KeyboardAvoidingView style={{flex: 1, justifyContent: 'flex-end'}} behavior='padding'>
                            <Pressable
                                style={{...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.4)'}}
                                onPress={closeModal}
                            />

                            <View style={readStyles.modalContent}>
                                <Text style={readStyles.modalTitle} numberOfLines={1}>
                                    {selected?.book.title}
                                </Text>


                                {/* 별점 + 공개/비공개 한 줄 */}
                                <View style={readStyles.starRow}>
                                    <View style={readStyles.starContainer}>
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Pressable key={star} onPress={() => setRating(star)}>
                                                <Ionicons
                                                    name={star <= rating ? 'star' : 'star-outline'}
                                                    size={20}
                                                    color='#333'
                                                />
                                            </Pressable>
                                        ))}
                                    </View>
                                    <Pressable style={readStyles.publicToggle}
                                               onPress={() => {
                                                   togglePublic(selected!.book.isbn);
                                                   setSelected((prev: typeof selected) => prev ? { ...prev, isPublic: !prev.isPublic } : null);
                                               }}>
                                        <Ionicons
                                            name={selected?.isPublic ? 'lock-open-outline' : 'lock-closed-outline'}
                                            size={16}
                                            color={selected?.isPublic ? '#4CAF50' : '#aaa'}/>
                                        <Text style={{fontSize: 13, color: selected?.isPublic ? '#4CAF50' : '#aaa'}}>
                                            {selected?.isPublic ? '공개' : '비공개'}
                                        </Text>
                                    </Pressable>
                                </View>


                                <DateTimePicker
                                    locale='ko-KR'
                                    textColor='#000'
                                    themeVariant='light'
                                    value={readAt && readAt.length === 10 ? new Date(readAt + 'T00:00:00') : new Date()}
                                    mode='date'
                                    display='compact'
                                    maximumDate={new Date()}
                                    style={{marginLeft: -12, marginBottom: 4}}
                                    onChange={(event, selectedDate) => {
                                        if (event.type === 'dismissed') return;
                                        if (selectedDate) {
                                            const year = selectedDate.getFullYear();
                                            const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
                                            const day = String(selectedDate.getDate()).padStart(2, '0');
                                            setReadAt(`${year}-${month}-${day}`);
                                        }
                                    }}/>

                                <TextInput
                                    value={review}
                                    onChangeText={setReview}
                                    placeholder='감상평을 남겨보세요'
                                    multiline
                                    numberOfLines={4}
                                    style={readStyles.reviewInput}/>

                                <View style={readStyles.buttonContainer}>
                                    <Pressable onPress={handleDelete} style={[readStyles.button, readStyles.deleteBtn]}>
                                        <Text style={readStyles.buttonText}>삭제</Text>
                                    </Pressable>
                                    <Pressable onPress={handleSave} style={readStyles.button}>
                                        <Text style={readStyles.buttonText}>저장</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </KeyboardAvoidingView>
                    </Modal>
                </>
            ) : (<LoginRequired/>)}

        </View>
    );
}