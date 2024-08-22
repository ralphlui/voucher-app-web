import React from 'react';
import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

const HeaderLoginLink = () => {
  return (
    <Link
      href={'/(auth)/login'}
      style={styles.button}>
      Login
    </Link>
  );
};

const styles = StyleSheet.create({
  button: {
    alignContent: 'center',
    margin: 10,
    marginRight: 20
  },
});

export default HeaderLoginLink;
