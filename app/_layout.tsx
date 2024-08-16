import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
// import { Provider as StoreProvider } from 'react-redux';

export default function RootLayout() {
  return (
    // <StoreProvider store={undefined}>
    <PaperProvider>
      <Stack>
        <Stack.Screen name="(main)/(tabs)" options={{ title: 'Home', headerShown: false }} />
      </Stack>
    </PaperProvider>
    // </StoreProvider>
  );
}
