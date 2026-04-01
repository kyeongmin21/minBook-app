import {create} from 'zustand';
import {supabase} from '@/lib/supabase';
import {useReadStore} from "@/store/readStore";

interface User {
    id: string;
    user_id: string;
    email: string;
    name: string;
    nickname: string;
    bio: string;
    avatar_url: string;
}

interface AuthStore {
    user: User | null;
    isLoggedIn: boolean;
    isInitialized: boolean;
    setUser: (user: User | null) => void;
    fetchUser: () => Promise<void>;
    logout: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    isLoggedIn: false,
    isInitialized: false,

    setUser: (user) => set({user, isLoggedIn: !!user}),

    // 로그인 후 profiles 테이블에서 유저 정보 가져오기
    fetchUser: async () => {
        const {data: {user}} = await supabase.auth.getUser();
        if (!user) {
            set({isInitialized: true});
            return;
        }

        const {data: profile} = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

        if (profile) {
            set({
                user: {
                    id: user.id,
                    user_id: profile.user_id,
                    email: profile.email,
                    name: profile.name,
                    nickname: profile.nickname,
                    bio: profile.bio,
                    avatar_url: profile.avatar_url,
                },
                isLoggedIn: true,
            });
        }

        set({isInitialized: true});
    },

    logout: async () => {
        await supabase.auth.signOut();
        set({user: null, isLoggedIn: false});
        useReadStore.getState().clearReadList();
    },
}));

useAuthStore.getState().fetchUser();