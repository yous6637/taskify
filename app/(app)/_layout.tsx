import { Tabs } from 'expo-router';
import * as React from 'react';
import { CustomTabBar } from '@/components/ui/CustomTabBar';
import "react-native-get-random-values";
import "react-native-reanimated";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function AppTabsLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="explore" />
      <Tabs.Screen name="report" />
      <Tabs.Screen name="goals" />
      <Tabs.Screen name="account" />
    </Tabs>
    </GestureHandlerRootView>
  );
}


