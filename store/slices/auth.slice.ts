import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';

import { Auth } from '@/types/Auth';

const initialState: Auth = {
  user: null,
  userId: null,
  token: null,
  success: false,
  error: null,
  role: null,
  email: null,
  message: null,
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
      state.userId = action.payload.data.userID;
    },
    setWebSocket: (state, action) => {
      const ws = new WebSocket(
        `${process.env.EXPO_PUBLIC_FEED_SOCKET_URL}?userId=${state.userId ?? action.payload.data.userID}`
      );
      ws.addEventListener('open', (event) => {
        ws.send(JSON.stringify(action.payload.data));
      });
      ws.addEventListener('message', (event) => {
        console.log('Message received: ', event.data);
        const message = JSON.parse(event.data);
        state.message = message;
      });
      ws.addEventListener('close', () => {});
    },
    setAuthData: (state, action) => {
      state.token = action.payload.token;
      state.success = action.payload.success;
    },
  },
});

export const { userLogout, userLogin, setAuthData, setWebSocket } = authSlice.actions;

export default authSlice.reducer;
