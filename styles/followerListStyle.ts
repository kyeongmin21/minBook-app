import {StyleSheet} from 'react-native';

export const followerListStyles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 16,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
    },
    avatarFallback: {
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    info: {
        flex: 1,
        marginLeft: 12,
    },
    nickname: {
        fontSize: 15,
        fontWeight: '600',
    },
    bio: {
        fontSize: 13,
        color: '#888',
        marginTop: 2,
    },
    separator: {
        height: 1,
        backgroundColor: '#f0f0f0',
        marginLeft: 15,
        marginRight: 15,
    },
    emptyContainer: {
        padding: 40,
        alignItems: 'center',
    },
    emptyText: {
        color: '#aaa',
    },
});
