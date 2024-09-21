import React from 'react';
import { StyleSheet, ActivityIndicator, FlatList, ListRenderItemInfo } from 'react-native';

import StoreCard from '@/components/cards/StoreCard';
import usePagination from '@/hooks/usePagination';
import { useGetStoresByUserIdQuery } from '@/services/store.service';
import { Store } from '@/types/Store';
import { Searchbar } from 'react-native-paper';
import useAuth from '@/hooks/useAuth';
import NoDataFound from '@/components/common/NoDataFound';

const StoreTab = () => {
  const { pageNumber, setPageNumber, pageSize } = usePagination();
  const auth = useAuth();
  const { data, error, isLoading, isFetching, hasNextPage, isSuccess, isError, refetch } =
    useGetStoresByUserIdQuery(
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
      {(data?.data === undefined) && <NoDataFound text='store'/>}
      <FlatList
        data={data?.data ?? []}
        keyExtractor={(item) => item?.storeId?.toString() ?? ''}
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
