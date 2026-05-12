import {useEffect, useState} from 'react';
import {router, Href, useLocalSearchParams} from 'expo-router';
import {Pressable} from 'react-native';
import {supabase} from '@/lib/supabase';
import Ionicons from '@expo/vector-icons/Ionicons';
import FollowerListScreen from '@/components/profile/FollowerListScreen';
import {Follower} from '@/types/follow';


export default function FollowersPage() {
    const {id} = useLocalSearchParams<{id: string}>();
    const [followers, setFollowers] = useState<Follower[]>([]);

    useEffect(() => {
        const fetchFollowers = async () => {
            const {data: followData} = await supabase
                .from('follows')
                .select('follower_id')
                .eq('following_id', id);

            const ids = followData?.map((follow: {follower_id: string}) => follow.follower_id) ?? [];
            if (!ids.length) return;

            const {data: profiles} = await supabase
                .from('profiles')
                .select('id, nickname, avatar_url, bio')
                .in('id', ids);

            setFollowers(profiles ?? []);
        };
        fetchFollowers();
    }, [id]);

    return (
        <FollowerListScreen
            followers={followers}
            onPressUser={(userId) => router.push(`/profile/${userId}` as Href)}
            backButton={
                <Pressable onPress={() => router.back()} style={{padding: 16}}>
                    <Ionicons name="arrow-back" size={24} color="#000"/>
                </Pressable>
            }
        />
    );
}
