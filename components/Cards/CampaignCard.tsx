import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Card, IconButton } from 'react-native-paper';

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
        router.push(`/(main)/campaigns/${campaign.campaignId}`);
      }}>
      <Card.Cover style={styles.cover} source={{ uri: 'https://picsum.photos/700' }} />
      <Card.Title
        title={campaign.description}
        subtitle={`${campaign.numberOfClaimedVouchers} / ${campaign.numberOfVouchers} `}
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
