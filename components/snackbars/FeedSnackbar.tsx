import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Snackbar, Text } from 'react-native-paper';

const FeedSnackbar = () => {
  const message = useSelector((state: RootState) => state.auth.message);
  const [visible, setVisible] = useState<boolean>(true);
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
        onPress: () => {}, // route to campaign
      }}>
      There is a campaign just promoted.
    </Snackbar>
  );
};

export default FeedSnackbar;
