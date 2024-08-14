import { Stack } from 'expo-router';
import React from 'react';
import { View, TextInput } from 'react-native';
import { Button } from 'react-native-paper';

const register = () => {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Register',
        }}
      />
      <View>
        <TextInput placeholder="username" />
        <TextInput placeholder="email" />
        <TextInput placeholder="password" secureTextEntry />

        <Button icon="camera" mode="contained" onPress={() => {}}>
          Submit
        </Button>
      </View>
    </>
  );
};

export default register;
