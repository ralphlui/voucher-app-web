import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
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
        }}
      />
      <Tabs.Screen
        name="Store"
        options={{
          title: 'Store',
          tabBarIcon: ({ color }) => <Ionicons name="storefront" size={30} color={color} />,
        }}
      />
      <Tabs.Screen
        name="Voucher"
        options={{
          title: 'Voucher',
          tabBarIcon: ({ color }) => <Ionicons name="gift" size={30} color={color} />,
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Ionicons name="person" size={30} color={color} />,
        }}
      />
    </Tabs>
  );
}
