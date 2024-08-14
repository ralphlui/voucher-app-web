import { Link, Stack } from 'expo-router';
import React from 'react';
import { View, TextInput } from 'react-native';
import { Button } from 'react-native-paper';

const login = () => {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Login',
        }}
      />
      <View>
        <TextInput placeholder="email" />
        <TextInput placeholder="password" secureTextEntry />
        <Button icon="camera" mode="contained" onPress={() => {}}>
          Login
        </Button>
        <Link href="/register" replace>
          Register
        </Link>
      </View>
    </>
  );
};

export default login;
