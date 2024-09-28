import React, { useCallback, useState } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  ListRenderItemInfo,
  FlatList,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { Button, Divider, IconButton, Text } from 'react-native-paper';

import usePagination from '@/hooks/usePagination';
import { useGetFeedByUserIdQuery } from '@/services/feed.service';
import { Feed } from '@/types/Feed';
import { useRouter } from 'expo-router';
import useAuth from '@/hooks/useAuth';
import NoDataFound from '@/components/common/NoDataFound';
import useResponsiveColumns from '@/hooks/useResponsiveColumns';
import HandleResponse from '@/components/common/HandleResponse';

const FeedTab = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { pageNumber, setPageNumber, pageSize } = usePagination();
  const numColumns = useResponsiveColumns();
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
            hasNextPage: pageNumber < Math.ceil((data?.totalRecord ?? 10) / pageSize),
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

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setPageNumber(0);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  return (
    <>
      {(isSuccess || isError) && (
        <HandleResponse
          isError={isError}
          isSuccess={isSuccess}
          error={error || 'Error occurs'}
          message={data?.message}
        />
      )}
      <FlatList
        key={numColumns}
        numColumns={numColumns}
        data={data?.data ?? []}
        keyExtractor={(item) => item.feedId.toString()}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        renderItem={renderItem}
        ListFooterComponent={isLoading ? <ActivityIndicator size="large" /> : null}
        ItemSeparatorComponent={Divider}
        refreshControl={
          <RefreshControl refreshing={refreshing || isFetching} onRefresh={onRefresh} />
        }
        ListEmptyComponent={<NoDataFound text="feed" />}
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
