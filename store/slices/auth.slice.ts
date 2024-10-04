import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Auth } from '@/types/Auth';
import { RootState } from '@/store'; // Assuming you have this for accessing state type
import { UserTypeEnum } from '@/types/UserTypeEnum';

// Define the payload types for WebSocket initialization
interface WebSocketPayload {
  data: {
    userId: string;
    email: string;
    role: UserTypeEnum;
    username: string;
  };
}

// Thunk to handle WebSocket connection setup
export const initializeWebSocket = createAsyncThunk<WebSocket, WebSocketPayload>(
  'auth/initializeWebSocket',
  async (payload, { dispatch, getState }) => {
    const state = getState() as RootState; // Accessing the RootState type
    const { userId } = state.auth;
    console.log('Payload in createAsyncThunk: ', payload);
    console.log('State in createAsyncThunk: ', state);
    const ws = new WebSocket(
      `${process.env.EXPO_PUBLIC_FEED_SOCKET_URL}?userId=${userId ?? payload.data.userId}`
    );

    ws.addEventListener('open', () => {
      console.log('Message sent: ', payload.data);
      ws.send(JSON.stringify(payload.data));
    });

    ws.addEventListener('message', (event) => {
      console.log('Message received: ', event.data);
      const message = JSON.parse(event.data);
      dispatch(setWebSocketMessage(message));
    });

    ws.addEventListener('close', () => {
      console.log('WebSocket closed!');
    });

    return ws;
  }
);

// Define the initial state with typing
const initialState: Auth = {
  user: null,
  userId: null,
  token: null,
  success: false,
  error: null,
  role: null,
  email: null,
  message: null,
  webSocket: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLogout: (state) => {
      AsyncStorage.removeItem('auth_token').catch((err) =>
        console.error('Error removing token:', err)
      );
      state.user = null;
      state.token = null;
      state.success = false;
      state.error = null;
      state.role = null;
      state.email = null;
      state.webSocket?.close();
      state.webSocket = null;
    },
    userLogin: (
      state,
      action: PayloadAction<{ token: string; data: WebSocketPayload['data'] }>
    ) => {
      if (action.payload.token) {
        AsyncStorage.setItem('auth_token', action.payload.token).catch((err) =>
          console.error('Error storing token:', err)
        );
      }
      state.token = action.payload.token;
      state.success = true;
      state.email = action.payload.data.email;
      state.role = action.payload.data.role;
      state.user = action.payload.data.username;
      state.userId = action.payload.data.userId;
    },
    setWebSocketMessage: (state, action: PayloadAction<any>) => {
      console.log('State in setWebSocketMessage: ', state);
      console.log('Action in setWebSocketMessage: ', action);
      state.message = action.payload;
    },
    setAuthData: (state, action: PayloadAction<{ token: string | null; success: boolean }>) => {
      state.token = action.payload.token;
      state.success = action.payload.success;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initializeWebSocket.fulfilled, (state, action: PayloadAction<WebSocket>) => {
      state.webSocket = action.payload;
    });
  },
});

export const { userLogout, userLogin, setAuthData, setWebSocketMessage } = authSlice.actions;

export default authSlice.reducer;
