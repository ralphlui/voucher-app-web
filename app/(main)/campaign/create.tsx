import { Link, Stack } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

const CampaignList = () => {
  return (
    <View>
      <Stack.Screen options={{ title: 'Campaign List' }} />
      <Text>Campaign List</Text>
    </View>
  );
};

export default CampaignList;
