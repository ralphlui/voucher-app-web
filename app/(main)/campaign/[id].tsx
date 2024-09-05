import { useGetCampaignByIdQuery } from '@/services/campaign.service';
import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Campaign as TCampaign } from '@/types/Campaign';
import { FormBuilder } from 'react-native-paper-form-builder';
import { Button, TextInput, Text, ActivityIndicator } from 'react-native-paper';
import CampaignCard from '@/components/cards/CampaignCard';

const Campaign = () => {
  const { id } = useLocalSearchParams();
  const { data, error, isLoading, isFetching, isSuccess, isError, refetch } =
    useGetCampaignByIdQuery({ campaignId: id });

  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    // mode: 'onChange',
  });

  useEffect(() => {
    if (data) {
      Object.keys(data.data).forEach((key) => setValue(key, data?.data[key]));
    }
  }, [data, setValue]);

  return (
    <>
      <Stack.Screen options={{ title: 'Campaign' }} />
      <View style={styles.containerStyle}>
        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <ScrollView contentContainerStyle={styles.scrollViewStyle}>
            <Controller
              defaultValue={data?.data?.campaignId}
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  style={styles.field}
                  label="CampaignID"
                  value={value}
                />
              )}
              name="campaignId"
              rules={{ required: true }}
            />
            <Controller
              defaultValue={data?.data?.description}
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  style={styles.field}
                  label="Description"
                  value={value}
                />
              )}
              name="description"
              rules={{ required: true }}
            />
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
  field: {
    marginBottom: 20,
  },
});

export default Campaign;
