import {Slot, router} from 'expo-router';
import {useEffect} from 'react';
import {useAuthStore} from '@/store/authStore';

export default function ProtectedLayout() {
    const {isLoggedIn} = useAuthStore();

    useEffect(() => {
        if (!isLoggedIn) {
            router.replace('/login');
        }
    }, [isLoggedIn]);

    if (!isLoggedIn) return null;

    return <Slot/>;
}