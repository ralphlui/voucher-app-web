import { Stack } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';

const StoreList = () => {
  return (
    <>
      <Stack.Screen options={{ title: 'Store List' }} />
      <Text>Store List</Text>
    </>
  );
};

export default StoreList;
