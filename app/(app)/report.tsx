import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { Text } from '@/components/ui/text';

export default function Report() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center">
        <Text className="text-xl font-semibold">Report</Text>
        <Text className="text-gray-500 mt-2">Coming soon...</Text>
      </View>
    </SafeAreaView>
  );
}
