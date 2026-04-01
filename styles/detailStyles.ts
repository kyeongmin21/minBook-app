import {StyleSheet} from 'react-native';

export const detailStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAF8',
    },
    backBtn: {
        padding: 16,
    },
    thumbnailArea: {
        alignItems: 'center',
        paddingVertical: 24,
    },
    thumbnail: {
        width: 160,
        height: 220,
        borderRadius: 8,
    },

    // 책 정보
    infoArea: {
        paddingHorizontal: 24,
        gap: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1a1a1a',
    },
    authors: {
        fontSize: 14,
        color: '#666',
    },
    publisher: {
        fontSize: 13,
        color: '#999',
    },
    date: {
        fontSize: 12,
        color: '#999',
    },
    price: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1a1a1a',
    },

    // 책 소개
    contentsArea: {
        marginTop: 16,
        padding: 24,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    contentsTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1a1a1a',
        marginBottom: 8,
    },
    contents: {
        fontSize: 14,
        color: '#555',
        lineHeight: 22,
    },

    // 버튼
    btnArea: {
        flexDirection: 'row',
        padding: 24,
        gap: 12,
        marginTop: 12,
    },
    btn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 14,
        borderRadius: 12,
        gap: 8,
    },
    wishBtn: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E8E8E8',
    },
    readBtn: {
        backgroundColor: '#1a1a1a',
    },
    btnText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#1a1a1a',
    },
    reviewSection: {
        paddingHorizontal: 20,
        paddingBottom: 40,
        marginTop: 8,
    },
    reviewSectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1a1a1a',
    },
    reviewCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 10,
        marginVertical: 6,
        borderWidth: 1,
        borderColor: '#E8E8E8',
    },
    reviewAvatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
    },
    reviewAvatarFallback: {
        backgroundColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center',
    },
    reviewNickname: {
        fontSize: 13,
        fontWeight: '600',
        color: '#1a1a1a',
    },
    reviewDate: {
        fontSize: 11,
        color: '#aaa',
        marginTop: 1,
    },
    reviewRating: {
        fontSize: 13,
        color: '#333',
    },
    reviewText: {
        fontSize: 13,
        color: '#444',
        lineHeight: 20,
    },
});