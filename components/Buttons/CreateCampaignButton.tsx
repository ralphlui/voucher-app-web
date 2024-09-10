import { router } from 'expo-router';
import React from 'react';
import { Button } from 'react-native-paper';

const CreateCampaignButton = () => {
  return (
    <Button
      icon="plus"
      mode="text"
      onPress={() => {
        router.push('/campaign/create');
      }}>
      Create
    </Button>
  );
};

export default CreateCampaignButton;
