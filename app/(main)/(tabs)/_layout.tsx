import { Platform } from 'react-native';

import WebLayout from '@/components/Layouts/WebLayout';
import MobileLayout from '@/components/Layouts/MobileLayout';

export default function TabsLayout() {
  if (Platform.OS === 'web') {
    return <WebLayout />;
  } else {
    return <MobileLayout />;
  }
}
