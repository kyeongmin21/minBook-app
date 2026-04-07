import {Image} from 'expo-image';
import {View, Text, FlatList} from 'react-native';
import {useLocalSearchParams} from 'expo-router';
import {useEffect, useState} from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import {supabase} from '@/lib/supabase';
import {profileStyles} from '@/styles/profileStyles';


type UserProfile = {
    id: string;
    nickname: string;
    avatar_url: string | null;
    bio: string | null;
};

type WishlistItem = {
    isbn: string;
    thumbnail: string;
};

export default function UserProfileScreen() {
    const {userId} = useLocalSearchParams<{userId: string}>();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

    useEffect(() => {
        fetchUserProfile();
        fetchUserWishlist();
    }, [userId]);

    const fetchUserProfile = async () => {
        const {data} = await supabase
            .from('profiles')
            .select('id, nickname, avatar_url, bio')
            .eq('user_id', userId)
            .single();

        if (data) setProfile(data);
    };

    const fetchUserWishlist = async () => {
        const {data} = await supabase
            .from('wishlists')        // 본인 테이블명으로 변경
            .select('isbn, thumbnail')
            .eq('user_id', userId);

        if (data) setWishlist(data);
    };

    return (
        <FlatList
            style={{backgroundColor: '#fff'}}
            data={wishlist}
            numColumns={3}
            keyExtractor={(item) => item.isbn}
            ListHeaderComponent={
                <View>
                    <View style={profileStyles.profileSection}>
                        {profile?.avatar_url ? (
                            <Image source={{uri: profile.avatar_url}} style={profileStyles.avatar}/>
                        ) : (
                            <View style={[profileStyles.avatar, profileStyles.avatarFallback]}>
                                <Ionicons name='person-outline' size={36} color='#aaa'/>
                            </View>
                        )}

                        <View style={profileStyles.statsRow}>
                            <View style={profileStyles.statItem}>
                                <Text style={profileStyles.statNumber}>{wishlist.length}</Text>
                                <Text style={profileStyles.statLabel}>찜한책</Text>
                            </View>
                            <View style={profileStyles.statItem}>
                                <Text style={profileStyles.statNumber}>0</Text>
                                <Text style={profileStyles.statLabel}>팔로워</Text>
                            </View>
                            <View style={profileStyles.statItem}>
                                <Text style={profileStyles.statNumber}>0</Text>
                                <Text style={profileStyles.statLabel}>팔로잉</Text>
                            </View>
                        </View>
                    </View>

                    <View style={profileStyles.infoSection}>
                        <Text style={profileStyles.nickname}>{profile?.nickname}</Text>
                        {profile?.bio ? <Text style={profileStyles.bio}>{profile.bio}</Text> : null}
                    </View>

                    {/* 프로필 편집 버튼 없음 (남의 프로필이니까!) */}

                    <Text style={profileStyles.sectionTitle}>찜한 책</Text>
                </View>
            }
            renderItem={({item}) => (
                <Image
                    source={{uri: item.thumbnail}}
                    style={profileStyles.bookThumbnail}
                    contentFit='cover'
                />
            )}
            ListEmptyComponent={
                <View style={profileStyles.emptyContainer}>
                    <Text style={profileStyles.emptyText}>찜한 책이 없습니다</Text>
                </View>
            }
        />
    );
}