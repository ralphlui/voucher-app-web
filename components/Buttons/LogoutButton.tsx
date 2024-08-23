import { router } from 'expo-router';
import React from 'react';
import { Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';

import { logoutUser } from '@/store/auth/actions';

const LogoutButton = () => {
  const dispatch = useDispatch();
  return (
    <Button
      icon="logout"
      mode="contained"
      onPress={() => {
        //@ts-ignore
        dispatch(logoutUser());
        router.push('/');
      }}>
      Logout
    </Button>
  );
};

export default LogoutButton;
