import {StyleSheet} from 'react-native';

export const loginStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAF8',
        justifyContent: 'center',
        paddingHorizontal: 32,
    },
    titleArea: {
        alignItems: 'center',
        marginBottom: 48,
    },
    logo: {
        fontSize: 48,
        fontWeight: '700',
        color: '#1a1a1a',
        letterSpacing: -2,
    },
    subtitle: {
        fontSize: 14,
        color: '#999',
        marginTop: 6,
        letterSpacing: 1,
    },
    form: {
        gap: 12,
    },
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E8E8E8',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 15,
        color: '#1a1a1a',
    },
    loginBtn: {
        backgroundColor: '#1a1a1a',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 4,
    },
    loginBtnDisabled: {
        backgroundColor: '#999',
    },
    loginBtnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
    links: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
        gap: 8,
    },
    linkText: {
        fontSize: 13,
        color: '#888',
    },
    divider: {
        color: '#ddd',
        fontSize: 13,
    },
    signupText: {
        color: '#1a1a1a',
        fontWeight: '600',
    },
});