import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const AccountPage = () => {
  const router = useRouter();
  
  const userStats = [
    {
      value: '25',
      label: 'Total goals achieved'
    },
    {
      value: '104',
      label: 'Total formed habits'
    },
    {
      value: '126',
      label: 'Total finished tasks'
    }
  ];

  const menuItems = [
    {
      id: 1,
      icon: 'card-outline',
      title: 'Payment Methods',
      hasArrow: true,
      route: 'payment'
    },
    {
      id: 2,
      icon: 'star-outline',
      title: 'Billing & Subscriptions',
      hasArrow: true,
      route: 'subscription'
    },
    {
      id: 3,
      icon: 'shield-checkmark-outline',
      title: 'Account & Security',
      hasArrow: true,
      route: 'security'
    },
    {
      id: 4,
      icon: 'swap-vertical-outline',
      title: 'Linked Accounts',
      hasArrow: true
    },
    {
      id: 5,
      icon: 'eye-outline',
      title: 'App Appearance',
      hasArrow: true
    },
    {
      id: 6,
      icon: 'bar-chart-outline',
      title: 'Data & Analytics',
      hasArrow: true,
      route: 'analytics'
    },
    {
      id: 7,
      icon: 'document-text-outline',
      title: 'Help & Support',
      hasArrow: true,
      route: 'help'
    },
    {
      id: 8,
      icon: 'log-out-outline',
      title: 'Logout',
      hasArrow: false,
      isLogout: true
    }
  ];

  const MenuItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      className="flex-row items-center py-4 px-4 bg-white"
      onPress={() => {
        if (item.route) {
          router.push(`/account/${item.route}`);
        } else if (item.isLogout) {
          // Handle logout
        }
      }}
    >
      <View className="w-10 h-10 items-center justify-center mr-4">
        <Ionicons 
          name={item.icon} 
          size={24} 
          color={item.isLogout ? "#ef4444" : "#374151"} 
        />
      </View>
      <Text className={`flex-1 text-base font-medium ${
        item.isLogout ? 'text-red-500' : 'text-gray-900'
      }`}>
        {item.title}
      </Text>
      {item.hasArrow && (
        <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="flex-row justify-between items-center px-4 py-2 bg-white">
        <View className="w-8 h-8 bg-orange-500 rounded-lg items-center justify-center">
          <View className="w-4 h-4 border-2 border-white transform rotate-45" />
        </View>
        <Text className="text-xl font-semibold text-gray-900">Account</Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={24} color="gray" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1">
        {/* Upgrade Banner */}
        <View className="mx-4 mt-4 mb-6">
          <View className="bg-orange-500 rounded-2xl p-4 relative overflow-hidden">
            {/* Decorative elements */}
            <View className="absolute top-2 left-4">
              <View className="w-2 h-2 bg-white bg-opacity-30 rounded-full" />
            </View>
            <View className="absolute top-4 left-8">
              <View className="w-1 h-1 bg-white bg-opacity-50 rounded-full" />
            </View>
            <View className="absolute bottom-3 left-6">
              <View className="w-1.5 h-1.5 bg-white bg-opacity-40 rounded-full" />
            </View>
            <View className="absolute top-3 right-8">
              <View className="w-1 h-1 bg-white bg-opacity-50 rounded-full" />
            </View>
            <View className="absolute bottom-4 right-12">
              <View className="w-2 h-2 bg-white bg-opacity-30 rounded-full" />
            </View>

            <View className="flex-row items-center">
              {/* Crown icon */}
              <View className="w-12 h-12 bg-white bg-opacity-20 rounded-full items-center justify-center mr-4">
                <Ionicons name="diamond" size={20} color="white" />
              </View>
              
              <View className="flex-1">
                <Text className="text-white text-lg font-bold mb-1">
                  Upgrade Plan Now!
                </Text>
                <Text className="text-white opacity-90 text-sm">
                  Enjoy all the benefits and explore more possibilities
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* User Profile */}
        <View className="bg-white mx-4 rounded-2xl p-4 mb-6">
          <View className="flex-row items-center">
            {/* Profile Image Placeholder */}
            <View className="w-16 h-16 bg-gray-300 rounded-full mr-4 overflow-hidden">
              {/* You can replace this with actual image */}
              <View className="w-full h-full bg-gradient-to-br from-orange-400 to-red-400 items-center justify-center">
                <Text className="text-white text-xl font-bold">A</Text>
              </View>
            </View>
            
            <View className="flex-1">
              <Text className="text-xl font-semibold text-gray-900 mb-1">
                Andrew Ainsley
              </Text>
              <Text className="text-gray-500">
                andrew.ainsley@yourdomain.com
              </Text>
            </View>
            
            <TouchableOpacity>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Statistics */}
        <View className="bg-white mx-4 rounded-2xl p-4 mb-6">
          <View className="flex-row justify-between">
            {userStats.map((stat, index) => (
              <View key={index} className="flex-1 items-center">
                <Text className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </Text>
                <Text className="text-gray-500 text-sm text-center">
                  {stat.label}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Menu Items */}
        <View className="bg-white mx-4 rounded-2xl overflow-hidden mb-6">
          {menuItems.map((item, index) => (
            <View key={item.id}>
              <MenuItem item={item} />
              {index < menuItems.length - 1 && (
                <View className="border-b border-gray-100 ml-14" />
              )}
            </View>
          ))}
        </View>

        {/* Bottom spacing */}
        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AccountPage;