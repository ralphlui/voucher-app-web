import { Stack } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';

const CampaignList = () => {
  return (
    <>
      <Stack.Screen options={{ title: 'Campaign List' }} />
      <Text>Campaign List</Text>
    </>
  );
};

export default CampaignList;
