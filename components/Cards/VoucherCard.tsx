import React, { useState } from 'react';
import { StyleSheet, Modal, View } from 'react-native';
import { Avatar, Button, Card, Chip, Divider, Text, TextInput, useTheme } from 'react-native-paper';

import { Voucher } from '@/types/Voucher';
import { useRouter } from 'expo-router';
import VoucherStatusChip from '@/components/chips/VoucherStatusChip';
import UseVoucherButton from '@/components/buttons/UseVoucherButton';

interface Props {
  voucher: Voucher;
}

const VoucherCard = (props: Props) => {
  const LeftContent = () => <Avatar.Icon icon="ticket-percent" size={32} />;
  const { voucher } = props;
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const { colors } = useTheme(); // Get the theme's colors

  return (
    <>
      <Card style={styles.container}>
        <Card.Title
          title={voucher.campaign?.description}
          right={() => <VoucherStatusChip status={voucher.voucherStatus} />}></Card.Title>
        <Card.Content>
          <Text style={[styles.amount, { color: colors.onSurface }]} variant="displayLarge">
            ${voucher.amount} off
          </Text>
        </Card.Content>
        <Divider />
        <Card.Actions>
          <Button
            mode="contained"
            onPress={() => {
              router.push(`/(main)/campaign/${voucher.campaign?.campaignId}`);
            }}>
            T&C
          </Button>
          {voucher.voucherStatus === 'CLAIMED' && (
            <Button mode="contained" onPress={() => setVisible(true)}>
              Use
            </Button>
          )}
        </Card.Actions>
      </Card>
      <Modal
        visible={visible}
        onDismiss={() => setVisible(false)}
        animationType="slide"
        presentationStyle="pageSheet"
        collapsable>
        <Card style={styles.modal}>
          <Card.Title title="Enter 4 digits PIN"></Card.Title>
          <Card.Content>
            <TextInput></TextInput>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => setVisible(false)}>Close</Button>
            <UseVoucherButton voucherId={voucher.voucherId} />
          </Card.Actions>
        </Card>
      </Modal>
    </>
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
    marginBottom: 10,
    padding: 10,
    // borderWidth: 1,
    height: 80,
    borderRadius: 5,
    borderColor: 'grey',
    // backgroundColor: 'white',
  },
  chip: {
    alignSelf: 'center',
    marginRight: 10,
  },
  modal: {
    padding: 20,
    margin: 20,
    // borderRadius: 10,
    justifyContent: 'center',
  },
});

export default VoucherCard;
