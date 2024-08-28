import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

const Store = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Stack.Screen options={{ title: 'Store' }} />
      <Text> Individual Store</Text>
      <Text> This is the id: {id} get from previous screen.</Text>
      <Text> Detail screen to be implemented. </Text>
    </View>
  );
};

export default Store;
