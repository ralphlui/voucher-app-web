import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator, FlatList, ListRenderItemInfo } from 'react-native';

import VoucherCard from '@/components/cards/VoucherCard';
import { Voucher } from '@/types/Voucher';
import { useGetVoucherByEmailQuery } from '@/services/voucher.service';

const VoucherTab = () => {
  const [page, setPage] = useState(1);

  const { data, error, isLoading, isFetching, hasNextPage, isSuccess, isError, refetch } =
    useGetVoucherByEmailQuery(
      {
        email: 'merchant@outlook.com',
        page_size: 5,
        page_number: page,
      },
      {
        selectFromResult: ({ data, ...args }) => {
          return {
            hasNextPage: page < Math.ceil((data?.totalRecord ?? 10) / 5),
            data,
            ...args,
          };
        },
      }
    );

  const handleEndReached = () => {
    if (!hasNextPage || isLoading || isFetching) return;
    setPage(page + 1);
  };

  const renderItem = ({ item }: ListRenderItemInfo<Voucher>) => {
    return <VoucherCard voucher={item} />;
  };

  return (
    <FlatList
      data={data?.data ?? []}
      keyExtractor={(item) => item.voucherId.toString()}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      renderItem={renderItem}
      ListFooterComponent={isLoading ? <ActivityIndicator size="large" /> : null}
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
