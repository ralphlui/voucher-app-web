import { useGetCampaignByIdQuery } from '@/services/campaign.service';
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

const Campaign = () => {
  const { id } = useLocalSearchParams();
  const { data, error, isLoading, isFetching, isSuccess, isError, refetch } =
    useGetCampaignByIdQuery({ campaignId: id });
  return (
    <View>
      <Stack.Screen options={{ title: 'Campaign' }} />
      <Text> Individual Campaign</Text>
      <Text> This is the id: {id} get from previous screen.</Text>
      <Text> Detail screen to be implemented. </Text>
    </View>
  );
};

export default Campaign;
