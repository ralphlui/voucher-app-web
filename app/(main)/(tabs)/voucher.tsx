import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator, FlatList, ListRenderItemInfo } from 'react-native';

import VoucherCard from '@/components/cards/VoucherCard';
import { Voucher } from '@/types/Voucher';
import { useGetVoucherByEmailQuery } from '@/services/voucher.service';
import usePagination from '@/hooks/usePagination';

const VoucherTab = () => {
  const { pageNumber, setPageNumber, pageSize } = usePagination();

  const { data, error, isLoading, isFetching, hasNextPage, isSuccess, isError, refetch } =
    useGetVoucherByEmailQuery(
      {
        email: 'customer@outlook.com',
        page_size: pageSize,
        page_number: pageNumber,
      },
      {
        selectFromResult: ({ data, ...args }) => {
          return {
            hasNextPage: pageNumber < Math.ceil((data?.totalRecord ?? 10) / 5),
            data,
            ...args,
          };
        },
      }
    );

  const handleEndReached = () => {
    if (!hasNextPage || isLoading || isFetching) return;
    setPageNumber(pageNumber + 1);
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
