import {useState} from 'react';
import {useRouter} from 'expo-router';
import {loginStyles} from '@/styles/loginStyles'
import {View, Text, TextInput, KeyboardAvoidingView, TouchableOpacity, Platform, Alert} from 'react-native';


export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            console.log('들어오냥')
            Alert.alert('알림', '이메일과 비밀번호를 입력해주세요.');
            return;
        }
        setLoading(true);
        // TODO: supabase 로그인 연결 예정
        setLoading(false);
    };

    return (
        <KeyboardAvoidingView
            style={loginStyles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            {/* 타이틀 */}
            <View style={loginStyles.titleArea}>
                <Text style={loginStyles.logo}>minBook</Text>
                <Text style={loginStyles.subtitle}>나만의 독서 기록장</Text>
            </View>

            {/* 입력 폼 */}
            <View style={loginStyles.form}>
                <TextInput
                    style={loginStyles.input}
                    placeholder="이메일"
                    placeholderTextColor="#aaa"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={loginStyles.input}
                    placeholder="비밀번호"
                    placeholderTextColor="#aaa"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                {/* 로그인 버튼 */}
                <TouchableOpacity
                    style={[loginStyles.loginBtn, loading && loginStyles.loginBtnDisabled]}
                    onPress={handleLogin}
                    disabled={loading}
                >
                    <Text style={loginStyles.loginBtnText}>
                        {loading ? '로그인 중...' : '로그인'}
                    </Text>
                </TouchableOpacity>

                {/* 하단 링크 */}
                <View style={loginStyles.links}>
                    <TouchableOpacity onPress={() => Alert.alert('준비 중', '아이디/비밀번호 찾기')}>
                        <Text style={loginStyles.linkText}>아이디 찾기</Text>
                    </TouchableOpacity>
                    <Text style={loginStyles.divider}>|</Text>
                    <TouchableOpacity onPress={() => Alert.alert('준비 중', '비밀번호 찾기')}>
                        <Text style={loginStyles.linkText}>비밀번호 찾기</Text>
                    </TouchableOpacity>
                    <Text style={loginStyles.divider}>|</Text>
                    <TouchableOpacity onPress={() => router.push('/signUp')}>
                        <Text style={[loginStyles.linkText, loginStyles.signupText]}>회원가입</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
