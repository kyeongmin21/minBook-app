import React from 'react';
import {Tabs} from 'expo-router';
import {Colors} from '@/constants/theme';
import {HapticTab} from '@/components/haptic-tab';
import {IconSymbol} from '@/components/ui/icon-symbol';
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
                    title: 'Wishlist',
                    tabBarIcon: ({color}) =>
                        <IconSymbol size={28} name="heart.fill" color={color}/>,
                }}
            />
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Books',
                    tabBarIcon: ({color}) =>
                        <IconSymbol size={28} name="bookOpen.fill" color={color}/>,
                }}
            />
            <Tabs.Screen
                name="read"
                options={{
                    title: 'Read',
                    tabBarIcon: ({color}) =>
                        <IconSymbol size={28} name="note.fill" color={color}/>,
                }}
            />
        </Tabs>
    );
}
