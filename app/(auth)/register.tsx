import { Stack } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Button, TextInput, Avatar } from 'react-native-paper';
import { FormBuilder } from 'react-native-paper-form-builder';

const Register = () => {
  const { control, setFocus, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Register',
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
                name: 'name',
                type: 'text',
                textInputProps: {
                  label: 'Username',
                  left: <TextInput.Icon icon="account" />,
                },
                rules: {
                  required: {
                    value: true,
                    message: 'Name is required',
                  },
                },
              },
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
              {
                name: 'password',
                type: 'password',
                textInputProps: {
                  label: 'Confirm Password',
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
              {
                name: 'type',
                type: 'select',
                textInputProps: {
                  label: 'Usertype',
                  left: <TextInput.Icon icon="card-account-details" />,
                },
                rules: {
                  required: {
                    value: true,
                    message: 'User type is required',
                  },
                },
                options: [
                  {
                    value: 0,
                    label: 'Merchant',
                  },
                  {
                    value: 1,
                    label: 'Customer',
                  },
                ],
              },
            ]}
          />
          <Button
            mode="contained"
            onPress={handleSubmit((data: any) => {
              console.log('form data', data);
            })}>
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
});

export default Register;
