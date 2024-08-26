import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator, FlatList, ListRenderItemInfo } from 'react-native';

import StoreCard from '@/components/cards/StoreCard';
import { Store } from '@/types/Store';
import { useGetStoreByEmailQuery } from '@/services/store.service';

const StoreTab = () => {
  const [page, setPage] = useState(1);

  const { data, error, isLoading, isFetching, hasNextPage, isSuccess, isError, refetch } =
    useGetStoreByEmailQuery(
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

  const renderItem = ({ item }: ListRenderItemInfo<Store>) => {
    return <StoreCard store={item} />;
  };

  return (
    <FlatList
      data={data?.data ?? []}
      keyExtractor={(item) => item.storeId.toString()}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      renderItem={renderItem}
      ListFooterComponent={isFetching || isLoading ? <ActivityIndicator size="large" /> : null}
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

export default StoreTab;
