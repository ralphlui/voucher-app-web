import React, { useState } from 'react';
import { StyleSheet, FlatList, ListRenderItemInfo, ActivityIndicator, View } from 'react-native';

import CampaignCard from '@/components/Cards/CampaignCard';
import { CampaignProps } from '@/types/campaign';

const CampaignTab = () => {
  const data_temp: CampaignProps[] = Array.from({ length: 5 }, () => ({
    campaignId: Math.random() + '',
    description: `Desc ${Math.random()}`,
    numberOfVouchers: 0,
    numberOfLikes: 0,
    tagsJson: '',
    tandc: '',
    amount: 0,
    startDate: '',
    endDate: '',
    store: {
      storeId: '',
      storeName: '',
      description: '',
      address: '',
      address1: '',
      address2: '',
      address3: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
      image: '',
      contactNumber: '',
    },
    campaignStatus: '',
    numberOfClaimedVouchers: 0,
    pin: '',
  }));

  const [data, setData] = useState<CampaignProps[]>(data_temp);
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
        description: `Desc ${Math.random()}`,
        numberOfVouchers: 0,
        numberOfLikes: 0,
        tagsJson: '',
        tandc: '',
        amount: 0,
        startDate: '',
        endDate: '',
        store: {
          storeId: '',
          storeName: '',
          description: '',
          address: '',
          address1: '',
          address2: '',
          address3: '',
          city: '',
          state: '',
          country: '',
          postalCode: '',
          image: '',
          contactNumber: '',
        },
        campaignStatus: '',
        numberOfClaimedVouchers: 0,
        pin: '',
      }));
      setData(data.concat(newData));
      setIsLoading(false);
    }, 1000);
  };

  const renderItem = ({ item }: ListRenderItemInfo<CampaignProps>) => {
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
