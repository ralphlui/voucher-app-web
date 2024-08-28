import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';

import { Auth } from '@/types/Auth';

const initialState: Auth = {
  user: null,
  token: null,
  success: false,
  error: null,
  role: null,
  email: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLogout: (state) => {
      AsyncStorage.removeItem('auth_token');
      state.user = null;
      state.token = null;
      state.success = false;
      state.error = null;
      state.role = null;
      state.email = null;
    },
    userLogin: (state, action) => {
      if (action.payload.token) {
        AsyncStorage.setItem('auth_token', action.payload.token);
      }
      state.token = action.payload.token;
      state.success = true;
      state.email = action.payload.result[0].email;
      state.role = action.payload.result[0].role;
      state.user = action.payload.result[0].username;
    },
    setAuthData: (state, action) => {
      state.token = action.payload.token;
      state.success = action.payload.success;
    },
  },
});

export const { userLogout, userLogin, setAuthData } = authSlice.actions;

export default authSlice.reducer;
