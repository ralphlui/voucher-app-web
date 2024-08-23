import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { Platform } from 'react-native';

import HeaderLoginLink from '@/components/Links/HeaderLoginLink';

export default function TabsLayout() {
  if (Platform.OS === 'web') {
    return (
      <Drawer>
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: 'Campaign',
            title: 'Campaign',
            headerRight: () => <HeaderLoginLink />,
          }}
        />
        <Drawer.Screen
          name="store"
          options={{
            drawerLabel: 'Store',
            title: 'Store',
            headerRight: () => <HeaderLoginLink />,
          }}
        />
        <Drawer.Screen
          name="voucher"
          options={{
            drawerLabel: 'Voucher',
            title: 'Voucher',
          }}
        />
        <Drawer.Screen
          name="feed"
          options={{
            drawerLabel: 'Feed',
            title: 'Feed',
          }}
        />
        <Drawer.Screen
          name="profile"
          options={{
            drawerLabel: 'Profile',
            title: 'Profile',
          }}
        />
      </Drawer>
    );
  } else {
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
  }
}
