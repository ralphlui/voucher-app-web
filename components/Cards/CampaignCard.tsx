import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card, Chip, IconButton, Text } from 'react-native-paper';

import { Campaign } from '@/types/Campaign';

interface Props {
  campaign: Campaign;
}

const CampaignCard = (props: Props) => {
  const { campaign } = props;
  const router = useRouter();
  const [isSelected, setIsSelected] = useState(false);
  return (
    <Card
      style={styles.container}
      onPress={() => {
        router.push(`/(main)/campaign/${campaign.campaignId}`);
      }}>
      {/* <Card.Cover style={styles.cover} source={{ uri: 'https://picsum.photos/700' }} />
       */}
      <Card.Content>
        <Text style={styles.amount} variant="displayLarge">
          ${campaign.amount} off
        </Text>
      </Card.Content>
      <Card.Title
        title={campaign.description}
        subtitle={`${campaign.numberOfClaimedVouchers} / ${campaign.numberOfVouchers} claimed`}
        right={() => (
          <Card.Actions>
            <IconButton
              animated
              mode="contained"
              icon={isSelected ? 'heart' : 'heart-outline'}
              onPress={() => setIsSelected(!isSelected)}
            />
            <IconButton animated icon="share" onPress={() => {}} />
          </Card.Actions>
        )}
      />
      <Card.Content>
        <Chip>
          @{campaign?.store?.storeName}, {campaign?.store?.address}, {campaign?.store?.city}
        </Chip>
      </Card.Content>
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
  amount: {
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    height: 80,
    borderRadius: 5,
    borderColor: 'grey',
    backgroundColor: 'white',
  },
});

export default CampaignCard;
