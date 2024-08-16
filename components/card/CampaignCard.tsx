import React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, Button, Card, Text } from 'react-native-paper';

import { CampaignProps } from '../../types/campaign';

interface Props {
  campaign: CampaignProps;
}

const CampaignCard = (props: Props) => {
  const LeftContent = () => <Avatar.Icon icon="folder" size={32} />;

  return (
    <Card style={styles.container}>
      <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
      <Card.Cover style={styles.cover} source={{ uri: 'https://picsum.photos/700' }} />
      <Card.Content>
        <Text variant="titleLarge">Card title</Text>
        <Text variant="bodyMedium">Card content</Text>
      </Card.Content>
      <Card.Actions>
        <Button>Cancel</Button>
        <Button>Ok</Button>
      </Card.Actions>
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

export default CampaignCard;
