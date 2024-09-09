import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, Card } from 'react-native-paper';

import { Store } from '@/types/Store';

interface Props {
  store: Store;
}

const StoreCard = (props: Props) => {
  const LeftContent = () => <Avatar.Icon icon="map-marker" size={32} />;
  const { store } = props;
  const router = useRouter();

  return (
    <Card
      style={styles.container}
      onPress={() => {
        router.push(`/(main)/store/${store.storeId}`);
      }}>
      <Card.Title title={store.storeName} subtitle={store.address} left={LeftContent} />
      {/* <Card.Content>
        <Text variant="titleLarge">Card title</Text>
        <Text variant="bodyMedium">Card content</Text>
      </Card.Content> */}
      <Card.Cover style={styles.cover} source={{ uri: store.image }} />
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
