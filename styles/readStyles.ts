import {StyleSheet} from 'react-native';

export const readStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    // 카드
    cardContainer: {
        flexDirection: 'column',
        padding: 16,
        gap: 12,
        margin: 12,
        borderRadius: 16,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 4,  // 안드로이드
    },
    thumbnail: {
        width: 80,
        height: 113,
        borderRadius: 4,
    },
    cardInfo: {
        flex: 1,
        gap: 4,
        paddingTop: 10,
    },
    cardTitle: {
        fontWeight: 'bold',
    },
    cardAuthors: {
        color: '#888',
        fontSize: 13,
    },
    cardDate: {
        color: '#888',
        fontSize: 12,
    },
    cardRating: {
        color: '#333',
    },
    cardReview: {
        color: '#555',
        fontSize: 13,
    },
    cardReviewEmpty: {
        color: '#bbb',
        fontSize: 13,
    },
    // 빈 목록
    emptyContainer: {
        alignItems: 'center',
        marginTop: 100,
    },
    emptyText: {
        color: '#ccc',
        marginTop: 12,
    },
    // 모달
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 24,
        gap: 16,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    modalTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    // 별점
    starContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    // 인풋
    input: {
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 8,
        padding: 12,
        fontSize: 14,
    },
    reviewInput: {
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 8,
        padding: 12,
        fontSize: 14,
        height: 100,
        textAlignVertical: 'top',
    },
    // 저장 버튼
    saveBtn: {
        backgroundColor: '#1a1a1a',
        borderRadius: 8,
        padding: 14,
        alignItems: 'center',
    },
    saveBtnText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});