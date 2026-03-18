import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    logo: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        marginTop: 15
    },
    columnWrapper: {
        justifyContent: 'space-between',
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