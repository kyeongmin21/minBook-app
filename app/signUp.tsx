import {useState} from 'react';
import {useRouter} from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import {supabase} from '@/lib/supabase';
import {signUpStyles} from "@/styles/signUpStyles";
import {View, Text, TextInput, KeyboardAvoidingView, ScrollView, Pressable, Platform, Alert} from 'react-native';



export default function SignupScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);


    const handleSignup = async () => {
        if (!name || !nickname || !email || !password || !passwordConfirm) {
            Alert.alert('알림', '모든 항목을 입력해주세요.');
            return;
        }
        if (password !== passwordConfirm) {
            Alert.alert('알림', '비밀번호가 일치하지 않아요.');
            return;
        }
        if (password.length < 6) {
            Alert.alert('알림', '비밀번호는 6자 이상이어야 해요.');
            return;
        }

        setLoading(true);

        // 1. 회원가입
        const {data, error} = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {name, nickname},
            },
        });

        if (error) {
            Alert.alert('오류', error.message);
            setLoading(false);
            return;
        }

        // 2. profiles 테이블에도 저장
        const {error: profileError} = await supabase
            .from('profiles')
            .insert({
                id: data.user?.id,
                email,
                name,
                nickname,
            });

        setLoading(false);

        if (profileError) {
            Alert.alert('오류', profileError.message);
            return;
        }

        Alert.alert('가입 완료!', '로그인해주세요.', [
            {text: '확인', onPress: () => router.replace('/login')},
        ]);
    };

    return (
        <KeyboardAvoidingView
            style={signUpStyles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={signUpStyles.inner} keyboardShouldPersistTaps="handled">

                {/* 헤더 */}
                <Pressable style={signUpStyles.backBtn} onPress={() => router.back()}>
                    <Text style={signUpStyles.backText}>← 돌아가기</Text>
                </Pressable>

                <View style={signUpStyles.titleArea}>
                    <Text style={signUpStyles.title}>회원가입</Text>
                    <Text style={signUpStyles.subtitle}>minBook과 함께 독서를 기록해요.</Text>
                </View>

                {/* 입력 폼 */}
                <View style={signUpStyles.form}>
                    <View>
                        <Text style={signUpStyles.label}>이름</Text>
                        <TextInput
                            style={signUpStyles.input}
                            placeholder="이름"
                            placeholderTextColor="#aaa"
                            value={name}
                            onChangeText={setName}
                            autoCapitalize="none"
                        />
                    </View>

                    <View>
                        <Text style={signUpStyles.label}>닉네임</Text>
                        <TextInput
                            style={signUpStyles.input}
                            placeholder="사용할 닉네임"
                            placeholderTextColor="#aaa"
                            value={nickname}
                            onChangeText={setNickname}
                            autoCapitalize="none"
                        />
                    </View>

                    <View>
                        <Text style={signUpStyles.label}>이메일</Text>
                        <TextInput
                            style={signUpStyles.input}
                            placeholder="example@email.com"
                            placeholderTextColor="#aaa"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    <View>
                        <Text style={signUpStyles.label}>비밀번호</Text>
                        <View style={signUpStyles.inputWrapper}>
                            <TextInput
                                style={signUpStyles.inputFlex}
                                placeholder="6자 이상"
                                placeholderTextColor="#aaa"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                            />
                            <Pressable
                                onPress={() => setShowPassword(!showPassword)}
                                style={signUpStyles.eyeBtn}
                            >
                                <Ionicons
                                    name={showPassword ? "lock-open-outline" : "lock-closed-outline"}
                                    size={20}
                                    color="#aaa"
                                />
                            </Pressable>
                        </View>
                    </View>

                    <View>
                        <Text style={signUpStyles.label}>비밀번호 확인</Text>
                        <View style={[
                            signUpStyles.inputWrapper,
                            passwordConfirm.length > 0 && {
                                borderColor: password === passwordConfirm ? '#4CAF50' : '#FF5252',
                            },
                        ]}>
                            <TextInput
                                style={signUpStyles.inputFlex}
                                placeholder="비밀번호 재입력"
                                placeholderTextColor="#aaa"
                                value={passwordConfirm}
                                onChangeText={setPasswordConfirm}
                                secureTextEntry={!showPasswordConfirm}
                            />
                            <Pressable
                                onPress={() => setShowPasswordConfirm(!showPasswordConfirm)}
                                style={signUpStyles.eyeBtn}
                            >
                                <Ionicons
                                    name={showPasswordConfirm ? "lock-open-outline" : "lock-closed-outline"}
                                    size={20}
                                    color="#aaa"
                                />
                            </Pressable>
                        </View>
                        {passwordConfirm.length > 0 && (
                            <Text style={{
                                fontSize: 12, marginTop: 4,
                                color: password === passwordConfirm ? '#4CAF50' : '#FF5252'
                            }}>
                                {password === passwordConfirm ? '✓ 비밀번호가 일치해요' : '✗ 비밀번호가 일치하지 않아요'}
                            </Text>
                        )}
                    </View>

                    {/* 가입 버튼 */}
                    <Pressable
                        style={[signUpStyles.signupBtn, loading && signUpStyles.btnDisabled]}
                        onPress={handleSignup}
                        disabled={loading}
                    >
                        <Text style={signUpStyles.signupBtnText}>
                            {loading ? '가입 중...' : '회원가입'}
                        </Text>
                    </Pressable>

                    {/* 로그인으로 */}
                    <Pressable
                        style={signUpStyles.loginLink}
                        onPress={() => router.replace('/login')}
                    >
                        <Text style={signUpStyles.loginLinkText}>
                            이미 계정이 있어요. <Text style={{fontWeight: '700', color: '#1a1a1a'}}>로그인</Text>
                        </Text>
                    </Pressable>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
