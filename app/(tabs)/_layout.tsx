import React from 'react';
import {Image} from "expo-image";
import {Tabs} from 'expo-router';
import {Colors} from '@/constants/theme';
import {HapticTab} from '@/components/haptic-tab';
import {useColorScheme} from '@/hooks/use-color-scheme';


export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
                tabBarButton: HapticTab,
            }}>
            <Tabs.Screen
                name="wishlist"
                options={{
                    title: '북마크',
                    tabBarIcon: ({color}) => (
                        <Image
                            source={require('@/assets/images/heart.png')}
                            style={{
                                width: 30,
                                height: 30,
                            }}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="index"
                options={{
                    title: '홈',
                    tabBarIcon: ({color}) => (
                        <Image
                            source={require('@/assets/images/home.png')}
                            style={{
                                width: 30,
                                height: 30,
                            }}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="read"
                options={{
                    title: '읽은 책',
                    tabBarIcon: ({color}) => (
                        <Image
                            source={require('@/assets/images/read.png')}
                            style={{
                                width: 30,
                                height: 30,
                            }}
                        />
                    )
                }}
            />
        </Tabs>
    );
}
