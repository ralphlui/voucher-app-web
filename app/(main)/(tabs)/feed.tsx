import React from 'react';
import { View, StyleSheet, ActivityIndicator, ListRenderItemInfo, FlatList } from 'react-native';
import { Button, Divider, IconButton, Text } from 'react-native-paper';

import usePagination from '@/hooks/usePagination';
import { useGetFeedByUserIdQuery } from '@/services/feed.service';
import { Feed } from '@/types/Feed';
import { useRouter } from 'expo-router';
import useAuth from '@/hooks/useAuth';
import NoDataFound from '@/components/common/NoDataFound';

const FeedTab = () => {
  const { pageNumber, setPageNumber, pageSize } = usePagination();
  const router = useRouter();
  const auth = useAuth();
  const { data, error, isLoading, isFetching, hasNextPage, isSuccess, isError, refetch } =
    useGetFeedByUserIdQuery(
      {
        userId: auth.userId,
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
          selected={!item.isRead}
          icon={!item.isRead ? 'star' : 'star-outline'}
        />
        <Button
          onPress={() => {
            router.push(`/(main)/campaign/${item.campaignId}`);
          }}>{`${item.campaignDescription ?? ''} @ `}</Button>
        <Button
          onPress={() => {
            router.push(`/(main)/store/${item.storeId}`);
          }}>
          {item.storeName}
        </Button>
      </View>
    );
  };

  return (
    <>
      {data?.data === undefined && <NoDataFound text="feed" />}
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
    </>
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
