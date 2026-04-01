// 회원가입 로직 전체
import {Alert, Platform} from 'react-native';
import {supabase} from '@/lib/supabase';
import {useState} from 'react';
import {useRouter} from 'expo-router';
import {useSignupValidation} from '@/hooks/useSignUpValidation';


export const useSignup = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [isUserIdChecked, setIsUserIdChecked] = useState(false);
    const [isUserIdAvailable, setIsUserIdAvailable] = useState(false);
    const {validateAll} = useSignupValidation();


    const checkUserId = async (userId: string) => {
        if (!userId) return;

        const {data} = await supabase
            .from('profiles')
            .select('user_id')
            .eq('user_id', userId)
            .maybeSingle();

        if (data) {
            setIsUserIdAvailable(false);
            if (Platform.OS === 'web') {alert ('이미 사용 중인 아이디예요.')}
            Alert.alert('알림', '이미 사용 중인 아이디예요.');
        } else {
            setIsUserIdAvailable(true);
            if (Platform.OS === 'web') {alert ('사용 가능한 아이디예요!')}
            Alert.alert('알림', '사용 가능한 아이디예요!');
        }
        setIsUserIdChecked(true);
    };


    const handleSignup = async (fields: {
        userId: string;
        name: string;
        nickname: string;
        email: string;
        password: string;
        passwordConfirm: string;
    }) => {
        const errorMsg = validateAll(fields);
        if (errorMsg) {
            Alert.alert('알림', errorMsg);
            return;
        }

        setLoading(true);

        if (!isUserIdChecked || !isUserIdAvailable) {
            Alert.alert('알림', '아이디 중복확인을 해주세요.');
            return;
        }

        // 1. 회원가입
        const {data, error} = await supabase.auth.signUp({
            email: fields.email,
            password: fields.password,
            options: {data: {name: fields.name, nickname: fields.nickname}},
        });

        if (error) {
            Alert.alert('오류', error.message);
            setLoading(false);
            return;
        }

        // 2. profiles 저장
        const {error: profileError} = await supabase
            .from('profiles')
            .insert({
                id: data.user?.id,
                user_id: fields.userId,
                email: fields.email,
                name: fields.name,
                nickname: fields.nickname,
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

    return {checkUserId, isUserIdChecked, isUserIdAvailable, handleSignup, loading};
};