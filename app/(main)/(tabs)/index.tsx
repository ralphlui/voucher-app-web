import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  FlatList,
  useWindowDimensions,
  ListRenderItemInfo,
  ActivityIndicator,
  View,
} from 'react-native';

import CampaignCard from '../../../components/Cards/CampaignCard';
import { CampaignProps } from '../../../types/campaign';

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
  // const { width } = useWindowDimensions();
  // const [numColumns, setNumColumns] = useState(1);

  const [data, setData] = useState<CampaignProps[]>(data_temp);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const nextPageIdentifierRef = useRef();
  // const [isFirstPageReceived, setIsFirstPageReceived] = useState<boolean>(false);

  // useEffect(() => {
  //   const calculateNumColumns = () => {
  //     if (width < 480) {
  //       return 1;
  //     } else if (width < 768) {
  //       return 2;
  //     } else {
  //       return 3;
  //     }
  //   };
  //   setNumColumns(calculateNumColumns());
  // }, [width]);

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

  // const fetchData = () => {
  //   setIsLoading(true);
  //   getDataFromApi(nextPageIdentifierRef.current).then((response) => {
  //     const { data: newData, nextPageIdentifier } = parseResponse(response);
  //     setData([...data, newData]);
  //     nextPageIdentifierRef.current = nextPageIdentifier;
  //     setIsLoading(false);
  //     !isFirstPageReceived && setIsFirstPageReceived(true);
  //   });
  // };

  // const fetchNextPage = () => {
  //   if (nextPageIdentifierRef.current == null) {
  //     // End of data.
  //     return;
  //   }
  //   fetchData();
  // };

  // const getDataFromApi = () => {
  //   // get the data from api
  //   return Promise.resolve({ data: [], nextPageIdentifier: "page-1" });
  // };

  // const parseResponse = (response) => {
  //   let _data = response.data;
  //   let nextPageIdentifier = response.nextPageIdentifier;
  //   // parse response and return list and nextPage identifier.
  //   return {
  //     _data,
  //     nextPageIdentifier,
  //   };
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // if (!isFirstPageReceived && isLoading) {
  //   // Show loader when fetching first page data.
  //   return <ActivityIndicator size={'small'} />;
  // }

  // const ListEndLoader = () => {
  //   if (!isFirstPageReceived && isLoading) {
  //     // Show loader at the end of list when fetching next page data.
  //     return <ActivityIndicator size={'large'} />;
  //   }
  // };

  const renderItem = ({ item }: ListRenderItemInfo<CampaignProps>) => {
    return <CampaignCard campaign={item} />;
  };
  console.log(data.length);
  return (
    <FlatList
      // key={numColumns}
      data={data}
      // onEndReached={fetchNextPage}
      // onEndReachedThreshold={0.8}
      // ListFooterComponent={ListEndLoader} // Loader when loading next page.
      keyExtractor={(item) => item.campaignId.toString()}
      onEndReached={loadMoreItems}
      onEndReachedThreshold={0.5}
      renderItem={renderItem}
      // numColumns={numColumns}
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
