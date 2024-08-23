import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import HeaderLoginLink from '@/components/Links/HeaderLoginLink';

const MobileLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#000000',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Campaign',
          tabBarIcon: ({ color }) => <Ionicons name="home" size={30} color={color} />,
          headerRight: () => <HeaderLoginLink />,
        }}
      />
      <Tabs.Screen
        name="store"
        options={{
          title: 'Store',
          tabBarIcon: ({ color }) => <Ionicons name="storefront" size={30} color={color} />,
          headerRight: () => <HeaderLoginLink />,
        }}
      />
      <Tabs.Screen
        name="voucher"
        options={{
          title: 'Voucher',
          tabBarIcon: ({ color }) => <Ionicons name="gift" size={30} color={color} />,
        }}
      />
      <Tabs.Screen
        name="feed"
        options={{
          title: 'Feed',
          tabBarIcon: ({ color }) => <Ionicons name="notifications" size={30} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Ionicons name="person" size={30} color={color} />,
        }}
      />
    </Tabs>
  );
};

export default MobileLayout;
