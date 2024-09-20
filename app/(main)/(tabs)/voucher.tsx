import React from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  View,
  Modal,
} from 'react-native';

import VoucherCard from '@/components/cards/VoucherCard';
import usePagination from '@/hooks/usePagination';
import { useGetVouchersByUserIdQuery } from '@/services/voucher.service';
import { Voucher } from '@/types/Voucher';
import { Button, Searchbar, Text } from 'react-native-paper';
import useAuth from '@/hooks/useAuth';

const VoucherTab = () => {
  const { pageNumber, setPageNumber, pageSize } = usePagination();
  const auth = useAuth();
  const { data, error, isLoading, isFetching, hasNextPage, isSuccess, isError, refetch } =
    useGetVouchersByUserIdQuery(
      {
        userId: auth.userId,
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

  const renderItem = ({ item }: ListRenderItemInfo<Voucher>) => {
    return <VoucherCard voucher={item} />;
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
        keyExtractor={(item) => item.voucherId.toString()}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        renderItem={renderItem}
        ListFooterComponent={isLoading ? <ActivityIndicator size="large" /> : null}
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

export default VoucherTab;
