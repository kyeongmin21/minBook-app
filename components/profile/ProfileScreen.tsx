import {Image} from 'expo-image';
import {View, Text, FlatList, Pressable} from 'react-native';
import {router} from 'expo-router';
import {profileStyles} from '@/styles/profileStyles';
import Ionicons from '@expo/vector-icons/Ionicons';

type Props = {
    avatar_url: string | null;
    nickname: string;
    bio: string | null;
    wishlist: {isbn: string; thumbnail: string}[];
    followerCount: number;
    followingCount: number;
    isMyProfile: boolean;
    isFollowing?: boolean;
    onToggleFollow?: () => void;
    onEditProfile?: () => void;
    backButton?: React.ReactNode;  // 뒤로가기 버튼 (있을 때만)
};

export default function ProfileScreen({
                                          avatar_url,
                                          nickname,
                                          bio,
                                          wishlist,
                                          followerCount,
                                          followingCount,
                                          isMyProfile,
                                          isFollowing,
                                          onToggleFollow,
                                          onEditProfile,
                                          backButton,
                                      }: Props) {
    return (
        <FlatList
            style={{backgroundColor: '#fff'}}
            data={wishlist}
            numColumns={3}
            keyExtractor={(item) => item.isbn}
            ListHeaderComponent={
                <View>
                    {/* 뒤로가기 (있을 때만) */}
                    {backButton}

                    <View style={profileStyles.profileSection}>
                        {avatar_url ? (
                            <Image source={{uri: avatar_url}} style={profileStyles.avatar}/>
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
                                <Text style={profileStyles.statNumber}>{followerCount}</Text>
                                <Text style={profileStyles.statLabel}>팔로워</Text>
                            </View>
                            <View style={profileStyles.statItem}>
                                <Text style={profileStyles.statNumber}>{followingCount}</Text>
                                <Text style={profileStyles.statLabel}>팔로잉</Text>
                            </View>
                        </View>
                    </View>

                    <View style={profileStyles.infoSection}>
                        <Text style={profileStyles.nickname}>{nickname}</Text>
                        {bio ? <Text style={profileStyles.bio}>{bio}</Text> : null}
                    </View>

                    {isMyProfile ? (
                        <Pressable style={profileStyles.editButton} onPress={onEditProfile}>
                            <Text style={profileStyles.editButtonText}>프로필 편집</Text>
                        </Pressable>
                    ) : (
                        <Pressable
                            style={[profileStyles.editButton, isFollowing && {backgroundColor: '#eee'}]}
                            onPress={onToggleFollow}
                        >
                            <Text style={profileStyles.editButtonText}>
                                {isFollowing ? '언팔로우' : '팔로우'}
                            </Text>
                        </Pressable>
                    )}

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