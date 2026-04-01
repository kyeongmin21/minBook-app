import {StyleSheet} from "react-native";

export const menuBarStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20},
    userArea: {
        paddingVertical: 10
    },
    nickname: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1a1a1a'
    },
    email: {
        fontSize: 13,
        color: '#999',
        marginTop: 4
    },
    loginBtn: {
        backgroundColor: '#1a1a1a',
        borderRadius: 10,
        padding: 14,
        alignItems: 'center',
        marginVertical: 20,
    },
    loginBtnText: {
        color: '#fff',
        fontWeight: '700'
    },
    divider: {
        height: 1,
        backgroundColor: '#eee',
        marginVertical: 16
    },
    menuList: {
        gap: 4,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingVertical: 14,

        borderRadius: 10,
    },
    menuText: {
        fontSize: 15,
        color: '#333',
    },
});