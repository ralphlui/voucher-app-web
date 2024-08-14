import { Stack, Link } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';
import { Button } from 'react-native-paper';

const profile = () => {
  return (
    <>
      <Stack.Screen options={{ title: 'Profile' }} />
      <Text>Profile</Text>
      <Link href={{ pathname: '/login' }} asChild>
        <Button icon="camera" mode="contained" onPress={() => {}}>
          Login
        </Button>
      </Link>
    </>
  );
};

export default profile;
