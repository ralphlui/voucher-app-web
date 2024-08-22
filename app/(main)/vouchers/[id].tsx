import { Stack } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

const Voucher = () => {
  return (
    <View>
      <Stack.Screen options={{ title: 'Voucher' }} />
      <Text> Individual Voucher</Text>
    </View>
  );
};

export default Voucher;
