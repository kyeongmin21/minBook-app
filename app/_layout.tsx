import 'react-native-reanimated';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {Stack} from 'expo-router';
import {StatusBar} from 'expo-status-bar';

export default function RootLayout() {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider value={DefaultTheme}>
                <Stack>
                    <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
                    <Stack.Screen name="modal" options={{presentation: 'modal', title: 'Modal'}}/>
                </Stack>
                <StatusBar style="auto"/>
            </ThemeProvider>
        </QueryClientProvider>
    );
}
