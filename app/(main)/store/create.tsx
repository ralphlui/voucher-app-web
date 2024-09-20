import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { ScrollView, View, StyleSheet, Alert, Platform } from 'react-native';
import { ActivityIndicator, Avatar, Button, TextInput } from 'react-native-paper';
import { FormBuilder } from 'react-native-paper-form-builder';

import HandleResponse from '@/components/common/HandleResponse';
import { useCreateStoreMutation } from '@/services/store.service';
import useAuth from '@/hooks/useAuth';
import { UserTypeEnum } from '@/types/UserTypeEnum';
import ImageUploadInput from '@/components/inputs/ImageUploadInput';
import axios from 'axios';

type StoreForm = {
  storeName?: string;
  description?: string;
  address?: string;
  // address1: string,
  // address2: string,
  // address3: string,
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  contactNumber?: string;
  image?: {
    uri: string;
  };
};

const CreateStore = () => {
  const router = useRouter();
  const auth = useAuth();
  const {
    formState: { errors },
    control,
    setFocus,
    handleSubmit,
  } = useForm<StoreForm>({
    defaultValues: {
      storeName: '',
      description: '',
      address: '',
      // address1: '',
      // address2: '',
      // address3: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
      contactNumber: '',
      image: {},
    },
    mode: 'onChange',
  });

  const [createStore, { data, isSuccess, isError, isLoading, error }] = useCreateStoreMutation();
  const onSuccess = () => {
    router.push('/store');
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Create Store',
        }}
      />
      {(isSuccess || isError) && (
        <HandleResponse
          isError={isError}
          isSuccess={isSuccess}
          error={error || 'Error occurs'}
          message={data}
          onSuccess={onSuccess}
        />
      )}
      <View style={styles.containerStyle}>
        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <ScrollView contentContainerStyle={styles.scrollViewStyle}>
            {auth.role === UserTypeEnum.MERCHANT && (
              <View>
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
                    // {
                    //   name: 'address1',
                    //   type: 'text',
                    //   textInputProps: {
                    //     label: 'Address 1',
                    //     left: <TextInput.Icon icon="card-account-details" />,
                    //   },
                    // },
                    // {
                    //   name: 'address2',
                    //   type: 'text',
                    //   textInputProps: {
                    //     label: 'Address 2',
                    //     left: <TextInput.Icon icon="card-account-details" />,
                    //   },
                    // },
                    // {
                    //   name: 'address3',
                    //   type: 'text',
                    //   textInputProps: {
                    //     label: 'Address 3',
                    //     left: <TextInput.Icon icon="card-account-details" />,
                    //   },
                    // },
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
                  ]}
                />
                <Controller
                  control={control}
                  name="image"
                  render={({ field: { onChange } }) => <ImageUploadInput onChange={onChange} />}
                />

                <Button
                  mode="contained"
                  onPress={handleSubmit(
                    async ({
                      storeName,
                      description,
                      address,
                      // address1,
                      // address2,
                      // address3,
                      city,
                      state,
                      country,
                      postalCode,
                      contactNumber,
                      image,
                    }) => {
                      const formData = new FormData();
                      if (Platform.OS === 'web') {
                        formData.append(
                          'store',
                          new Blob(
                            [
                              JSON.stringify({
                                storeName,
                                description,
                                address,
                                city,
                                state,
                                postalCode,
                                contactNumber,
                                country,
                                createdBy: {
                                  email: auth.email,
                                },
                              }),
                            ],
                            {
                              type: 'application/json',
                            }
                          )
                        );
                        formData.append('image', new Blob([image?.uri ?? '']));
                      } else {
                        formData.append(
                          'store',
                          JSON.stringify({
                            storeName,
                            description,
                            address,
                            city,
                            state,
                            postalCode,
                            contactNumber,
                            country,
                            createdBy: {
                              email: auth.email,
                            },
                          })
                        );
                        formData.append('image', {
                          uri: image?.uri,
                          name: 'image.jpg',
                          type: 'image/jpeg',
                        } as any);
                      }
                      createStore(formData);
                    }
                  )}>
                  Create
                </Button>
              </View>
            )}
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
    flexGrow: 1,
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

export default CreateStore;
