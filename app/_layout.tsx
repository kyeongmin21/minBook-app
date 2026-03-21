import 'react-native-reanimated';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {Drawer} from 'expo-router/drawer';
import {supabase} from '@/lib/supabase';
import {useAuthStore} from '@/store/authStore';
import {useWishlistStore} from '@/store/useWishlistStore';
import {useEffect} from 'react';
import {StatusBar} from 'expo-status-bar';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import MenuBar from '@/components/MenuBar';


export default function RootLayout() {
    const queryClient = new QueryClient();

    useEffect(() => {
        // 기존 세션 복원 ← 이게 있어야 새로고침해도 유지
        supabase.auth.getSession().then(({data: {session}}) => {
            if (session) {
                useAuthStore.getState().fetchUser();
                useWishlistStore.getState().fetchWishlist();
            }
        });

        const {data: {subscription}} = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN' && session) {
                useAuthStore.getState().fetchUser();
                useWishlistStore.getState().fetchWishlist();
            }
            if (event === 'INITIAL_SESSION' && session) {
                useAuthStore.getState().fetchUser();
                useWishlistStore.getState().fetchWishlist();
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider value={DefaultTheme}>
                    <Drawer
                        drawerContent={(props) => <MenuBar {...props} />}
                        screenOptions={{
                            headerShown: false,
                            drawerType: 'front', // 슝 나오는 타입
                        }}
                    >
                        <Drawer.Screen name="(tabs)"/>
                        <Drawer.Screen name="login" options={{drawerItemStyle: {display: 'none'}}}/>
                    </Drawer>
                    <StatusBar style="auto"/>
                </ThemeProvider>
            </QueryClientProvider>
        </GestureHandlerRootView>
    );
}
