import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, useWindowDimensions, ListRenderItemInfo } from 'react-native';

import CampaignCard from '../../../components/card/CampaignCard';
import { CampaignProps } from '../../../types/campaign';

const CampaignTab = () => {
  const data: CampaignProps[] = [
    {
      campaignId: '',
      description: '',
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
    },
  ];
  const { width } = useWindowDimensions();
  const [numColumns, setNumColumns] = useState(1);

  useEffect(() => {
    const calculateNumColumns = () => {
      if (width < 480) {
        return 1;
      } else if (width < 768) {
        return 2;
      } else {
        return 3;
      }
    };
    setNumColumns(calculateNumColumns());
  }, [width]);

  return (
    <FlatList
      key={numColumns}
      data={data}
      renderItem={({ item }: ListRenderItemInfo<CampaignProps>) => <CampaignCard campaign={item} />}
      numColumns={numColumns}
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
