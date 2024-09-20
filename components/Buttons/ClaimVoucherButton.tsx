import React from 'react';
import { Button } from 'react-native-paper';
import { useClaimVoucherMutation } from '@/services/voucher.service';
import HandleResponse from '@/components/common/HandleResponse';
import { Campaign } from '@/types/Campaign';
import { User } from '@/types/User';

type ClaimVoucherProps = {
  campaign: Campaign;
  claimedBy: User;
};

const ClaimVoucherButton = (props: ClaimVoucherProps) => {
  const { campaign, claimedBy } = props;
  const [claimVoucher, { data, isSuccess, isError, isLoading, error }] = useClaimVoucherMutation();
  return (
    <>
      {(isSuccess || isError) && (
        <HandleResponse
          isError={isError}
          isSuccess={isSuccess}
          error={error || 'Error occurs'}
          message={data?.message}
        />
      )}
      <Button
        loading={isLoading}
        mode="contained"
        onPress={() => claimVoucher({ campaign, claimedBy })}>
        Claim
      </Button>
    </>
  );
};

export default ClaimVoucherButton;
