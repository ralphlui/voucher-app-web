import React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, Button, Card, Text } from 'react-native-paper';

import { CampaignProps } from '../../types/campaign';


interface Props {
  campaign: CampaignProps
}

const CampaignCard = (props: Props) => {
  
  const LeftContent = () => <Avatar.Icon icon="folder" />;

  return (
    <Card style={Styles.container}>
    <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
    <Card.Content>
      <Text variant="titleLarge">Card title</Text>
      <Text variant="bodyMedium">Card content</Text>
    </Card.Content>
    <Card.Cover
      style={{
        margin: 10,
      }}
      source={{ uri: 'https://picsum.photos/700' }}
    />
    <Card.Actions>
      <Button>Cancel</Button>
      <Button>Ok</Button>
    </Card.Actions>
  </Card>
  );
};

export default CampaignCard;

const Styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    margin: 10,
  },
});