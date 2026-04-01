import {Image} from 'expo-image';
import {View, Text, FlatList, Pressable} from 'react-native';
import {router} from "expo-router";
import {useAuthStore} from '@/store/authStore';
import {useWishlistStore} from '@/store/useWishlistStore';
import {profileStyles} from '@/styles/profileStyles';
import {useEffect} from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';


export default function ProfileScreen() {
    const {user, isLoggedIn} = useAuthStore();
    const {wishlist, fetchWishlist} = useWishlistStore();

    useEffect(() => {
        if (isLoggedIn) fetchWishlist();
    }, [isLoggedIn]);

    return (
        <FlatList
            style={{backgroundColor: '#fff'}}
            data={wishlist}
            numColumns={3}
            keyExtractor={(item) => item.isbn}
            ListHeaderComponent={
                <View>
                    {/* 프로필 영역 */}
                    <View style={profileStyles.profileSection}>
                        {/* 아바타 */}
                        {user?.avatar_url ? (
                            <Image source={{uri: user.avatar_url}} style={profileStyles.avatar}/>
                        ) : (
                            <View style={[profileStyles.avatar, profileStyles.avatarFallback]}>
                                <Ionicons name='person-outline' size={36} color='#aaa'/>
                            </View>
                        )}

                        {/* 팔로우/팔로워/찜 통계 */}
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

                    {/* 닉네임 & 소개 */}
                    <View style={profileStyles.infoSection}>
                        <Text style={profileStyles.nickname}>{user?.nickname ?? user?.name}</Text>
                        {user?.bio ? <Text style={profileStyles.bio}>{user.bio}</Text> : null}
                    </View>

                    {/* 프로필 편집 버튼 */}
                    <Pressable style={profileStyles.editButton}
                    onPress={() => router.replace('/mypage')}>
                        <Text style={profileStyles.editButtonText}>프로필 편집</Text>
                    </Pressable>

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

