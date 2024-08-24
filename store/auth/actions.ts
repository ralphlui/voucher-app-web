import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { Auth } from '@/types/Auth';

const API_URL = `${process.env.EXPO_PUBLIC_API_URL}api`;

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const registerUser = createAsyncThunk(
  'auth/register',
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/register`, data, config);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/user/login`, data, config);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUser = createAsyncThunk('auth/getUser', async (_, { rejectWithValue }) => {
  try {
    const token = await AsyncStorage.getItem('auth_token');
    const response = await axios.get(`${API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const deleteUser = createAsyncThunk('auth/deleteUser', async (_, { rejectWithValue }) => {
  try {
    const token = await AsyncStorage.getItem('auth_token');
    const getUserResponse = await axios.get(`${API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const userId = getUserResponse.data.data._id;
    const response = await axios.delete(`${process.env.EXPO_PUBLIC_API_URL}users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    await AsyncStorage.removeItem('auth_token');
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const logoutUser = createAsyncThunk('auth/logout', async function () {
  await AsyncStorage.removeItem('auth_token');
});

export const setAuthData = createAction<Auth>('auth/setAuthData');
