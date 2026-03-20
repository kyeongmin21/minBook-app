import {View, Text, Pressable} from 'react-native';
import {router} from 'expo-router';
import {wishlistStyles} from '@/styles/wishlistStyles';


export default function LoginRequired() {
    return (
        <View style={wishlistStyles.loginContainer}>
            <Text style={wishlistStyles.loginText}>로그인 후 이용할 수 있어요.</Text>
            <Pressable style={wishlistStyles.loginBtn} onPress={() => router.push('/login')}>
                <Text style={wishlistStyles.loginBtnText}>로그인하러 가기</Text>
            </Pressable>
        </View>
    );
}