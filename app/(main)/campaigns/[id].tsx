import { Stack } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

const Campaign = () => {
  return (
    <View>
      <Stack.Screen options={{ title: 'Campaign' }} />
      <Text> Individual Campaign</Text>
    </View>
  );
};

export default Campaign;
