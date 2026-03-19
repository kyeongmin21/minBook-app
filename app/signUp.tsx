import {useState} from 'react';
import {useRouter} from 'expo-router';
import {View, Text, TextInput, KeyboardAvoidingView, ScrollView, TouchableOpacity, Platform, Alert} from 'react-native';
import {supabase} from '@/lib/supabase';
import {signUpStyles} from "@/styles/signUpStyles";


export default function SignupScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');
    const [loading, setLoading] = useState(false);

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
        const {error} = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {nickname}, // 닉네임 메타데이터로 저장
            },
        });
        setLoading(false);

        if (error) {
            Alert.alert('오류', error.message);
            return;
        }

        Alert.alert('가입 완료! 🎉', '이메일 인증 후 로그인해주세요.', [
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
                <TouchableOpacity style={signUpStyles.backBtn} onPress={() => router.back()}>
                    <Text style={signUpStyles.backText}>← 돌아가기</Text>
                </TouchableOpacity>

                <View style={signUpStyles.titleArea}>
                    <Text style={signUpStyles.title}>회원가입</Text>
                    <Text style={signUpStyles.subtitle}>민북과 함께 독서를 기록해요</Text>
                </View>

                {/* 입력 폼 */}
                <View style={signUpStyles.form}>
                    <View>
                        <Text style={signUpStyles.label}>이름</Text>
                        <TextInput
                            style={signUpStyles.input}
                            placeholder="이름"
                            placeholderTextColor="#aaa"
                            value={nickname}
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
                        <TextInput
                            style={signUpStyles.input}
                            placeholder="6자 이상"
                            placeholderTextColor="#aaa"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>

                    <View>
                        <Text style={signUpStyles.label}>비밀번호 확인</Text>
                        <TextInput
                            style={[
                                signUpStyles.input,
                                passwordConfirm.length > 0 && {
                                    borderColor: password === passwordConfirm ? '#4CAF50' : '#FF5252',
                                },
                            ]}
                            placeholder="비밀번호 재입력"
                            placeholderTextColor="#aaa"
                            value={passwordConfirm}
                            onChangeText={setPasswordConfirm}
                            secureTextEntry
                        />
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
                    <TouchableOpacity
                        style={[signUpStyles.signupBtn, loading && signUpStyles.btnDisabled]}
                        onPress={handleSignup}
                        disabled={loading}
                    >
                        <Text style={signUpStyles.signupBtnText}>
                            {loading ? '가입 중...' : '회원가입'}
                        </Text>
                    </TouchableOpacity>

                    {/* 로그인으로 */}
                    <TouchableOpacity
                        style={signUpStyles.loginLink}
                        onPress={() => router.replace('/login')}
                    >
                        <Text style={signUpStyles.loginLinkText}>
                            이미 계정이 있어요. <Text style={{fontWeight: '700', color: '#1a1a1a'}}>로그인</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
