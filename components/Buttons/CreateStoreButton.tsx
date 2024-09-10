import { router } from 'expo-router';
import React from 'react';
import { Button } from 'react-native-paper';

const CreateStoreButton = () => {
  return (
    <Button
      icon="plus"
      mode="text"
      onPress={() => {
        router.push('/store/create');
      }}>
      Create
    </Button>
  );
};

export default CreateStoreButton;
