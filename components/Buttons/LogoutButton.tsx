import React from 'react';
import { router } from 'expo-router';
import { Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logoutUser, setAuthData } from '@/store/auth/actions';

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
