import React from 'react';
import { Button } from 'react-native-paper';
import { useClaimVoucherMutation } from '@/services/voucher.service';
import HandleResponse from '@/components/common/HandleResponse';

type ClaimVoucherProps = {
  campaignId: string;
  claimedBy: string;
};

const ClaimVoucherButton = ({ campaignId, claimedBy }: ClaimVoucherProps) => {
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
        // mode="contained"
        onPress={() => claimVoucher({ campaignId, claimedBy })}>
        Claim
      </Button>
    </>
  );
};

export default ClaimVoucherButton;
