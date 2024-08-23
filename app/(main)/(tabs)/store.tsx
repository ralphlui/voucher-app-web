import StoreCard from '@/components/Cards/StoreCard';
import { StoreDetailProps } from '@/types/store';
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
} from 'react-native';

const StoreTab = () => {
  const data_temp: StoreDetailProps[] = Array.from({ length: 5 }, () => ({
    storeId: Math.random() + '',
    storeName: Math.random() + '',
    description: `Desc ${Math.random()}`,
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
  }));

  const [data, setData] = useState<StoreDetailProps[]>(data_temp);
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
        storeId: Math.random() + '',
        storeName: Math.random() + '',
        description: `Desc ${Math.random()}`,
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
      }));
      setData(data.concat(newData));
      setIsLoading(false);
    }, 1000);
  };

  const renderItem = ({ item }: ListRenderItemInfo<StoreDetailProps>) => {
    return <StoreCard store={item} />;
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.storeId.toString()}
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

export default StoreTab;
