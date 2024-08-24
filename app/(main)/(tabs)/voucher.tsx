import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator, FlatList, ListRenderItemInfo } from 'react-native';

import VoucherCard from '@/components/cards/VoucherCard';
import { VoucherProps } from '@/types/vouhcer';

const VoucherTab = () => {
  const data_temp: VoucherProps[] = Array.from({ length: 5 }, () => ({
    voucherId: Math.random() + '',
  }));

  const [data, setData] = useState<VoucherProps[]>(data_temp);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const LoadingIndicator = () => (
    <View>
      <ActivityIndicator size="large" />
    </View>
  );
  const loadMoreItems = () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      const newData = Array.from({ length: 5 }, () => ({
        voucherId: Math.random() + '',
      }));
      setData(data.concat(newData));
      setIsLoading(false);
    }, 1000);
  };

  const renderItem = ({ item }: ListRenderItemInfo<VoucherProps>) => {
    return <VoucherCard voucher={item} />;
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.voucherId.toString()}
      onEndReached={loadMoreItems}
      onEndReachedThreshold={0.5}
      renderItem={renderItem}
      ListFooterComponent={isLoading ? LoadingIndicator : null}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    margin: 10,
  },
});

export default VoucherTab;
