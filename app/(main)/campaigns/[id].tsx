import { Stack } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';

const Campaign = () => {
  return (
    <Stack>
      <Stack.Screen
        name="id"
        options={{
          title: 'Campaign',
          presentation: 'modal',
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default Campaign;
