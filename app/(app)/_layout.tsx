import { Tabs } from 'expo-router';
import * as React from 'react';
import { CustomTabBar } from '@/components/ui/CustomTabBar';

export default function AppTabsLayout() {
  return (
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
  );
}


