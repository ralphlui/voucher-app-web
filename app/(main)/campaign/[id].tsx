import CampaignStatusChip from '@/components/chips/CampaignStatusChip';
import { useGetCampaignByIdQuery } from '@/services/campaign.service';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { Button, Text, ActivityIndicator, Chip, Card, ProgressBar } from 'react-native-paper';

const Campaign = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { data, error, isLoading, isFetching, isSuccess, isError, refetch } =
    useGetCampaignByIdQuery({ campaignId: id });
  const [showPin, setShowPin] = useState<boolean>(false);
  // console.log(data?.data?.amount);
  // const {
  //   register,
  //   setValue,
  //   handleSubmit,
  //   control,
  //   reset,
  //   formState: { errors },
  // } = useForm({
  //   // mode: 'onChange',
  // });

  // useEffect(() => {
  //   if (data) {
  //     Object.keys(data.data).forEach((key) => setValue(key, data?.data[key]));
  //   }
  // }, [data, setValue]);

  return (
    <>
      <Stack.Screen options={{ title: data?.data?.description }} />
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollViewStyle}>
          <Card style={styles.container}>
            <Card.Content>
              <Text style={styles.amount} variant="displayLarge">
                ${data?.data?.amount} off
              </Text>
            </Card.Content>
            <Card.Title
              title={<CampaignStatusChip status={data?.data?.campaignStatus} />}
              right={() => (
                <Card.Actions>
                  <Button mode="contained" onPress={() => {}}>
                    Edit
                  </Button>
                  <Button mode="contained" onPress={() => {}}>
                    Claim
                  </Button>
                </Card.Actions>
              )}
            />
            <Card.Content>
              <View style={styles.processbar}>
                <ProgressBar
                  progress={data?.data?.numberOfClaimedVouchers / data?.data?.numberOfVouchers}
                />
                <Text variant="bodyMedium">
                  {data?.data?.numberOfClaimedVouchers} / {data?.data?.numberOfVouchers} claimed
                </Text>
              </View>
              <Button
                mode="contained"
                icon="map-marker-radius"
                style={styles.button}
                onPress={() => {
                  router.push(`/(main)/store/${data?.data?.store?.storeId}`);
                }}>
                {data?.data?.store?.storeName} @ {data?.data?.store?.address}, {data?.data?.store?.city}
              </Button>
              {showPin && (
                <View>
                  <Text variant="displayMedium" style={styles.pin}>
                    {data?.data?.pin}
                  </Text>
                  <Image
                    style={styles.image}
                    source={{
                      uri: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${data?.data?.pin}`,
                    }}
                  />
                </View>
              )}
              <Button onPress={() => setShowPin(!showPin)}>
                {showPin ? 'Hide Pin' : 'Show Pin'}
              </Button>
              <Text>Tags</Text>
              <Text style={styles.text}>{data?.data?.tagsJson}</Text>
              <Text>Campaign Start Date</Text>
              <Text style={styles.text}>{data?.data?.startDate}</Text>
              <Text>Campaign End Date</Text>
              <Text style={styles.text}>{data?.data?.endDate}</Text>
              <Text>T&C</Text>
              <Text style={styles.text}>{data?.data?.tandc}</Text>
            </Card.Content>
          </Card>
        </ScrollView>
      )}
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
  text: {
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    height: 45,
    borderRadius: 5,
    borderColor: 'grey',
    backgroundColor: 'white',
  },
  amount: {
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    height: 80,
    borderRadius: 5,
    borderColor: 'grey',
    backgroundColor: 'white',
  },
  pin: {
    alignSelf: 'center',
  },
  image: {
    alignSelf: 'center',
    width: 150,
    height: 150,
  },
});

export default Campaign;
