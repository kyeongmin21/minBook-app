import {StyleSheet} from 'react-native';

export const signUpStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAF8',
    },
    inner: {
        paddingHorizontal: 32,
        paddingTop: 60,
        paddingBottom: 40,
    },
    backBtn: {
        marginBottom: 24,
    },
    backText: {
        fontSize: 14,
        color: '#888',
    },
    titleArea: {
        marginBottom: 36,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: '#1a1a1a',
        letterSpacing: -1,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 14,
        color: '#999',
        marginTop: 6,
        textAlign: 'center',
    },
    form: {
        gap: 20,
    },
    label: {
        fontSize: 13,
        fontWeight: '600',
        color: '#555',
        marginBottom: 6,
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
    signupBtn: {
        backgroundColor: '#1a1a1a',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    btnDisabled: {
        backgroundColor: '#999',
    },
    signupBtnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700'
    },
    loginLink: {
        alignItems: 'center',
        paddingVertical: 8,
    },
    loginLinkText: {
        fontSize: 14,
        color: '#888',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E8E8E8',
        borderRadius: 12,
        paddingHorizontal: 16,
    },
    inputFlex: {
        flex: 1,
        paddingVertical: 14,
        fontSize: 15,
        color: '#1a1a1a',
    },
    eyeBtn: {
        paddingLeft: 8,
    },
    eyeText: {
        fontSize: 18,
    },
    maxLengthText: {
        fontSize: 11,
        color: '#aaa',
        textAlign: 'right',
        marginTop: 2
    },
    profilePhoto: {
        alignItems: 'center',
        marginBottom: 8,
    },
    profileImage: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: '#eee',
        borderWidth: 1,
        borderColor: '#eee'
    },
    profileView:  {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center'
    },
    camera: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#000',
        borderRadius: 12,
        padding: 4
    },
    profileText: {
        fontSize: 12,
        color: '#aaa',
        marginTop: 6
    }
});