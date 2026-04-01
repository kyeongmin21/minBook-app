import {useState} from 'react';
import {useRouter} from 'expo-router';
import {useSignup} from "@/hooks/useSignUp";
import {useSignupValidation} from '@/hooks/useSignUpValidation';
import Ionicons from '@expo/vector-icons/Ionicons';
import ValidationText from '@/components/validate/ValidationText';
import {useWindowDimensions,
    View, Text, TextInput, KeyboardAvoidingView, ScrollView,
    Pressable, Platform} from 'react-native';
import {signUpStyles} from '@/styles/signUpStyles';


export default function SignupScreen() {
    const router = useRouter();
    const [userId, setUserId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    const {handleSignup, checkUserId, loading} = useSignup();
    const {validateUserId, validateEmail} = useSignupValidation();

    const {width} = useWindowDimensions();
    const isTablet = width >= 768;

    return (
        <KeyboardAvoidingView
            style={signUpStyles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={signUpStyles.inner} keyboardShouldPersistTaps='handled'>

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
                        <Text style={signUpStyles.label}>아이디</Text>
                        <View style={{flexDirection: isTablet ? 'row' : 'column', gap: 8}}>
                            <TextInput
                                style={[signUpStyles.input, isTablet && {flex: 1}]}
                                placeholder='영문 소문자, 숫자만 사용 가능'
                                placeholderTextColor='#aaa'
                                value={userId}
                                onChangeText={(text) => setUserId(text.toLowerCase())}
                                autoCapitalize='none'
                                maxLength={15}
                            />
                            <Pressable
                                style={[signUpStyles.duplicateCheckBtn, {paddingVertical: isTablet ? 0 : 12}]}
                                onPress={() => checkUserId(userId)}>
                                <Text style={{color: '#333', fontSize: 13}}>중복확인</Text>
                            </Pressable>
                        </View>
                        <ValidationText
                            value={userId}
                            isValid={!validateUserId(userId)}
                            validMsg='올바른 형식이에요'
                            invalidMsg='영문 소문자, 숫자만 사용할 수 있어요'
                        />
                    </View>

                    <View>
                        <Text style={signUpStyles.label}>이름</Text>
                        <TextInput
                            style={signUpStyles.input}
                            placeholder='이름'
                            placeholderTextColor='#aaa'
                            value={name}
                            onChangeText={setName}
                            autoCapitalize='none'
                            maxLength={15}
                        />
                    </View>

                    <View>
                        <Text style={signUpStyles.label}>이메일</Text>
                        <TextInput
                            style={signUpStyles.input}
                            placeholder='example@email.com'
                            placeholderTextColor='#aaa'
                            value={email}
                            onChangeText={setEmail}
                            keyboardType='email-address'
                            autoCapitalize='none'
                        />
                        <ValidationText
                            value={email}
                            isValid={!validateEmail(email)}
                            validMsg='올바른 이메일 형식이에요'
                            invalidMsg='이메일 형식이 올바르지 않아요'
                        />
                    </View>


                    <View>
                        <Text style={signUpStyles.label}>닉네임</Text>
                        <TextInput
                            style={signUpStyles.input}
                            placeholder='사용할 닉네임'
                            placeholderTextColor='#aaa'
                            value={nickname}
                            onChangeText={setNickname}
                            autoCapitalize='none'
                            maxLength={15}
                        />
                    </View>

                    <View>
                        <Text style={signUpStyles.label}>비밀번호</Text>
                        <View style={signUpStyles.inputWrapper}>
                            <TextInput
                                style={signUpStyles.inputFlex}
                                placeholder='6자 이상'
                                placeholderTextColor='#aaa'
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                            />
                            <Pressable
                                onPress={() => setShowPassword(!showPassword)}
                                style={signUpStyles.eyeBtn}
                            >
                                <Ionicons
                                    name={showPassword ? 'lock-open-outline' : 'lock-closed-outline'}
                                    size={20}
                                    color='#aaa'
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
                                placeholder='비밀번호 재입력'
                                placeholderTextColor='#aaa'
                                value={passwordConfirm}
                                onChangeText={setPasswordConfirm}
                                secureTextEntry={!showPasswordConfirm}
                            />
                            <Pressable
                                onPress={() => setShowPasswordConfirm(!showPasswordConfirm)}
                                style={signUpStyles.eyeBtn}
                            >
                                <Ionicons
                                    name={showPasswordConfirm ? 'lock-open-outline' : 'lock-closed-outline'}
                                    size={20}
                                    color='#aaa'
                                />
                            </Pressable>
                        </View>
                        <ValidationText
                            value={passwordConfirm}
                            isValid={password === passwordConfirm}
                            validMsg='비밀번호가 일치해요'
                            invalidMsg='비밀번호가 일치하지 않아요'
                        />
                    </View>

                    {/* 가입 버튼 */}
                    <Pressable
                        style={[signUpStyles.signupBtn, loading && signUpStyles.btnDisabled]}
                        onPress={() => handleSignup({userId, name, nickname, email, password, passwordConfirm})}
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
