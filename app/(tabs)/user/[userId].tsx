import {Pressable} from 'react-native';
import {router, useLocalSearchParams} from 'expo-router';
import {supabase} from '@/lib/supabase';
import {useAuthStore} from "@/store/authStore";
import {useEffect, useState} from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {UserProfile} from "@/types/user";
import {WishlistItem} from "@/types/wishlist";
import ProfileScreen from "@/components/profile/ProfileScreen";


export default function UserProfileScreen() {
    const insets = useSafeAreaInsets();
    const {user} = useAuthStore();
    const {userId, bookIsbn} = useLocalSearchParams<{ userId: string; bookIsbn: string }>();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
    const [isFollowing, setIsFollowing] = useState(false);
    const [followerCount, setFollowerCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const isMyProfile = user?.user_id === userId;

    const toggleFollow = async () => {
        if (!user || !profile) return;
        if (isFollowing) {
            await supabase.from('follows').delete().eq('follower_id', user.id).eq('following_id', profile.id);
            setIsFollowing(false);
            setFollowerCount(c => c - 1);
        } else {
            await supabase.from('follows').insert({follower_id: user.id, following_id: profile.id});
            setIsFollowing(true);
            setFollowerCount(c => c + 1);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            const {data: profileData} = await supabase
                .from('profiles').select('id, nickname, avatar_url, bio').eq('user_id', userId).single();

            if (profileData) {
                setProfile(profileData);

                const [wishlistData, followingCheck, followers, following] = await Promise.all([
                    supabase.from('wishlists').select('isbn, thumbnail').eq('user_id', profileData.id),
                    supabase.from('follows').select('id').eq('follower_id', user?.id).eq('following_id', profileData.id).single(),
                    supabase.from('follows').select('*', {
                        count: 'exact',
                        head: true
                    }).eq('following_id', profileData.id),
                    supabase.from('follows').select('*', {
                        count: 'exact',
                        head: true
                    }).eq('follower_id', profileData.id),
                ]);

                if (wishlistData.data) setWishlist(wishlistData.data);
                setIsFollowing(!!followingCheck.data);
                setFollowerCount(followers.count ?? 0);
                setFollowingCount(following.count ?? 0);
            }
        };
        loadData();
    }, [userId]);

    return (
        <ProfileScreen
            avatar_url={profile?.avatar_url ?? null}
            nickname={profile?.nickname ?? ''}
            bio={profile?.bio ?? null}
            wishlist={wishlist}
            followerCount={followerCount}
            followingCount={followingCount}
            isMyProfile={isMyProfile}
            isFollowing={isFollowing}
            onToggleFollow={toggleFollow}
            onEditProfile={() => router.push('/(protected)/mypage')}
            backButton={
                <Pressable
                    style={{marginTop: insets.top, padding: 16}}
                    onPress={() => router.push(`/(tabs)/book/${encodeURIComponent(bookIsbn)}`)}
                >
                    <Ionicons name='arrow-back' size={24} color='#1a1a1a'/>
                </Pressable>
            }
        />
    );
}