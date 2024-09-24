import React, { useCallback, useState } from 'react';
import {
  StyleSheet,
  FlatList,
  ListRenderItemInfo,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';

import CampaignCard from '@/components/cards/CampaignCard';
import usePagination from '@/hooks/usePagination';
import { useGetCampaignsByUserIdQuery } from '@/services/campaign.service';
import { Campaign } from '@/types/Campaign';
import { Searchbar } from 'react-native-paper';
import useAuth from '@/hooks/useAuth';
import NoDataFound from '@/components/common/NoDataFound';
import useResponsiveColumns from '@/hooks/useResponsiveColumns';

const CampaignTab = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const numColumns = useResponsiveColumns();
  const { pageNumber, setPageNumber, pageSize } = usePagination();
  const auth = useAuth();
  const { data, error, isLoading, isFetching, hasNextPage, isSuccess, isError, refetch } =
    useGetCampaignsByUserIdQuery(
      {
        userId: auth.userId,
        page_size: pageSize,
        page_number: pageNumber,
      },
      {
        selectFromResult: ({ data, ...args }) => {
          return {
            hasNextPage: pageNumber < Math.ceil((data?.totalRecord ?? 10) / pageSize) - 1,
            data,
            ...args,
          };
        },
      }
    );

  const handleEndReached = useCallback(() => {
    if (!hasNextPage || isLoading || isFetching) return;
    setTimeout(() => {
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
    }, 300);
  }, [hasNextPage, isLoading, isFetching]);

  const renderItem = ({ item }: ListRenderItemInfo<Campaign>) => {
    return <CampaignCard campaign={item} />;
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setPageNumber(0);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  return (
    <>
      <Searchbar
        style={styles.searchBar}
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      <FlatList
        key={numColumns}
        numColumns={numColumns}
        data={data?.data ?? []}
        keyExtractor={(item) => item?.campaignId?.toString() ?? ''}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
        renderItem={renderItem}
        ListFooterComponent={
          !(refreshing || isFetching) && isLoading ? <ActivityIndicator size="large" /> : null
        }
        refreshControl={
          <RefreshControl refreshing={refreshing || isFetching} onRefresh={onRefresh} />
        }
        ListEmptyComponent={<NoDataFound text="campaign" />}
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
  searchBar: {
    alignContent: 'center',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
});

export default CampaignTab;
