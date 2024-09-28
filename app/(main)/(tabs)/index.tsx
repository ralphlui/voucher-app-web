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
import { useGetCampaignsQuery } from '@/services/campaign.service';
import { Campaign } from '@/types/Campaign';
import { Searchbar } from 'react-native-paper';
import NoDataFound from '@/components/common/NoDataFound';
import useDebounce from '@/hooks/useDebounce';
import useResponsiveColumns from '@/hooks/useResponsiveColumns';
import HandleResponse from '@/components/common/HandleResponse';

const CampaignTab = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const numColumns = useResponsiveColumns();
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const { pageNumber, setPageNumber, pageSize } = usePagination();
  const { data, error, isLoading, isFetching, hasNextPage, isSuccess, isError, refetch } =
    useGetCampaignsQuery(
      {
        description: debouncedSearchQuery,
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

  const renderItem = ({ item }: ListRenderItemInfo<Campaign>) => {
    return <CampaignCard campaign={item} />;
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setPageNumber(0);
    await refetch();
    setRefreshing(false);
  }, [debouncedSearchQuery, refetch]);

  return (
    <>
      {isError && (
        <HandleResponse
          isError={isError}
          isSuccess={isSuccess}
          error={error || 'Error occurs'}
          message={data?.message}
        />
      )}
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
        onEndReachedThreshold={0.5}
        renderItem={renderItem}
        ListFooterComponent={isFetching || isLoading ? <ActivityIndicator size="large" /> : null}
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
