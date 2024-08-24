import { Ionicons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';
import React from 'react';

import LoginButton from '@/components/buttons/LoginButton';
import useAuth from '@/hooks/useAuth';
import { UserTypesEnum } from '@/types/User';

const WebLayout = () => {
  const auth = useAuth();
  return (
    <Drawer>
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: 'Campaign',
          title: 'Campaign',
          drawerIcon: ({ color }) => <Ionicons name="bag-handle" size={30} color={color} />,
          headerRight: () => !auth.success && <LoginButton />,
        }}
      />
      <Drawer.Screen
        name="store"
        options={{
          drawerLabel: 'Store',
          title: 'Store',
          drawerIcon: ({ color }) => <Ionicons name="storefront" size={30} color={color} />,
          headerRight: () => !auth.success && <LoginButton />,
        }}
      />
      <Drawer.Screen
        name="voucher"
        redirect={!(auth.role === UserTypesEnum.CUSTOMER)}
        options={{
          drawerLabel: 'Voucher',
          title: 'Voucher',
          drawerIcon: ({ color }) => <Ionicons name="gift" size={30} color={color} />,
        }}
      />
      <Drawer.Screen
        name="feed"
        redirect={!(auth.role === UserTypesEnum.CUSTOMER)}
        options={{
          drawerLabel: 'Feed',
          title: 'Feed',
          drawerIcon: ({ color }) => <Ionicons name="notifications" size={30} color={color} />,
        }}
      />
      <Drawer.Screen
        name="profile"
        redirect={!(auth.role !== null)}
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
