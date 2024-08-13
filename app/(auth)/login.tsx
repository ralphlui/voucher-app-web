import { Link, Stack } from 'expo-router';
import React from 'react';
import { View, TextInput } from 'react-native';

import { Button } from '~/components/Button';
import { Container } from '~/components/Container';

const login = () => {
  return (
    <>
      <Container>
        <Stack.Screen
          options={{
            title: 'Login',
          }}
        />
        <View>
          <TextInput placeholder="email" />
          <TextInput placeholder="password" secureTextEntry />
          <Button title="Submit" />
          <Link href="/register" replace>
            Register
          </Link>
        </View>
      </Container>
    </>
  );
};

export default login;
