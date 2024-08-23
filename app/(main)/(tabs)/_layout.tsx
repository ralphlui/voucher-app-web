import { Platform } from 'react-native';

import MobileLayout from '@/components/Layouts/MobileLayout';
import WebLayout from '@/components/Layouts/WebLayout';

export default function TabsLayout() {
  if (Platform.OS === 'web') {
    return <WebLayout />;
  } else {
    return <MobileLayout />;
  }
}
