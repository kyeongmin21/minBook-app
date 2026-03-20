import {useState} from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import {router} from "expo-router";
import {supabase} from '@/lib/supabase';
import {useAuthStore} from '@/store/authStore';
import {signUpStyles} from "@/styles/signUpStyles";
import {View, Text, TextInput, KeyboardAvoidingView, ScrollView, Pressable, Platform, Alert} from 'react-native';


export default function MyPageScreen() {
    const {user, fetchUser} = useAuthStore();
    const [nickname, setNickname] = useState(user?.nickname || '');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [loading, setLoading] = useState(false);

    const showAlert = (title: string, message: string, callback?: () => void) => {
        if (Platform.OS === 'web') {
            window.alert(`${title}\n${message}`);
            callback?.();
        } else {
            Alert.alert(title, message, callback ? [{text: '확인', onPress: callback}] : undefined);
        }
    };

    const handleUpdate = async () => {
        if (!nickname) {
            showAlert('알림', '닉네임을 입력해주세요.');
            return;
        }
        if (password && password.length < 6) {
            showAlert('알림', '비밀번호는 6자 이상이어야 해요.');
            return;
        }
        if (password && password !== passwordConfirm) {
            showAlert('알림', '비밀번호가 일치하지 않아요.');
            return;
        }

        setLoading(true);

        // 닉네임 업데이트
        const {error: profileError} = await supabase
            .from('profiles')
            .update({nickname})
            .eq('id', user?.id);

        if (profileError) {
            showAlert('오류', profileError.message);
            setLoading(false);
            return;
        }

        // 비밀번호 변경 (입력했을 때만)
        if (password) {
            const {error: passwordError} = await supabase.auth.updateUser({password});
            if (passwordError) {
                showAlert('오류', passwordError.message);
                setLoading(false);
                return;
            }
        }

        // zustand 유저 정보 갱신
        await fetchUser();
        setLoading(false);
        setPassword('');
        setPasswordConfirm('');

        showAlert('완료', '정보가 수정되었어요!');
    };

    return (
        <KeyboardAvoidingView
            style={signUpStyles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={signUpStyles.inner} keyboardShouldPersistTaps="handled">

                <View style={signUpStyles.titleArea}>
                    <Pressable style={signUpStyles.backBtn} onPress={() => router.back()}>
                        <Text style={signUpStyles.backText}>← 돌아가기</Text>
                    </Pressable>
                    <Text style={signUpStyles.title}>마이페이지</Text>
                    <Text style={signUpStyles.subtitle}>내 정보를 수정해요.</Text>
                </View>

                <View style={signUpStyles.form}>
                    {/* 이름 - 읽기전용 */}
                    <View>
                        <Text style={signUpStyles.label}>이름</Text>
                        <TextInput
                            style={[signUpStyles.input, {backgroundColor: '#f5f5f5', color: '#aaa'}]}
                            value={user?.name || ''}
                            editable={false}
                        />
                    </View>

                    {/* 이메일 - 읽기전용 */}
                    <View>
                        <Text style={signUpStyles.label}>이메일</Text>
                        <TextInput
                            style={[signUpStyles.input, {backgroundColor: '#f5f5f5', color: '#aaa'}]}
                            value={user?.email || ''}
                            editable={false}
                        />
                    </View>

                    {/* 닉네임 - 수정 가능 */}
                    <View>
                        <Text style={signUpStyles.label}>닉네임</Text>
                        <TextInput
                            style={signUpStyles.input}
                            placeholder="닉네임"
                            placeholderTextColor="#aaa"
                            value={nickname}
                            onChangeText={setNickname}
                            autoCapitalize="none"
                        />
                    </View>

                    {/* 비밀번호 - 선택 입력 */}
                    <View>
                        <Text style={signUpStyles.label}>새 비밀번호 <Text style={{color: '#aaa', fontSize: 12}}>(변경 시에만 입력)</Text></Text>
                        <View style={signUpStyles.inputWrapper}>
                            <TextInput
                                style={signUpStyles.inputFlex}
                                placeholder="6자 이상"
                                placeholderTextColor="#aaa"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                            />
                            <Pressable onPress={() => setShowPassword(!showPassword)} style={signUpStyles.eyeBtn}>
                                <Ionicons
                                    name={showPassword ? "lock-open-outline" : "lock-closed-outline"}
                                    size={20}
                                    color="#aaa"
                                />
                            </Pressable>
                        </View>
                    </View>

                    <View>
                        <Text style={signUpStyles.label}>새 비밀번호 확인</Text>
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
                            <Pressable onPress={() => setShowPasswordConfirm(!showPasswordConfirm)} style={signUpStyles.eyeBtn}>
                                <Ionicons
                                    name={showPasswordConfirm ? "lock-open-outline" : "lock-closed-outline"}
                                    size={20}
                                    color="#aaa"
                                />
                            </Pressable>
                        </View>
                        {passwordConfirm.length > 0 && (
                            <Text style={{fontSize: 12, marginTop: 4, color: password === passwordConfirm ? '#4CAF50' : '#FF5252'}}>
                                {password === passwordConfirm ? '✓ 비밀번호가 일치해요' : '✗ 비밀번호가 일치하지 않아요'}
                            </Text>
                        )}
                    </View>

                    {/* 수정 버튼 */}
                    <Pressable
                        style={[signUpStyles.signupBtn, loading && signUpStyles.btnDisabled]}
                        onPress={handleUpdate}
                        disabled={loading}
                    >
                        <Text style={signUpStyles.signupBtnText}>
                            {loading ? '수정 중...' : '수정하기'}
                        </Text>
                    </Pressable>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}