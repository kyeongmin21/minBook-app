import {useState, useCallback} from 'react';
import {useRouter, useFocusEffect} from 'expo-router';
import Ionicons from "@expo/vector-icons/Ionicons";
import {supabase} from '@/lib/supabase';
import {loginStyles} from '@/styles/loginStyles'
import {View, Text, TextInput, KeyboardAvoidingView, Pressable, Platform, Alert} from 'react-native';



export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);


    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('알림', '이메일과 비밀번호를 입력해주세요.');
            return;
        }
        setLoading(true);

        const {error} = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        setLoading(false);

        if (error) {
            if (error.message.includes('Invalid login credentials')) {
                Alert.alert('오류', '이메일 또는 비밀번호가 틀렸어요.');
            } else if (error.message.includes('Too Many Requests')) {
                Alert.alert('잠깐!', '잠시 후 다시 시도해주세요.');
            } else {
                Alert.alert('오류', error.message);
            }
            return;
        }

        router.replace('/');
    };


    useFocusEffect(
        useCallback(() => {
            // 페이지 들어올 때마다 초기화
            setEmail('');
            setPassword('');
        }, [])
    );

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
                <View style={loginStyles.passwordWrapper}>
                    <TextInput
                        style={loginStyles.passwordInput}
                        placeholder="비밀번호"
                        placeholderTextColor="#aaa"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPasswordConfirm}
                    />
                    <Pressable
                        onPress={() => setShowPasswordConfirm(!showPasswordConfirm)}
                        style={loginStyles.eyeBtn}
                    >
                        <Ionicons
                            name={showPasswordConfirm ? "lock-open-outline" : "lock-closed-outline"}
                            size={20}
                            color="#aaa"
                        />
                    </Pressable>
                </View>

                {/* 로그인 버튼 */}
                <Pressable
                    style={[loginStyles.loginBtn, loading && loginStyles.loginBtnDisabled]}
                    onPress={handleLogin}
                    disabled={loading}
                >
                    <Text style={loginStyles.loginBtnText}>
                        {loading ? '로그인 중...' : '로그인'}
                    </Text>
                </Pressable>

                {/* 하단 링크 */}
                <View style={loginStyles.links}>
                    <Pressable onPress={() => Alert.alert('준비 중', '아이디/비밀번호 찾기')}>
                        <Text style={loginStyles.linkText}>아이디 찾기</Text>
                    </Pressable>
                    <Text style={loginStyles.divider}>|</Text>
                    <Pressable onPress={() => Alert.alert('준비 중', '비밀번호 찾기')}>
                        <Text style={loginStyles.linkText}>비밀번호 찾기</Text>
                    </Pressable>
                    <Text style={loginStyles.divider}>|</Text>
                    <Pressable onPress={() => router.push('/signUp')}>
                        <Text style={[loginStyles.linkText, loginStyles.signupText]}>회원가입</Text>
                    </Pressable>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
