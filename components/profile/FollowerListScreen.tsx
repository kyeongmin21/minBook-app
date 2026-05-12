import {FlatList, View, Text, Image, Pressable} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {FollowerProps} from '@/types/follow';
import {followerListStyles} from '@/styles/followerListStyle';


export default function FollowerListScreen({followers, onPressUser, backButton}: FollowerProps) {
    return (
        <FlatList
            style={{backgroundColor: '#fff'}}
            data={followers}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={
                <View>
                    {backButton}
                    <Text style={followerListStyles.title}>팔로워</Text>
                </View>
            }
            renderItem={({item}) => (
                <Pressable style={followerListStyles.row} onPress={() => onPressUser(item.id)}>
                    {item.avatar_url ? (
                        <Image source={{uri: item.avatar_url}} style={followerListStyles.avatar}/>
                    ) : (
                        <View style={[followerListStyles.avatar, followerListStyles.avatarFallback]}>
                            <Ionicons name="person-outline" size={24} color="#aaa"/>
                        </View>
                    )}
                    <View style={followerListStyles.info}>
                        <Text style={followerListStyles.nickname}>{item.nickname}</Text>
                        {item.bio
                            ? <Text style={followerListStyles.bio} numberOfLines={1}>{item.bio}</Text>
                            : null}
                    </View>
                </Pressable>
            )}
            ListEmptyComponent={
                <View style={followerListStyles.emptyContainer}>
                    <Text style={followerListStyles.emptyText}>팔로워가 없습니다</Text>
                </View>
            }
            ItemSeparatorComponent={() => <View style={followerListStyles.separator}/>}
        />
    );
}
