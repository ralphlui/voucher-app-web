import { Stack, Link } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';

import { Button } from '~/components/Button';
import { Container } from '~/components/Container';

const profile = () => {
  return (
    <>
      <Stack.Screen options={{ title: 'Profile' }} />
      <Container>
        <Text>Profile</Text>
        <Link href={{ pathname: '/login' }} asChild>
          <Button title="Login" />
        </Link>
      </Container>
    </>
  );
};

export default profile;
