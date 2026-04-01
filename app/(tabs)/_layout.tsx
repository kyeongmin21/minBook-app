import React from 'react';
import {Image} from 'expo-image';
import {Text, StyleSheet, View} from 'react-native';
import {Tabs} from 'expo-router';
import {Colors} from '@/constants/theme';
import {useAuthStore} from '@/store/authStore';
import Header from '@/components/Header';
import Ionicons from '@expo/vector-icons/Ionicons';
import {HapticTab} from '@/components/haptic-tab';
import {useColorScheme} from '@/hooks/use-color-scheme';


const TabLabel = ({focused, color, label}: {
    focused: boolean;
    color: string;
    label: string
}) => (
    <Text style={[styles.label, {color}, focused && styles.focusedLabel]}>
        {label}
    </Text>
);

export default function TabLayout() {
    const colorScheme = useColorScheme();
    const {user, isLoggedIn, isInitialized} = useAuthStore();

    if (!isInitialized) return null;

    return (
        <Tabs
            screenOptions={{
                header: () => <Header/>,
                headerStyle: {backgroundColor: '#fff'},
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                tabBarButton: HapticTab,
            }}>
            <Tabs.Screen
                name='wishlist'
                options={{
                    title: '북마크',
                    tabBarLabel: (props) => <TabLabel {...props} label='북마크'/>,
                    tabBarIcon: ({color}) => (
                        <Image
                            source={require('@/assets/images/heart.png')}
                            style={{width: 28, height: 30}}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name='index'
                options={{
                    title: '홈',
                    tabBarLabel: (props) => <TabLabel {...props} label='홈'/>,
                    tabBarIcon: ({color}) => (
                        <Image
                            source={require('@/assets/images/home.png')}
                            style={{width: 32, height: 30}}
                        />
                    )
                }}
            />

            <Tabs.Screen
                name='read'
                options={{
                    title: '읽은 책',
                    tabBarLabel: (props) => <TabLabel {...props} label=' 읽은책'/>,
                    tabBarIcon: ({color}) => (
                        <Image
                            source={require('@/assets/images/read.png')}
                            style={{width: 28, height: 30}}
                        />
                    )
                }}
            />

            <Tabs.Screen
                name='profile'
                options={{
                    title: '',
                    tabBarLabel: (props) => <TabLabel {...props} label='프로필'/>,
                    href: !isLoggedIn ? null : undefined, // 비로그인시 탭에서 숨김
                    tabBarIcon: () => (
                        user?.avatar_url ? (
                            <Image
                                source={{uri: user.avatar_url}}
                                style={styles.profile}
                            />
                        ) : (
                            <View style={styles.profile}>
                                <Ionicons name='person-outline' size={20} color='#aaa'/>
                            </View>
                        )
                    )
                }}
            />

        </Tabs>
    );
}


const styles = StyleSheet.create({
    label: {
        fontWeight: 'normal',
        fontSize: 11,
    },
    focusedLabel: {
        fontWeight: 'bold',
    },
    profile: {
        width: 30,
        height: 30,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#E8E8E8',
        marginRight: 5,
        alignItems: 'center',
        justifyContent: 'center',
    }
});