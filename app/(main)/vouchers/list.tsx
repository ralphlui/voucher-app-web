import { Stack } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

const VoucherList = () => {
  return (
    <View>
      <Stack.Screen options={{ title: 'Voucher List' }} />
      <Text>Voucher List</Text>
    </View>
  );
};

export default VoucherList;
