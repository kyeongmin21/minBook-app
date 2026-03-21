import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 90,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        marginTop: 10,
    },
    headerSide: {
        flex: 1, // 양쪽 사이드가 똑같은 공간을 차지함
        justifyContent: 'center',
    },
    headerCenter: {
        flex: 3, // 중앙은 좀 더 넓게 차지 (로고 크기에 따라 조절)
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 100,
        height: 80,
        alignSelf: 'center',
    },
    columnWrapper: {
        justifyContent: 'flex-start',
        paddingHorizontal: 10,
    },
    itemContainer: {
        width: '50%',
        paddingVertical: 30,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    thumbnail: {
        width: '100%',
        aspectRatio: 2 / 3,
        borderRadius: 8,
        backgroundColor: '#eee',
    },
    wishlistIcon: {
        position: 'absolute',
        top: 5,
        right: 5
    },
    textContainer: {
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
    },
    authors: {
        fontSize: 14,
        color: '#666',
    },
    price: {
        fontSize: 14,
        marginTop: 5,
        marginBottom: 5,
        color: '#ff6b6b',
    },
    date: {
        fontSize: 12,
        color: '#999',
    },
});