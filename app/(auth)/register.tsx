import { Stack } from 'expo-router';
import React from 'react';
import { View, TextInput } from 'react-native';

import { Button } from '~/components/Button';
import { Container } from '~/components/Container';
const register = () => {
  return (
    <Container>
      <Stack.Screen
        options={{
          title: 'Register',
        }}
      />
      <View>
        <TextInput placeholder="username" />
        <TextInput placeholder="email" />
        <TextInput placeholder="password" secureTextEntry />

        <Button title="Submit" />
      </View>
    </Container>
  );
};

export default register;
