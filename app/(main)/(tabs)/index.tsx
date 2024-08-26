import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, ListRenderItemInfo, ActivityIndicator, View } from 'react-native';

import CampaignCard from '@/components/cards/CampaignCard';
import { Campaign } from '@/types/Campaign';
import { useGetCampaignByEmailQuery } from '@/services/campaign.service';

const CampaignTab = () => {
  const [page, setPage] = useState(1);
  // const [hasNextPage, setHasNextPage] = useState(true);

  // useEffect(() => {
  //   const totalPages = Math.ceil((data?.totalRecord ?? 10) / 5); // total / page size
  //   setHasNextPage(page < totalPages);
  // }, [page]);

  const { data, error, isLoading, isFetching, hasNextPage, isSuccess, isError, refetch } =
    useGetCampaignByEmailQuery(
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
  console.log('page: ', page, 'hasNextPage: ', hasNextPage);

  const LoadingIndicator = () => (
    <View>
      <ActivityIndicator size="large" />
    </View>
  );
  const handleEndReached = () => {
    if (!hasNextPage || isLoading || isFetching) return;
    setPage(page + 1);
  };

  const renderItem = ({ item }: ListRenderItemInfo<Campaign>) => {
    return <CampaignCard campaign={item} />;
  };

  return (
    <FlatList
      data={data?.data ?? []}
      keyExtractor={(item) => item.campaignId.toString()}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      renderItem={renderItem}
      ListFooterComponent={isFetching || isLoading ? LoadingIndicator : null}
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

export default CampaignTab;
