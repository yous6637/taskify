import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
export default function AccountLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
    </GestureHandlerRootView>
  );
}
