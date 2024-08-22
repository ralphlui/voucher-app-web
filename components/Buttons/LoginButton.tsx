import React from 'react';
import { router } from 'expo-router';
import { Button } from 'react-native-paper';

const LoginButton = () => {
  return (
    <Button
      icon="login"
      mode="contained"
      onPress={() => {
        router.push('/login');
      }}>
      Login
    </Button>
  );
};

export default LoginButton;
