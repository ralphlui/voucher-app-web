import React from 'react';
import { StyleSheet, ActivityIndicator, FlatList, ListRenderItemInfo } from 'react-native';

import StoreCard from '@/components/cards/StoreCard';
import usePagination from '@/hooks/usePagination';
import { useGetStoreByEmailQuery } from '@/services/store.service';
import { Store } from '@/types/Store';
import { Searchbar } from 'react-native-paper';

const StoreTab = () => {
  const { pageNumber, setPageNumber, pageSize } = usePagination();

  const { data, error, isLoading, isFetching, hasNextPage, isSuccess, isError, refetch } =
    useGetStoreByEmailQuery(
      {
        email: 'merchant@outlook.com',
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

  const renderItem = ({ item }: ListRenderItemInfo<Store>) => {
    return <StoreCard store={item} />;
  };

  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <>
      <Searchbar
        style={styles.searchBar}
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      <FlatList
        data={data?.data ?? []}
        keyExtractor={(item) => item.storeId.toString()}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        renderItem={renderItem}
        ListFooterComponent={isFetching || isLoading ? <ActivityIndicator size="large" /> : null}
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

export default StoreTab;
