import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Header, HeaderConfigs } from '@/components/ui/header';

const AnalyticsPage = () => {
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const periods = [
    { id: 'week', label: 'Week' },
    { id: 'month', label: 'Month' },
    { id: 'year', label: 'Year' },
  ];

  const stats = [
    {
      id: 1,
      title: 'Tasks Completed',
      value: '48',
      change: '+12%',
      changeType: 'positive',
      icon: 'checkmark-circle-outline',
      color: 'bg-green-100',
      iconColor: '#10b981',
    },
    {
      id: 2,
      title: 'Goals Achieved',
      value: '7',
      change: '+3',
      changeType: 'positive',
      icon: 'trophy-outline',
      color: 'bg-yellow-100',
      iconColor: '#f59e0b',
    },
    {
      id: 3,
      title: 'Productivity Score',
      value: '87%',
      change: '-2%',
      changeType: 'negative',
      icon: 'trending-up-outline',
      color: 'bg-blue-100',
      iconColor: '#3b82f6',
    },
    {
      id: 4,
      title: 'Streak Days',
      value: '12',
      change: '+5',
      changeType: 'positive',
      icon: 'flame-outline',
      color: 'bg-orange-100',
      iconColor: '#ea580c',
    },
  ];

  const activityData = [
    { day: 'Mon', tasks: 8, goals: 2 },
    { day: 'Tue', tasks: 12, goals: 1 },
    { day: 'Wed', tasks: 6, goals: 3 },
    { day: 'Thu', tasks: 15, goals: 2 },
    { day: 'Fri', tasks: 9, goals: 1 },
    { day: 'Sat', tasks: 4, goals: 0 },
    { day: 'Sun', tasks: 7, goals: 1 },
  ];

  const categories = [
    { name: 'Work', percentage: 45, color: '#ea580c' },
    { name: 'Personal', percentage: 30, color: '#3b82f6' },
    { name: 'Health', percentage: 15, color: '#10b981' },
    { name: 'Learning', percentage: 10, color: '#f59e0b' },
  ];

  const StatCard = ({ stat }: { stat: any }) => (
    <View className="bg-white rounded-2xl p-4 flex-1 mx-1">
      <View className={`w-12 h-12 ${stat.color} rounded-full items-center justify-center mb-3`}>
        <Ionicons name={stat.icon} size={24} color={stat.iconColor} />
      </View>
      <Text className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</Text>
      <Text className="text-sm text-gray-600 mb-2">{stat.title}</Text>
      <View className="flex-row items-center">
        <Text className={`text-sm font-medium ${
          stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
        }`}>
          {stat.change}
        </Text>
        <Text className="text-xs text-gray-500 ml-1">vs last {selectedPeriod}</Text>
      </View>
    </View>
  );

  const ActivityBar = ({ data }: { data: any }) => {
    const maxTasks = Math.max(...activityData.map(d => d.tasks));
    const height = (data.tasks / maxTasks) * 100;
    
    return (
      <View className="flex-1 items-center">
        <View className="flex-1 justify-end mb-2" style={{ height: 120 }}>
          <View 
            className="bg-orange-500 rounded-t-lg w-6"
            style={{ height: `${height}%`, minHeight: 4 }}
          />
        </View>
        <Text className="text-xs text-gray-600">{data.day}</Text>
      </View>
    );
  };

  const CategoryBar = ({ category }: { category: any }) => (
    <View className="mb-4">
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-base font-medium text-gray-900">{category.name}</Text>
        <Text className="text-sm text-gray-600">{category.percentage}%</Text>
      </View>
      <View className="bg-gray-200 rounded-full h-2">
        <View 
          className="rounded-full h-2" 
          style={{ 
            width: `${category.percentage}%`,
            backgroundColor: category.color 
          }}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1">
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 bg-white border-b border-gray-200">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="#374151" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold text-gray-900">Analytics</Text>
      </View>

      <ScrollView className="flex-1">
        {/* Period Selector */}
        <View className="mx-4 mt-6">
          <View className="flex-row bg-white rounded-2xl p-1">
            {periods.map((period) => (
              <TouchableOpacity
                key={period.id}
                className={`flex-1 py-3 rounded-xl ${
                  selectedPeriod === period.id ? 'bg-orange-500' : 'bg-transparent'
                }`}
                onPress={() => setSelectedPeriod(period.id)}
              >
                <Text className={`text-center font-medium ${
                  selectedPeriod === period.id ? 'text-white' : 'text-gray-600'
                }`}>
                  {period.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Stats Grid */}
        <View className="mx-4 mt-6">
          <View className="flex-row mb-4">
            <StatCard stat={stats[0]} />
            <StatCard stat={stats[1]} />
          </View>
          <View className="flex-row">
            <StatCard stat={stats[2]} />
            <StatCard stat={stats[3]} />
          </View>
        </View>

        {/* Activity Chart */}
        <View className="mx-4 mt-8">
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            Daily Activity
          </Text>
          <View className="bg-white rounded-2xl p-4">
            <View className="flex-row items-end justify-between" style={{ height: 140 }}>
              {activityData.map((data, index) => (
                <ActivityBar key={index} data={data} />
              ))}
            </View>
            <View className="flex-row items-center justify-center mt-4">
              <View className="flex-row items-center mr-6">
                <View className="w-3 h-3 bg-orange-500 rounded-full mr-2" />
                <Text className="text-sm text-gray-600">Tasks</Text>
              </View>
              <View className="flex-row items-center">
                <View className="w-3 h-3 bg-blue-500 rounded-full mr-2" />
                <Text className="text-sm text-gray-600">Goals</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Category Breakdown */}
        <View className="mx-4 mt-8">
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            Category Breakdown
          </Text>
          <View className="bg-white rounded-2xl p-4">
            {categories.map((category, index) => (
              <CategoryBar key={index} category={category} />
            ))}
          </View>
        </View>

        {/* Insights */}
        <View className="mx-4 mt-8">
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            Insights
          </Text>
          <View className="bg-white rounded-2xl p-4">
            <View className="flex-row items-start mb-4">
              <View className="w-8 h-8 bg-blue-100 rounded-full items-center justify-center mr-3">
                <Ionicons name="bulb-outline" size={16} color="#3b82f6" />
              </View>
              <View className="flex-1">
                <Text className="text-base font-medium text-gray-900 mb-1">
                  Peak Productivity
                </Text>
                <Text className="text-sm text-gray-600">
                  You're most productive on Thursdays between 2-4 PM
                </Text>
              </View>
            </View>
            
            <View className="flex-row items-start mb-4">
              <View className="w-8 h-8 bg-green-100 rounded-full items-center justify-center mr-3">
                <Ionicons name="trending-up-outline" size={16} color="#10b981" />
              </View>
              <View className="flex-1">
                <Text className="text-base font-medium text-gray-900 mb-1">
                  Improvement Trend
                </Text>
                <Text className="text-sm text-gray-600">
                  Your task completion rate has improved by 15% this month
                </Text>
              </View>
            </View>
            
            <View className="flex-row items-start">
              <View className="w-8 h-8 bg-yellow-100 rounded-full items-center justify-center mr-3">
                <Ionicons name="star-outline" size={16} color="#f59e0b" />
              </View>
              <View className="flex-1">
                <Text className="text-base font-medium text-gray-900 mb-1">
                  Goal Achievement
                </Text>
                <Text className="text-sm text-gray-600">
                  You're on track to exceed your monthly goal target by 20%
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Bottom spacing */}
        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AnalyticsPage;
