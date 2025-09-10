import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function GoalsLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="details/[id]" />
    </Stack>
    </GestureHandlerRootView>
  );
}
