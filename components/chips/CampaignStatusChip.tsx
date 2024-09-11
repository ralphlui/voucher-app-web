import { View, Text } from 'react-native';
import React from 'react';
import { CampaignStatusEnum } from '@/types/CampaignStatusEnum';
import { Chip } from 'react-native-paper';

interface CampaignStatusChipProps {
  status: CampaignStatusEnum;
}

const CampaignStatusChip = ({ status }: CampaignStatusChipProps) => {
  let backgroundColor: string;
  switch (status) {
    case CampaignStatusEnum.CREATED:
      backgroundColor = '#4caf50'; // Green
      break;
    case CampaignStatusEnum.EXPIRED:
      backgroundColor = '#f44336'; // Red
      break;
    case CampaignStatusEnum.CANCELLED:
      backgroundColor = '#f44336'; // Orange
      break;
    case CampaignStatusEnum.READYTOPROMOTE:
      backgroundColor = '#ff9800'; // Orange
      break;
    case CampaignStatusEnum.PROMOTED:
        backgroundColor = '#4caf10'; // Orange
        break;
    default:
      backgroundColor = '#FFF'; // Default to black if status is unknown
      break;
  }
  return <Chip style={{ backgroundColor, alignSelf: 'center', marginRight: 10 }}>{status}</Chip>;
};

export default CampaignStatusChip;
