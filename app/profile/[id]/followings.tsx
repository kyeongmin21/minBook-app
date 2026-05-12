import {useEffect, useState} from 'react';
import {router, Href, useLocalSearchParams} from 'expo-router';
import {Pressable} from 'react-native';
import {supabase} from '@/lib/supabase';
import Ionicons from '@expo/vector-icons/Ionicons';
import FollowerListScreen from '@/components/profile/FollowerListScreen';
import {Follower} from '@/types/follow';


export default function FollowingPage() {
    const {id} = useLocalSearchParams<{id: string}>();
    const [following, setFollowing] = useState<Follower[]>([]);

    useEffect(() => {
        const fetchFollowing = async () => {
            const {data: followData} = await supabase
                .from('follows')
                .select('following_id')
                .eq('follower_id', id);

            const ids = followData?.map((follow: {following_id: string}) => follow.following_id) ?? [];
            if (!ids.length) return;

            const {data: profiles} = await supabase
                .from('profiles')
                .select('id, nickname, avatar_url, bio')
                .in('id', ids);

            setFollowing(profiles ?? []);
        };
        fetchFollowing();
    }, [id]);

    return (
        <FollowerListScreen
            followers={following}
            onPressUser={(userId) => router.push(`/profile/${userId}` as Href)}
            backButton={
                <Pressable onPress={() => router.back()} style={{padding: 16}}>
                    <Ionicons name="arrow-back" size={24} color="#000"/>
                </Pressable>
            }
        />
    );
}
