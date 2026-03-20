import {useRouter} from 'expo-router';
import {View, Text, Pressable, Alert} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {useAuthStore} from '@/store/authStore';
import {supabase} from '@/lib/supabase';
import {menuBarStyles} from "@/styles/menuBarStyle";
import Ionicons from "@expo/vector-icons/Ionicons";

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
            <View style={menuBarStyles.container}>

                {/* 유저 정보 */}
                {isLoggedIn ? (
                    <View style={menuBarStyles.userArea}>
                        <Text style={menuBarStyles.nickname}>{user?.nickname}님</Text>
                        <Text style={menuBarStyles.email}>{user?.email}</Text>
                    </View>
                ) : (
                    <Pressable
                        style={menuBarStyles.loginBtn}
                        onPress={() => router.push('/login')}>
                        <Text style={menuBarStyles.loginBtnText}>로그인 / 회원가입</Text>
                    </Pressable>
                )}

                <View style={menuBarStyles.divider}/>

                {/* 메뉴 */}
                <View style={menuBarStyles.menuList}>
                    <Pressable
                        style={menuBarStyles.menuItem}
                        onPress={() => { props.navigation.closeDrawer(); router.push('/(tabs)'); }}
                    >
                        <Ionicons name="home-outline" size={20} color="#333" />
                        <Text style={menuBarStyles.menuText}>홈</Text>
                    </Pressable>

                    <Pressable
                        style={menuBarStyles.menuItem}
                        onPress={() => { props.navigation.closeDrawer(); router.push('/(tabs)/wishlist'); }}
                    >
                        <Ionicons name="bookmark-outline" size={20} color="#333" />
                        <Text style={menuBarStyles.menuText}>북마크</Text>
                    </Pressable>

                    <Pressable
                        style={menuBarStyles.menuItem}
                        onPress={() => { props.navigation.closeDrawer(); router.push('/(tabs)/read'); }}
                    >
                        <Ionicons name="book-outline" size={20} color="#333" />
                        <Text style={menuBarStyles.menuText}>읽은 책</Text>
                    </Pressable>

                    <Pressable
                        style={menuBarStyles.menuItem}
                        onPress={() => { props.navigation.closeDrawer(); router.push('/mypage'); }}
                    >
                        <Ionicons name="person-outline" size={20} color="#333" />
                        <Text style={menuBarStyles.menuText}>마이페이지</Text>
                    </Pressable>
                </View>

                {/* 로그아웃 (로그인 상태일 때만) */}
                {isLoggedIn && (
                    <Pressable style={menuBarStyles.menuItem} onPress={handleLogout}>
                        <Text style={[menuBarStyles.menuText, {color: '#FF5252'}]}>로그아웃</Text>
                    </Pressable>
                )}
            </View>
        </DrawerContentScrollView>
    );
}

