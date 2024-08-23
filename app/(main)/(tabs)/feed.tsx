import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator, ListRenderItemInfo, FlatList } from 'react-native';
import { Divider, IconButton, Text } from 'react-native-paper';

import { FeedProps } from '@/types/feed';

const FeedTab = () => {
  const data_temp: FeedProps[] = Array.from({ length: 5 }, () => ({
    feedId: Math.random() + '',
  }));

  const [data, setData] = useState<FeedProps[]>(data_temp);
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
        feedId: Math.random() + '',
      }));
      setData(data.concat(newData));
      setIsLoading(false);
    }, 1000);
  };

  const renderItem = ({ item }: ListRenderItemInfo<FeedProps>) => {
    return (
      <View style={styles.listRow}>
        <IconButton
          onPress={() => {}}
          selected={item.read}
          icon={item.read ? 'star' : 'star-outline'}
        />
        {/* <View style={styles.teamResultRow}> */}
        <Text>{item.feedId}</Text>
        {/* </View> */}
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.feedId.toString()}
      onEndReached={loadMoreItems}
      onEndReachedThreshold={0.5}
      renderItem={renderItem}
      ListFooterComponent={isLoading ? LoadingIndicator : null}
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
