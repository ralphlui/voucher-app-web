import { Stack } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

const StoreList = () => {
  return (
    <View>
      <Stack.Screen options={{ title: 'Store List' }} />
      <Text>Store List</Text>
    </View>
  );
};

export default StoreList;
