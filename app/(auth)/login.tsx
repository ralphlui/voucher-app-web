import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Button, TextInput, Avatar, ActivityIndicator } from 'react-native-paper';
import { FormBuilder } from 'react-native-paper-form-builder';
import { useDispatch } from 'react-redux';

import HandleResponse from '@/components/common/HandleResponse';
import { useLoginMutation } from '@/services/user.service';
import { setAuthData, userLogin } from '@/store/slices/auth.slice';
import { logInSchema } from '@/utils/validation';

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [login, { data, isSuccess, isError, isLoading, error }] = useLoginMutation();

  const {
    control,
    // formState: { errors: formErrors },
    setFocus,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(logInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    // mode: 'onChange',
  });

  useEffect(() => {
    setFocus('email');
  }, []);

  async function tryLocalSignin() {
    dispatch(
      setAuthData({
        loading: true,
        token: null,
        success: false,
      })
    );
    const token = await AsyncStorage.getItem('auth_token');
    if (token) {
      dispatch(
        setAuthData({
          loading: false,
          token,
          success: true,
        })
      );
    } else {
      dispatch(
        setAuthData({
          loading: false,
          token: null,
          success: false,
        })
      );
    }
  }

  useEffect(() => {
    tryLocalSignin();
  }, []);

  const onSubmit = ({ email, password }: { email: string; password: string }) => {
    if (email && password) {
      login({
        body: { email, password },
      });
    }
  };

  const onSuccess = () => {
    dispatch(userLogin(data));
    router.push('/');
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Login',
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
                  name: 'email',
                  type: 'email',
                  textInputProps: {
                    label: 'Email',
                    left: <TextInput.Icon icon="email" />,
                  },
                },
                {
                  name: 'password',
                  type: 'password',
                  textInputProps: {
                    label: 'Password',
                    left: <TextInput.Icon icon="lock" />,
                  },
                },
              ]}
            />
            <Button
              style={styles.button}
              icon="login"
              mode="contained"
              onPress={handleSubmit(onSubmit)}>
              Login
            </Button>
            <Button
              style={styles.button}
              icon="account-plus"
              mode="contained"
              onPress={() => {
                router.push('/register');
              }}>
              Register
            </Button>
            <Button style={styles.button} icon="account-question" mode="contained" onPress={() => {}}>
              Forget Password
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
  button: {
    marginBottom: 10,
  },
});

export default Login;
