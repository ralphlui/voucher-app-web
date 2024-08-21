import { yupResolver } from '@hookform/resolvers/yup';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Button, TextInput, Avatar } from 'react-native-paper';
import { FormBuilder } from 'react-native-paper-form-builder';
import { useDispatch } from 'react-redux';

import HandleResponse from '~/components/Common/HandleResponse';
import { useLoginMutation } from '~/services/user.service';
import { userLogin } from '~/store';
import { logInSchema } from '~/utils/validation';

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [login, { data, isSuccess, isError, isLoading, error }] = useLoginMutation();

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

  const onSubmit = ({ email, password }: { email: string; password: string }) => {
    if (email && password) {
      login({
        body: { email, password },
      });
    }
  };

  const onSuccess = () => {
    dispatch(userLogin(data.data.token));
    router.back();
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
          // error={error?.data?.message || 'error'}
          message={data?.message}
          onSuccess={onSuccess}
        />
      )}
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
