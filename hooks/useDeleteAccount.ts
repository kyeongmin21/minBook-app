import {supabase} from '@/lib/supabase';
import {router} from 'expo-router';
import {Alert} from 'react-native';

export const useDeleteAccount = () => {
    const deleteAccount = async () => {
        try {
            const {data: {user}} = await supabase.auth.getUser();
            if (!user) throw new Error('유저 정보를 찾을 수 없어요.');

            // 1. 스토리지 파일 삭제 (버킷명/폴더 구조에 맞게 수정)
            const {data: files, error: listError} = await supabase.storage
                .from('avatars') // 🔧 버킷명 수정
                .list(user.id);  // 🔧 유저별 폴더 구조면 user.id, 아니면 수정

            if (listError) throw listError;

            if (files && files.length > 0) {
                const filePaths = files.map(file => `${user.id}/${file.name}`);
                const {error: removeError} = await supabase.storage
                    .from('avatars')
                    .remove(filePaths);
                if (removeError) throw removeError;
            }

            // 2. Auth 계정 삭제 (서비스 롤 키 필요 → Edge Function 권장)
            const {error: deleteError} = await supabase.functions.invoke('delete-user', {
                body: {userId: user.id},
            });
            if (deleteError) throw deleteError;

            // 3. 로컬 세션 정리 후 이동
            await supabase.auth.signOut();
            router.replace('/');

        } catch (error: any) {
            Alert.alert('오류', error.message || '탈퇴 처리 중 문제가 발생했어요.');
        }
    };

    const confirmDelete = () => {
        Alert.alert(
            '정말 탈퇴하시겠어요?',
            '계정과 모든 데이터가 영구적으로 삭제돼요.',
            [
                {text: '취소', style: 'cancel'},
                {text: '탈퇴하기', style: 'destructive', onPress: deleteAccount},
            ]
        );
    };

    return {confirmDelete};
};