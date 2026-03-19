import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {useAuthStore} from '@/store/authStore';
import {supabase} from '@/lib/supabase';
import {useRouter} from 'expo-router';


export default function MenuBar(props: any) {
    const router = useRouter();
    const {user, isLoggedIn} = useAuthStore();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        useAuthStore.getState().logout(); // zustand 상태 초기화
        props.navigation.closeDrawer();
        Alert.alert('로그아웃', '로그아웃 되었습니다.', [
            { text: '확인', onPress: () => router.replace('/') }
        ]);
    };

    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.container}>

                {/* 유저 정보 */}
                {isLoggedIn ? (
                    <View style={styles.userArea}>
                        <Text style={styles.nickname}>{user?.nickname}님</Text>
                        <Text style={styles.email}>{user?.email}</Text>
                    </View>
                ) : (
                    <TouchableOpacity
                        style={styles.loginBtn}
                        onPress={() => router.push('/login')}
                    >
                        <Text style={styles.loginBtnText}>로그인 / 회원가입</Text>
                    </TouchableOpacity>
                )}

                <View style={styles.divider}/>

                {/* 메뉴 */}
                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => router.push('/(tabs)')}
                >
                    <Text style={styles.menuText}>🏠 홈</Text>
                </TouchableOpacity>

                {/* 로그아웃 (로그인 상태일 때만) */}
                {isLoggedIn && (
                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={handleLogout}
                    >
                        <Text style={[styles.menuText, {color: '#FF5252'}]}>로그아웃</Text>
                    </TouchableOpacity>
                )}
            </View>
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, padding: 20},
    userArea: {paddingVertical: 20},
    nickname: {fontSize: 18, fontWeight: '700', color: '#1a1a1a'},
    email: {fontSize: 13, color: '#999', marginTop: 4},
    loginBtn: {
        backgroundColor: '#1a1a1a',
        borderRadius: 10,
        padding: 14,
        alignItems: 'center',
        marginVertical: 20,
    },
    loginBtnText: {color: '#fff', fontWeight: '700'},
    divider: {height: 1, backgroundColor: '#eee', marginVertical: 16},
    menuItem: {paddingVertical: 14},
    menuText: {fontSize: 15, color: '#333'},
});