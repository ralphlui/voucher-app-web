import { configureStore } from '@reduxjs/toolkit';
import authSlice from '@/store/auth/slice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    // preferences: preferencesSlice,
    // [recipeApiSlice.reducerPath]: recipeApiSlice.reducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(
  //     recipeApiSlice.middleware,
  //   ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
