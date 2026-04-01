import {StyleSheet} from "react-native";

export const profileStyles = StyleSheet.create({
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 12,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: '#E8E8E8',
    },
    avatarFallback: {
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    statsRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginLeft: 16,
    },
    statItem: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    statLabel: {
        fontSize: 12,
        color: '#888',
        marginTop: 2,
    },
    infoSection: {
        paddingHorizontal: 16,
        marginBottom: 12,
    },
    nickname: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    bio: {
        fontSize: 13,
        color: '#555',
        marginTop: 4,
    },
    editButton: {
        marginHorizontal: 16,
        marginBottom: 16,
        paddingVertical: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        alignItems: 'center',
    },
    editButtonText: {
        fontSize: 14,
        fontWeight: '500',
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        paddingHorizontal: 16,
        paddingBottom: 8,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 12,
    },
    bookThumbnail: {
        width: '33.33%',
        aspectRatio: 0.7,
        borderWidth: 0.5,
        borderColor: '#eee',
    },
    emptyContainer: {
        alignItems: 'center',
        paddingVertical: 40,
    },
    emptyText: {
        color: '#aaa',
        fontSize: 14,
    },
});