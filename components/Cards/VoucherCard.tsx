import React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, Card } from 'react-native-paper';

import { Voucher } from '@/types/Voucher';
import { useRouter } from 'expo-router';

interface Props {
  voucher: Voucher;
}

const VoucherCard = (props: Props) => {
  const LeftContent = () => <Avatar.Icon icon="ticket-percent" size={32} />;
  const { voucher } = props;
  const router = useRouter();
  return (
    <Card
      style={styles.container}
      onPress={() => {
        router.push(`/(main)/voucher/${voucher.voucherId}`);
      }}>
      <Card.Title title={voucher.voucherId} subtitle="Card Subtitle" left={LeftContent} />
      {/* <Card.Content>
        <Text variant="titleLarge">Card title</Text>
        <Text variant="bodyMedium">Card content</Text>
      </Card.Content> */}
      <Card.Cover style={styles.cover} source={{ uri: 'https://picsum.photos/700' }} />
      {/* <Card.Actions>
        <Button>Claim</Button>
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

export default VoucherCard;
