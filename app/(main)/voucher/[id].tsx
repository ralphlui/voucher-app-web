import { useGetVoucherByIdQuery } from '@/services/voucher.service';
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

const Voucher = () => {
  const { id } = useLocalSearchParams();
  const { data, error, isLoading, isFetching, isSuccess, isError, refetch } =
    useGetVoucherByIdQuery({ voucherId: id });
  return (
    <View>
      <Stack.Screen options={{ title: 'Voucher' }} />
      <Text> Individual Voucher</Text>
      <Text> This is the id: {id} get from previous screen.</Text>
      <Text> Detail screen to be implemented. </Text>
    </View>
  );
};

export default Voucher;
