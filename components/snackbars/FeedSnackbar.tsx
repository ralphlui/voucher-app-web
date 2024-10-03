import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Snackbar, Text } from 'react-native-paper';
import { useRouter } from 'expo-router';

const FeedSnackbar = () => {
  const message = useSelector((state: RootState) => state.auth.message);
  const [visible, setVisible] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    if (message) {
      setVisible(true);
    }
  }, [message]);
  return (
    <Snackbar
      visible={visible}
      onDismiss={() => setVisible(false)}
      duration={10000}
      action={{
        label: 'View',
        onPress: () => {
          router.push(`/(main)/campaign/${message?.campaignId ?? ''}`);
        },
      }}>
      {message?.campaignDescription} @ {message?.storeName}
    </Snackbar>
  );
};

export default FeedSnackbar;
