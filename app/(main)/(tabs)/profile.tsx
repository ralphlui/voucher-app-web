import LoginButton from '@/components/Buttons/LoginButton';
import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { useSelector } from 'react-redux';

const ProfileTab = () => {
  const auth = useSelector((state: any) => state.auth);

  return (
    <View style={styles.containerStyle}>
      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        {auth.success ? <Text>{auth.user}</Text> : <LoginButton />}
      </ScrollView>
    </View>
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
  button: {
    marginBottom: 10,
  },
});

export default ProfileTab;
