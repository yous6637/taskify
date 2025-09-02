import { Stack } from 'expo-router';

export default function AccountLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="payment" />
      <Stack.Screen name="subscription" />
      <Stack.Screen name="security" />
      <Stack.Screen name="analytics" />
      <Stack.Screen name="help" />
    </Stack>
  );
}
