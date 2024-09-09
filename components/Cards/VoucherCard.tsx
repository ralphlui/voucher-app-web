import React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, Button, Card, Chip, Text } from 'react-native-paper';

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
    <Card style={styles.container}>
      <Card.Content>
        <Button
          mode="contained"
          icon="ticket-percent-outline"
          style={styles.button}
          onPress={() => {
            router.push(`/(main)/campaign/${voucher.campaign?.campaignId}`);
          }}>
          Check T&C from {voucher.campaign?.description}
        </Button>
        <Chip style={styles.chip}>{voucher.voucherStatus}</Chip>
        <Text style={styles.amount} variant="displayLarge">
          ${voucher.amount}
        </Text>
        {voucher.voucherStatus === 'CLAIMED' && (
          <Button mode="contained" onPress={() => {}}>
            Use It
          </Button>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  scrollViewStyle: {
    flex: 1,
    padding: 15,
  },
  headingStyle: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 40,
  },
  icon: {
    alignItems: 'center',
    margin: 10,
    padding: 10,
  },
  field: {
    marginBottom: 20,
  },
  container: {
    alignContent: 'center',
    margin: 10,
  },
  cover: {
    margin: 10,
  },
  processbar: {
    marginBottom: 10,
  },
  button: {
    marginBottom: 10,
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
  chip: {
    alignSelf: 'center',
  },
});

export default VoucherCard;
