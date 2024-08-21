import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistReducer } from 'redux-persist';

import apiSlice from '@/store/slices/api.slice';
import userReducer from '@/store/slices/user.slice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
};

const userPersistedReducer = persistReducer(persistConfig, userReducer);

export * from './slices/user.slice';

export const store = configureStore({
  reducer: {
    user: userPersistedReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {user: UserState, ticket: TicketState}
export type AppDispatch = typeof store.dispatch;
