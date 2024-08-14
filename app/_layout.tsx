import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    // <TamaguiProvider config={config}>
    <Stack>
      <Stack.Screen name="(main)/(tabs)" options={{ title: 'Home', headerShown: false }} />
    </Stack>
    // </TamaguiProvider>
  );
}
