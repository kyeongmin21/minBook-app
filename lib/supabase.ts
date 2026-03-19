import {Platform} from 'react-native';
import {createClient} from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';

const ExpoSecureStoreAdapter = {
    getItem: (key: string) => SecureStore.getItemAsync(key),
    setItem: (key: string, value: string) => SecureStore.setItemAsync(key, value),
    removeItem: (key: string) => SecureStore.deleteItemAsync(key),
};

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!


// 웹 환경일 때는 기본 localStorage를 쓰거나 처리를 건너뛰어야 함
const storage = Platform.OS === 'web' ? undefined : ExpoSecureStoreAdapter;


export const supabase = createClient(
    supabaseUrl,
    supabaseAnonKey, {
        auth: {
            storage: storage, // 웹이면 undefined가 되어 에러를 피함
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: false,
        },
    });