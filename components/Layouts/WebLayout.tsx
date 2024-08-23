import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import HeaderLoginLink from '@/components/Links/HeaderLoginLink';
import { useSelector } from 'react-redux';

const WebLayout = () => {
  const auth = useSelector((state: any) => state.auth);
  return (
    <Drawer>
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: 'Campaign',
          title: 'Campaign',
          drawerIcon: ({ color }) => <Ionicons name="home" size={30} color={color} />,
          headerRight: () => <HeaderLoginLink />,
        }}
      />
      <Drawer.Screen
        name="store"
        options={{
          drawerLabel: 'Store',
          title: 'Store',
          drawerIcon: ({ color }) => <Ionicons name="storefront" size={30} color={color} />,
          headerRight: () => <HeaderLoginLink />,
        }}
      />
      <Drawer.Screen
        name="voucher"
        redirect={auth.role === 'CUSTOMER'}
        options={{
          drawerLabel: 'Voucher',
          title: 'Voucher',
          drawerIcon: ({ color }) => <Ionicons name="gift" size={30} color={color} />,
        }}
      />
      <Drawer.Screen
        name="feed"
        options={{
          drawerLabel: 'Feed',
          title: 'Feed',
          drawerIcon: ({ color }) => <Ionicons name="notifications" size={30} color={color} />,
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          drawerLabel: 'Profile',
          title: 'Profile',
          drawerIcon: ({ color }) => <Ionicons name="person" size={30} color={color} />,
        }}
      />
    </Drawer>
  );
};

export default WebLayout;
