import React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, Button, Card, Text } from 'react-native-paper';

import { StoreDetailProps } from '@/types/store';

interface Props {
  store: StoreDetailProps;
}

const StoreCard = (props: Props) => {
  const LeftContent = () => <Avatar.Icon icon="map-marker" size={32} />;
  const { store } = props;
  return (
    <Card style={styles.container}>
      <Card.Title title={store.storeName} subtitle={store.address} left={LeftContent} />
      {/* <Card.Content>
        <Text variant="titleLarge">Card title</Text>
        <Text variant="bodyMedium">Card content</Text>
      </Card.Content> */}
      <Card.Cover style={styles.cover} source={{ uri: 'https://picsum.photos/700' }} />
      {/* <Card.Actions>
        <Button>Cancel</Button>
        <Button>Ok</Button>
      </Card.Actions> */}
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    margin: 10,
  },
  cover: {
    margin: 10,
  },
});

export default StoreCard;
