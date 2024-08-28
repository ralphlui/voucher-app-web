import React from 'react';
import { View, StyleSheet, ActivityIndicator, ListRenderItemInfo, FlatList } from 'react-native';
import { Divider, IconButton, Text } from 'react-native-paper';

import usePagination from '@/hooks/usePagination';
import { useGetFeedByEmailQuery } from '@/services/feed.service';
import { Feed } from '@/types/Feed';

const FeedTab = () => {
  const { pageNumber, setPageNumber, pageSize } = usePagination();
  const { data, error, isLoading, isFetching, hasNextPage, isSuccess, isError, refetch } =
    useGetFeedByEmailQuery(
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

  const renderItem = ({ item }: ListRenderItemInfo<Feed>) => {
    return (
      <View style={styles.listRow}>
        <IconButton
          onPress={() => {}}
          selected={item.read}
          icon={item.read ? 'star' : 'star-outline'}
        />
        <Text>this is the feedId: {item.feedId}</Text>
      </View>
    );
  };

  return (
    <FlatList
      data={data?.data ?? []}
      keyExtractor={(item) => item.feedId.toString()}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      renderItem={renderItem}
      ListFooterComponent={isLoading ? <ActivityIndicator size="large" /> : null}
      ItemSeparatorComponent={Divider}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    margin: 10,
  },
  listRow: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  teamResultRow: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});

export default FeedTab;
