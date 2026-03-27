import React from 'react';
import {Image} from "expo-image";
import {Text, StyleSheet} from 'react-native';
import {Tabs} from 'expo-router';
import {Colors} from '@/constants/theme';
import {HapticTab} from '@/components/haptic-tab';
import {useColorScheme} from '@/hooks/use-color-scheme';

const TabLabel = ({focused, color, label}: { focused: boolean; color: string; label: string }) => (
    <Text style={[styles.label, {color}, focused && styles.focusedLabel]}>
        {label}
    </Text>
);

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
                    tabBarLabel: (props) => <TabLabel {...props} label="북마크"/>,
                    tabBarIcon: ({color}) => (
                        <Image
                            source={require('@/assets/images/heart.png')}
                            style={{width: 30, height: 30}}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="index"
                options={{
                    title: '홈',
                    tabBarLabel: (props) => <TabLabel {...props} label=" 홈"/>,
                    tabBarIcon: ({color}) => (
                        <Image
                            source={require('@/assets/images/home.png')}
                            style={{width: 35, height: 30}}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="read"
                options={{
                    title: '읽은 책',
                    tabBarLabel: (props) => <TabLabel {...props} label=" 읽은책"/>,
                    tabBarIcon: ({color}) => (
                        <Image
                            source={require('@/assets/images/read.png')}
                            style={{width: 30, height: 32}}
                        />
                    )
                }}
            />
        </Tabs>
    );
}


const styles = StyleSheet.create({
    label: {
        fontWeight: 'normal',
    },
    focusedLabel: {
        fontWeight: 'bold',
    },
});