import {router} from "expo-router";
import {supabase} from "@/lib/supabase";
import {useAuthStore} from '@/store/authStore';
import {useWishlistStore} from '@/store/useWishlistStore';
import {useState, useEffect} from 'react';
import ProfileScreen from "@/components/profile/ProfileScreen";


export default function Profile() {
    const {user, isLoggedIn} = useAuthStore();
    const {wishlist, fetchWishlist} = useWishlistStore();
    const [followerCount, setFollowerCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);

    useEffect(() => {
        if (isLoggedIn) fetchWishlist();
    }, [isLoggedIn]);

    useEffect(() => {
        if (!user) return;
        const fetchFollowCounts = async () => {
            const [{count: followers}, {count: following}] = await Promise.all([
                supabase.from('follows').select('*', {count: 'exact', head: true}).eq('following_id', user.id),
                supabase.from('follows').select('*', {count: 'exact', head: true}).eq('follower_id', user.id),
            ]);
            setFollowerCount(followers ?? 0);
            setFollowingCount(following ?? 0);
        };
        fetchFollowCounts();
    }, [user]);

    return (
        <ProfileScreen
            avatar_url={user?.avatar_url ?? null}
            nickname={user?.nickname ?? user?.name ?? ''}
            bio={user?.bio ?? null}
            wishlist={wishlist}
            followerCount={followerCount}
            followingCount={followingCount}
            isMyProfile={true}
            onEditProfile={() => router.replace('/mypage')}
        />
    );
}
