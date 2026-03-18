import 'react-native-reanimated';
import {View, Text} from 'react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {Drawer} from 'expo-router/drawer';
import {StatusBar} from 'expo-status-bar';
import {GestureHandlerRootView} from 'react-native-gesture-handler';


export default function RootLayout() {
    const queryClient = new QueryClient();

    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider value={DefaultTheme}>
                    <Drawer
                        screenOptions={{
                            headerShown: false,
                            drawerType: 'front', // 슝 나오는 타입
                        }}
                    >
                        <Drawer.Screen name="(tabs)"/>
                        <Drawer.Screen name="modal"/>
                    </Drawer>
                    <StatusBar style="auto"/>
                </ThemeProvider>
            </QueryClientProvider>
        </GestureHandlerRootView>
    );
}
