import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, View, StyleSheet } from 'react-native';
import { ActivityIndicator, Avatar, Button, TextInput } from 'react-native-paper';
import { FormBuilder } from 'react-native-paper-form-builder';

import HandleResponse from '@/components/common/HandleResponse';
import { useCreateCampaignMutation } from '@/services/campaign.service';

const CampaignList = () => {
  const router = useRouter();
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
      startDate: '',
      endDate: '',
      store: {},
    },
    mode: 'onChange',
  });

  const [createCampaign, { data, isSuccess, isError, isLoading, error }] =
    useCreateCampaignMutation();

  const onSuccess = () => {
    router.push('/(main)/(tabs)');
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Register',
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
            <View style={styles.icon}>
              <Avatar.Icon icon="ticket-percent-outline" />
            </View>
            <FormBuilder
              control={control}
              setFocus={setFocus}
              formConfigArray={[
                {
                  name: 'storeName',
                  type: 'text',
                  textInputProps: {
                    label: 'Store Name',
                    left: <TextInput.Icon icon="account" />,
                  },
                  rules: {
                    required: {
                      value: true,
                      message: 'Store Name is required',
                    },
                  },
                },
                {
                  name: 'description',
                  type: 'text',
                  textInputProps: {
                    label: 'Description',
                    left: <TextInput.Icon icon="email" />,
                  },
                },
                {
                  name: 'address',
                  type: 'text',
                  textInputProps: {
                    label: 'Address',
                    left: <TextInput.Icon icon="card-account-details" />,
                  },
                },
                {
                  name: 'address1',
                  type: 'text',
                  textInputProps: {
                    label: 'Address 1',
                    left: <TextInput.Icon icon="card-account-details" />,
                  },
                },
                {
                  name: 'address2',
                  type: 'text',
                  textInputProps: {
                    label: 'Address 2',
                    left: <TextInput.Icon icon="card-account-details" />,
                  },
                },
                {
                  name: 'address3',
                  type: 'text',
                  textInputProps: {
                    label: 'Address 3',
                    left: <TextInput.Icon icon="card-account-details" />,
                  },
                },
                {
                  name: 'city',
                  type: 'text',
                  textInputProps: {
                    label: 'City',
                    left: <TextInput.Icon icon="card-account-details" />,
                  },
                },
                {
                  name: 'state',
                  type: 'text',
                  textInputProps: {
                    label: 'State',
                    left: <TextInput.Icon icon="card-account-details" />,
                  },
                },
                {
                  name: 'country',
                  type: 'text',
                  textInputProps: {
                    label: 'Country',
                    left: <TextInput.Icon icon="card-account-details" />,
                  },
                },
                {
                  name: 'postalCode',
                  type: 'text',
                  textInputProps: {
                    label: 'Postal Code',
                    left: <TextInput.Icon icon="card-account-details" />,
                  },
                },
                {
                  name: 'contactNumber',
                  type: 'text',
                  textInputProps: {
                    label: 'Contact Number',
                    left: <TextInput.Icon icon="card-account-details" />,
                  },
                },
                {
                  name: 'image',
                  type: 'custom',

                  textInputProps: {
                    label: 'Preferences',
                    left: <TextInput.Icon icon="checkbox-multiple-marked" />,
                  },
                },
              ]}
            />
            <Button
              mode="contained"
              onPress={handleSubmit(
                ({ description, tagsJson, tandc, amount, startDate, endDate, store }) => {
                  createCampaign({
                    description,
                    tagsJson,
                    tandc,
                    amount,
                    startDate,
                    endDate,
                    store,
                  });
                }
              )}>
              Create
            </Button>
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

export default CampaignList;
