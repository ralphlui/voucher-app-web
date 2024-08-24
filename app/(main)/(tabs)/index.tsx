import React, { useState } from 'react';
import { StyleSheet, FlatList, ListRenderItemInfo, ActivityIndicator, View } from 'react-native';

import CampaignCard from '@/components/cards/CampaignCard';
import { Campaign } from '@/types/Campaign';

const CampaignTab = () => {
  const data_temp: Campaign[] = Array.from({ length: 5 }, () => ({
    campaignId: Math.random() + '',
  }));

  const [data, setData] = useState<Campaign[]>(data_temp);
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
        campaignId: Math.random() + '',
      }));
      setData(data.concat(newData));
      setIsLoading(false);
    }, 1000);
  };

  const renderItem = ({ item }: ListRenderItemInfo<Campaign>) => {
    return <CampaignCard campaign={item} />;
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.campaignId.toString()}
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

export default CampaignTab;
