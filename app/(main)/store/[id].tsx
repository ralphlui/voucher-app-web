import { Stack } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

const Store = () => {
  return (
    <View>
      <Stack.Screen options={{ title: 'Store' }} />
      <Text>Individual Store</Text>
    </View>
  );
};

export default Store;
