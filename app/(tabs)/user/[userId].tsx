import {Image} from 'expo-image';
import {View, Text, FlatList, Pressable} from 'react-native';
import {router, useLocalSearchParams} from 'expo-router';
import {supabase} from '@/lib/supabase';
import {profileStyles} from '@/styles/profileStyles';
import {useEffect, useState} from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {UserProfile} from "@/types/user";
import {WishlistItem} from "@/types/wishlist";


export default function UserProfileScreen() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
    const insets = useSafeAreaInsets();
    const {userId, bookIsbn} = useLocalSearchParams<{userId: string, bookIsbn: string}>();

    const fetchUserWishlist = async (profileId: string) => {
        const {data} = await supabase
            .from('wishlists')
            .select('isbn, thumbnail')
            .eq('user_id', profileId);
        if (data) setWishlist(data);
    };

    useEffect(() => {
        const loadData = async () => {
            const {data: profileData} = await supabase
                .from('profiles')
                .select('id, nickname, avatar_url, bio')
                .eq('user_id', userId)
                .single();

            if (profileData) {
                setProfile(profileData);
                fetchUserWishlist(profileData.id);
            }
        };

        loadData();
    }, [userId]);

    return (
        <FlatList
            style={{backgroundColor: '#fff'}}
            data={wishlist}
            numColumns={3}
            keyExtractor={(item) => item.isbn}
            ListHeaderComponent={
                <View>
                    <Pressable
                        style={{marginTop: insets.top, padding: 16}}
                        onPress={() => router.push(`/(tabs)/book/${encodeURIComponent(bookIsbn)}`)}
                    >
                        <Ionicons name='arrow-back' size={24} color='#1a1a1a'/>
                    </Pressable>
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