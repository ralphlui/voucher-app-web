import { yupResolver } from '@hookform/resolvers/yup';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import { Button, TextInput, Avatar } from 'react-native-paper';
import { FormBuilder } from 'react-native-paper-form-builder';
import { useDispatch, useSelector } from 'react-redux';
import * as SecureStore from 'expo-secure-store';

import { loginUser, setAuthData } from '@/store/auth/actions';
import { logInSchema } from '@/utils/validation';

const Login = () => {
  const loading = useSelector((state: any) => state.auth.loading);
  const error = useSelector((state: any) => state.auth.error);
  const dispatch = useDispatch();
  const router = useRouter();
  const [loginError, setLoginError] = useState<any>(null);
  const state = useSelector((state: any) => state);
  console.log(state);
  // const [login, { data, isSuccess, isError, isLoading, error }] = useLoginMutation();

  useEffect(() => {
    if (error) {
      setLoginError(error);
    }
  }, [error]);

  useEffect(() => {
    if (loginError) {
      Alert.alert('Invalid Credentials', 'Authentication Error', [
        {
          text: 'OK',
          onPress: () => {
            setLoginError(null);
          },
        },
      ]);
    }
  }, [loginError]);

  const {
    control,
    formState: { errors: formErrors },
    setFocus,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(logInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  async function tryLocalSignin() {
    dispatch(
      setAuthData({
        loading: true,
        token: null,
        success: false,
      })
    );
    const token = await SecureStore.getItemAsync('auth_token');
    if (token) {
      dispatch(
        setAuthData({
          loading: false,
          token: token,
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
      //@ts-ignore
      dispatch(loginUser({ email, password })).then(async (action: any) => {
        if (action.type === 'user/login/fulfilled') {
          SecureStore.setItemAsync('auth_token', action.payload.token);
          SecureStore.setItemAsync('user_type', action.payload.result[0].role);
        }
      });
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Login',
        }}
      />
      <View style={styles.containerStyle}>
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
                rules: {
                  required: {
                    value: true,
                    message: 'Email is required',
                  },
                  pattern: {
                    value:
                      /[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})/,
                    message: 'Email is invalid',
                  },
                },
              },
              {
                name: 'password',
                type: 'password',
                textInputProps: {
                  label: 'Password',
                  left: <TextInput.Icon icon="lock" />,
                },
                rules: {
                  required: {
                    value: true,
                    message: 'Password is required',
                  },
                  minLength: {
                    value: 8,
                    message: 'Password should be atleast 8 characters',
                  },
                  maxLength: {
                    value: 30,
                    message: 'Password should be between 8 and 30 characters',
                  },
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
        </ScrollView>
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
