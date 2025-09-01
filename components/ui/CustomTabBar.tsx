import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '@/components/ui/text';
import { Ionicons } from '@expo/vector-icons';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';

const tabIcons = {
  index: { active: 'home', inactive: 'home-outline' },
  explore: { active: 'compass', inactive: 'compass-outline' },
  report: { active: 'bar-chart', inactive: 'bar-chart-outline' },
  goals: { active: 'grid', inactive: 'grid-outline' },
  account: { active: 'person', inactive: 'person-outline' },
} as const;

const tabLabels = {
  index: 'Home',
  explore: 'Explore',
  report: 'Report',
  goals: 'My Goals',
  account: 'Account',
} as const;

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View className="flex-row bg-white border-t border-gray-200 px-4 py-2">
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const routeName = route.name as keyof typeof tabIcons;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const iconName = tabIcons[routeName]?.[isFocused ? 'active' : 'inactive'] || 'home-outline';
        const label = tabLabels[routeName] || route.name;

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            className="flex-1 items-center py-2"
          >
            <Ionicons 
              name={iconName as any} 
              size={24} 
              color={isFocused ? '#f97316' : 'gray'} 
            />
            <Text className={`text-xs mt-1 ${isFocused ? 'text-orange-500' : 'text-gray-400'}`}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
