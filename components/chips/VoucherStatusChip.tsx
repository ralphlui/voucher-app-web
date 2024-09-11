import { View, Text } from 'react-native';
import React from 'react';
import { VoucherStatusEnum } from '@/types/VoucherStatusEnum';
import { Chip } from 'react-native-paper';

interface StatusChipProps {
  status: VoucherStatusEnum;
}

const VoucherStatusChip = ({ status }: StatusChipProps) => {
  let backgroundColor: string;
  switch (status) {
    case VoucherStatusEnum.CLAIMED:
      backgroundColor = '#4caf50'; // Green
      break;
    case VoucherStatusEnum.EXPIRED:
      backgroundColor = '#f44336'; // Red
      break;
    case VoucherStatusEnum.CONSUMED:
      backgroundColor = '#ff9800'; // Orange
      break;
    default:
      backgroundColor = '#FFF'; // Default to black if status is unknown
      break;
  }
  return <Chip style={{ backgroundColor, alignSelf: 'center', marginRight: 10 }}>{status}</Chip>;
};

export default VoucherStatusChip;
