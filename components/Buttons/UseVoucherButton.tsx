import { View, Text } from 'react-native';
import React from 'react';
import { useConsumeVoucherMutation } from '@/services/voucher.service';
import HandleResponse from '@/components/common/HandleResponse';
import { Button } from 'react-native-paper';

type UseVoucherProps = {
  voucherId: string;
};

const UseVoucherButton = (props: UseVoucherProps) => {
  const { voucherId } = props;
  const [consumeVoucher, { data, isSuccess, isError, isLoading, error }] =
    useConsumeVoucherMutation();

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
      <Button loading={isLoading} mode="contained" onPress={() => consumeVoucher({ voucherId })}>
        Use
      </Button>
    </>
  );
};

export default UseVoucherButton;
