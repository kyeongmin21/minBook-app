import {useState} from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import {router} from 'expo-router';
import {supabase} from '@/lib/supabase';
import {useAuthStore} from '@/store/authStore';
import {signUpStyles} from '@/styles/signUpStyles';
import {Image} from 'expo-image';
import {View, Text, TextInput, KeyboardAvoidingView, ScrollView, Pressable, Platform, Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';


export default function MyPageScreen() {
    const {user, fetchUser} = useAuthStore();
    const [nickname, setNickname] = useState(user?.nickname || '');
    const [bio, setBio] = useState(user?.bio || '');
    const [avatarUrl, setAvatarUrl] = useState(user?.avatar_url || '');
    const [avatarFile, setAvatarFile] = useState<any>(null);
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [loading, setLoading] = useState(false);

    // 갤러리에서 사진 선택
    const handlePickImage = async () => {
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            showAlert('알림', '갤러리 접근 권한이 필요해요.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],     // 정사각형 크롭
            quality: 0.7,
        });

        if (!result.canceled) {
            setAvatarUrl(result.assets[0].uri);     // 미리보기용
            setAvatarFile(result.assets[0]);         // 업로드용
        }
    };


    // 스토리지 업로드 후 URL 반환
    const uploadAvatar = async (): Promise<string | null> => {
        if (!avatarFile || !user?.id) return null;

        const ext = avatarFile.uri.split('.').pop();
        const path = `${user.id}/avatar.${ext}`;

        // contentType 명확하게 매핑
        const mimeType =
            ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' :
            ext === 'png' ? 'image/png' :
            ext === 'webp' ? 'image/webp' :
            'image/jpeg'; // 기본값


        const response = await fetch(avatarFile.uri);
        const arrayBuffer = await response.arrayBuffer();

        const {error} = await supabase.storage
            .from('avatars')
            .upload(path, arrayBuffer, {
                contentType: mimeType,
                upsert: true,
            });

        if (error) throw error;

        const {data} = supabase.storage.from('avatars').getPublicUrl(path);
        return data.publicUrl;
    };


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

        try {
            // 1. 사진 변경됐으면 업로드
            let newAvatarUrl = avatarUrl;
            if (avatarFile) {
                newAvatarUrl = await uploadAvatar() ?? avatarUrl;
            }

            // 2. 프로필 업데이트 (nickname + bio + avatar_url 한 번에)
            const {error: profileError} = await supabase
                .from('profiles')
                .update({nickname, bio, avatar_url: newAvatarUrl})
                .eq('id', user?.id);

            if (profileError) throw profileError;

            // 3. 비밀번호 변경 (입력했을 때만)
            if (password) {
                const {error: passwordError} = await supabase.auth.updateUser({password});
                if (passwordError) throw passwordError;
            }

            // zustand 유저 정보 갱신
            await fetchUser();
            setPassword('');
            setPasswordConfirm('');
            showAlert('완료', '정보가 수정되었어요!');

        } catch (error: any) {
            showAlert('오류', error.message);
        } finally {
            setLoading(false);
        }


    };

    return (
        <KeyboardAvoidingView
            style={signUpStyles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={signUpStyles.inner} keyboardShouldPersistTaps='handled'>

                <View style={signUpStyles.titleArea}>
                    <Pressable style={signUpStyles.backBtn} onPress={() => router.back()}>
                        <Text style={signUpStyles.backText}>← 돌아가기</Text>
                    </Pressable>
                    <Text style={signUpStyles.title}>마이페이지</Text>
                    <Text style={signUpStyles.subtitle}>내 정보를 수정해요.</Text>
                </View>

                <View style={signUpStyles.form}>
                    {/* 프로필 사진 */}
                    <View style={signUpStyles.profilePhoto}>
                        <Pressable onPress={handlePickImage}>
                            {avatarUrl ? (
                                <Image source={{uri: avatarUrl}}
                                        style={signUpStyles.profileImage}
                                />
                            ) : (
                                <View style={signUpStyles.profileView}>
                                    <Ionicons name='person-outline' size={40} color='#aaa'/>
                                </View>
                            )}
                            <View style={signUpStyles.camera}>
                                <Ionicons name='camera-outline' size={14} color='#fff'/>
                            </View>
                        </Pressable>
                        <Text style={signUpStyles.profileText}>사진을 눌러 변경해요</Text>
                    </View>


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
                            placeholder='닉네임'
                            placeholderTextColor='#aaa'
                            value={nickname}
                            onChangeText={setNickname}
                            autoCapitalize='none'
                            maxLength={10}
                        />
                        <Text style={signUpStyles.maxLengthText}>{nickname.length}/10</Text>
                    </View>

                    {/* 자기소개 */}
                    <View>
                        <Text style={signUpStyles.label}>자기소개</Text>
                        <TextInput
                            style={[signUpStyles.input, {paddingTop: 10}]}
                            placeholder='자기소개를 입력해주세요'
                            placeholderTextColor='#aaa'
                            value={bio}
                            onChangeText={setBio}
                            maxLength={100}
                            multiline
                        />
                        <Text style={signUpStyles.maxLengthText}>{bio.length}/100</Text>
                    </View>


                    {/* 비밀번호 - 선택 입력 */}
                    <View>
                        <Text style={signUpStyles.label}>새 비밀번호 <Text style={{color: '#aaa', fontSize: 12}}>(변경 시에만
                            입력)</Text></Text>
                        <View style={signUpStyles.inputWrapper}>
                            <TextInput
                                style={signUpStyles.inputFlex}
                                placeholder='6자 이상'
                                placeholderTextColor='#aaa'
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                            />
                            <Pressable onPress={() => setShowPassword(!showPassword)} style={signUpStyles.eyeBtn}>
                                <Ionicons
                                    name={showPassword ? 'lock-open-outline' : 'lock-closed-outline'}
                                    size={20}
                                    color='#aaa'
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
                                placeholder='비밀번호 재입력'
                                placeholderTextColor='#aaa'
                                value={passwordConfirm}
                                onChangeText={setPasswordConfirm}
                                secureTextEntry={!showPasswordConfirm}
                            />
                            <Pressable onPress={() => setShowPasswordConfirm(!showPasswordConfirm)}
                                       style={signUpStyles.eyeBtn}>
                                <Ionicons
                                    name={showPasswordConfirm ? 'lock-open-outline' : 'lock-closed-outline'}
                                    size={20}
                                    color='#aaa'
                                />
                            </Pressable>
                        </View>
                        {passwordConfirm.length > 0 && (
                            <Text style={{
                                fontSize: 12,
                                marginTop: 4,
                                color: password === passwordConfirm ? '#4CAF50' : '#FF5252'
                            }}>
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


                <Pressable onPress={() => router.replace('/')}>
                    <Text style={signUpStyles.backText}>탈퇴하기</Text>
                </Pressable>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}