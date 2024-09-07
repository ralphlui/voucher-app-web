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
      state.email = action.payload.data.email;
      state.role = action.payload.data.role;
      state.user = action.payload.data.username;
    },
    setWebSocket: (state, action) => {
      const ws = new WebSocket(process.env.EXPO_PUBLIC_FEED_SOCKET_URL ?? '');
      console.log(action.payload.data);
      ws.addEventListener('open', (event) => {
        ws.send(JSON.stringify(action.payload.data));
      });
    },
    setAuthData: (state, action) => {
      state.token = action.payload.token;
      state.success = action.payload.success;
    },
  },
});

export const { userLogout, userLogin, setAuthData, setWebSocket } = authSlice.actions;

export default authSlice.reducer;
