import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { ScrollView, View, StyleSheet } from 'react-native';
import { ActivityIndicator, Avatar, Button, TextInput } from 'react-native-paper';
import { FormBuilder } from 'react-native-paper-form-builder';

import HandleResponse from '@/components/common/HandleResponse';
import { useCreateCampaignMutation } from '@/services/campaign.service';
import useAuth from '@/hooks/useAuth';
import { useGetStoreByEmailQuery } from '@/services/store.service';
import { Store } from '@/types/Store';
import DateTimePickerInput from '@/components/inputs/DateTimePickerInput';

const CreateCampaign = () => {
  const router = useRouter();
  const auth = useAuth();
  const {
    formState: { errors },
    control,
    setFocus,
    handleSubmit,
  } = useForm({
    defaultValues: {
      description: '',
      tagsJson: '',
      tandc: '',
      amount: 0,
      startDate: new Date(),
      endDate: new Date(),
      storeId: '',
    },
    mode: 'onChange',
  });

  const [createCampaign, { data, isSuccess, isError, isLoading, error }] =
    useCreateCampaignMutation();
  const {
    data: storeData,
    error: storeError,
    isLoading: storeIsLoading,
  } = useGetStoreByEmailQuery({ email: auth.email });

  const onSuccess = () => {
    router.push('/(main)/(tabs)');
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Create Campaign',
        }}
      />
      {(isSuccess || isError) && (
        <HandleResponse
          isError={isError}
          isSuccess={isSuccess}
          error={error || 'Error occurs'}
          message={data?.message}
          onSuccess={onSuccess}
        />
      )}
      <View style={styles.containerStyle}>
        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <ScrollView contentContainerStyle={styles.scrollViewStyle}>
            <View>
              <FormBuilder
                control={control}
                setFocus={setFocus}
                formConfigArray={[
                  {
                    name: 'storeId',
                    type: 'select',
                    textInputProps: {
                      label: 'Store',
                      left: <TextInput.Icon icon="store" />,
                    },
                    options: storeData?.data?.map(
                      (store: Store) =>
                        ({
                          value: store.storeId,
                          label: store.storeName,
                        }) ?? []
                    ),
                  },
                  {
                    name: 'description',
                    type: 'text',
                    textInputProps: {
                      label: 'Description',
                      left: <TextInput.Icon icon="text" />,
                    },
                    rules: {
                      required: {
                        value: true,
                        message: 'Description is required',
                      },
                    },
                  },
                  {
                    name: 'tagsJson',
                    type: 'text',
                    textInputProps: {
                      label: 'Tags',
                      left: <TextInput.Icon icon="tag-multiple" />,
                    },
                  },
                  {
                    name: 'tandc',
                    type: 'text',
                    textInputProps: {
                      label: 'T&C',
                      left: <TextInput.Icon icon="text-box" />,
                    },
                  },
                  {
                    name: 'amount',
                    type: 'text',
                    textInputProps: {
                      label: 'Amount',
                      left: <TextInput.Icon icon="currency-usd" />,
                    },
                  },
                ]}
              />
              <Controller
                control={control}
                name="startDate"
                render={({ field: { onChange, value } }) => (
                  <DateTimePickerInput label="Start Date" value={value} onChange={onChange} />
                )}
              />
              <Controller
                control={control}
                name="endDate"
                render={({ field: { onChange, value } }) => (
                  <DateTimePickerInput label="End Date" value={value} onChange={onChange} />
                )}
              />
              <Button
                mode="contained"
                onPress={handleSubmit(
                  ({ description, tagsJson, tandc, amount, startDate, endDate, storeId }) => {
                    createCampaign({
                      description,
                      tagsJson,
                      tandc,
                      amount,
                      startDate,
                      endDate,
                      store: { storeId },
                      createdBy: { email: auth.email ?? '' },
                    });
                  }
                )}>
                Create
              </Button>
            </View>
          </ScrollView>
        )}
      </View>
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
});

export default CreateCampaign;
