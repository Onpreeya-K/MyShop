import Colors from '@/constants/Colors';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Tabs } from 'expo-router';
import React from 'react';

type IconLibrary = 'FontAwesome' | 'MaterialCommunityIcons' | 'AntDesign';

type TabBarIconProps = {
    name: string;
    color: string;
    library?: IconLibrary;
};

export function TabBarIcon({ name, color, library = 'FontAwesome' }: TabBarIconProps) {
    const size = 24;
    switch (library) {
        case 'MaterialCommunityIcons':
            return <MaterialCommunityIcons name={name as any} size={size} color={color} />;
        case 'AntDesign':
            return <AntDesign name={name as any} size={size} color={color} />;
        case 'FontAwesome':
        default:
            return <FontAwesome name={name as any} size={size} color={color} />;
    }
}

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors['light'].tint,
                headerShown: true,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="home-outline" color={color} library="MaterialCommunityIcons" />
                    ),
                }}
            />
            <Tabs.Screen
                name="cart"
                options={{
                    title: 'รถเข็น',
                    tabBarIcon: ({ color }) => <TabBarIcon name="shoppingcart" color={color} library="AntDesign" />,
                }}
            />
            <Tabs.Screen
                name="favorite"
                options={{
                    title: 'Favorite',
                    tabBarIcon: ({ color }) => <TabBarIcon name="heart" color={color} />,
                }}
            />
        </Tabs>
    );
}
