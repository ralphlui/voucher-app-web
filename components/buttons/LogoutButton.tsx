import { router } from 'expo-router';
import React from 'react';
import { Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';

import { userLogout } from '@/store/slices/auth.slice';
import { Platform, StyleSheet } from 'react-native';

const LogoutButton = () => {
  const dispatch = useDispatch();
  return (
    <Button
      style={[Platform.OS === 'web' && styles.webStyle]}
      icon="logout"
      mode="contained"
      onPress={() => {
        //@ts-ignore
        dispatch(userLogout());
        router.push('/');
      }}>
      Logout
    </Button>
  );
};

const styles = StyleSheet.create({
  webStyle: {
    maxWidth: 300,
    alignSelf: 'center',
  },
});

export default LogoutButton;
