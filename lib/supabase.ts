import {Platform} from 'react-native';
import {createClient} from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';

const ExpoSecureStoreAdapter = {
    getItem: (key: string) => SecureStore.getItemAsync(key),
    setItem: (key: string, value: string) => SecureStore.setItemAsync(key, value),
    removeItem: (key: string) => SecureStore.deleteItemAsync(key),
};


// 웹이면 localStorage, 앱이면 SecureStore
const storage = Platform.OS === 'web' ? {
    getItem: (key: string) => {
        if (typeof window === 'undefined') return Promise.resolve(null); // ← SSR 방어
        return Promise.resolve(localStorage.getItem(key));
    },
    setItem: (key: string, value: string) => {
        if (typeof window === 'undefined') return Promise.resolve();  // ← SSR 방어
        return Promise.resolve(localStorage.setItem(key, value));
    },
    removeItem: (key: string) => {
        if (typeof window === 'undefined') return Promise.resolve();  // ← SSR 방어
        return Promise.resolve(localStorage.removeItem(key));
    },
} : ExpoSecureStoreAdapter;


const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!


export const supabase = createClient(
    supabaseUrl,
    supabaseAnonKey, {
        auth: {
            storage: storage, // 웹이면 undefined가 되어 에러를 피함
            autoRefreshToken: true,
            persistSession: true,  // ← 로그인 성공하면 세션 자동으로 저장하겠다!
            detectSessionInUrl: false,
        },
    });