import { Tabs } from 'expo-router';
import * as React from 'react';
import { useColorScheme } from 'nativewind';
import { Icon } from '@/components/ui/icon';
import { HomeIcon, CompassIcon, BarChart3Icon, TargetIcon, UserIcon } from 'lucide-react-native';

export default function AppTabsLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colorScheme === 'dark' ? '#ff7a33' : '#ff7a33',
        tabBarStyle: { height: 64 },
        tabBarLabelStyle: { fontSize: 12 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Icon as={HomeIcon} color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, size }) => <Icon as={CompassIcon} color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="report"
        options={{
          title: 'Report',
          tabBarIcon: ({ color, size }) => <Icon as={BarChart3Icon} color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="goals"
        options={{
          title: 'My Goals',
          tabBarIcon: ({ color, size }) => <Icon as={TargetIcon} color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color, size }) => <Icon as={UserIcon} color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}


