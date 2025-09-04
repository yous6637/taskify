import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Header, HeaderConfigs } from '@/components/ui/header';
import { GoalCard, GoalCardConfigs } from '@/components/cards';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { useColorScheme } from 'nativewind';

const MyGoalsPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Ongoing');
  const { colorScheme } = useColorScheme()
  const isDarkMode = colorScheme === "dark"
  const ongoingGoals = [
    {
      id: 1,
      title: 'Become a UI/UX Designer',
      habits: { completed: 0, total: 4 },
      tasks: { completed: 0, total: 3 },
      daysLeft: 180,
      backgroundColor: 'bg-gradient-to-br from-purple-300 to-pink-300',
      illustration: '💻🎨'
    },
    {
      id: 2,
      title: 'Daily Meditation',
      habits: { completed: 0, total: 4 },
      tasks: { completed: 0, total: 4 },
      daysLeft: 374,
      backgroundColor: 'bg-gradient-to-br from-purple-600 to-blue-500',
      illustration: '🧘‍♀️🌙'
    },
    {
      id: 3,
      title: 'Learn a New Language',
      habits: { completed: 0, total: 6 },
      tasks: { completed: 0, total: 5 },
      daysLeft: 160,
      backgroundColor: 'bg-gradient-to-br from-blue-300 to-cyan-300',
      illustration: '👫📚'
    },
    {
      id: 4,
      title: 'Learn How to Play Guitar',
      habits: { completed: 1, total: 3 },
      tasks: { completed: 2, total: 4 },
      daysLeft: 90,
      backgroundColor: 'bg-gradient-to-br from-yellow-300 to-orange-400',
      illustration: '🎸🎵'
    },
    {
      id: 5,
      title: 'Launch My Own Startup',
      habits: { completed: 0, total: 0 },
      tasks: { completed: 0, total: 0 },
      daysLeft: null,
      backgroundColor: 'bg-gradient-to-br from-teal-500 to-blue-600',
      illustration: '🚀💼'
    }
  ];

  const achievedGoals: any[] = [];

  const currentGoals = activeTab === 'Ongoing' ? ongoingGoals : achievedGoals;



  return (
    <SafeAreaView className="flex-1 h-screen native:pt-10 pb-0 mb-0">
      {/* Header */}

      <Header {...HeaderConfigs.basic("My Goals")} />

      {/* Tab Navigation */}
      <View className="px-4 py-4">
        <View className="flex-row bg-gray-100 dark:bg-gray-900 rounded-full p-1">
          <TouchableOpacity
            onPress={() => setActiveTab('Ongoing')}
            className = {cn("flex-1 py-3 rounded-full bg-transparent", {
              "bg-orange-500": activeTab === 'Ongoing',
            })}
          >
            <Text 
            className = {cn("text-center font-medium text-gray-600", {
              "text-gray-300": isDarkMode,
              "text-white": activeTab === 'Ongoing'
            })}
            >
              Ongoing
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => setActiveTab('Achieved')}
            className = {cn("flex-1 py-3 rounded-full bg-transparent", {
              "bg-orange-500": activeTab === 'Achieved',
            })}
            
          >
            <Text className = {cn("text-center font-medium text-gray-600", {
              "text-gray-300": isDarkMode,
              "text-white": activeTab === 'Achieved'
            })}>
              Achieved
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Goals List */}
      <ScrollView className="flex-1 px-4">
        {currentGoals.length > 0 ? (
          currentGoals.map((goal) => (
            <GoalCard 
              key={goal.id} 
              {...GoalCardConfigs.myGoals}
              goal={goal}
              onPress={() => router.push(`/goals/details/${goal.id}`)}
              className="mb-4"
            />
          ))
        ) : (
          <View className="flex-1 items-center justify-center py-20">
            <Text className="text-gray-500 text-lg">
              {activeTab === 'Ongoing' ? 'No ongoing goals' : 'No achieved goals yet'}
            </Text>
            <Text className="text-gray-400 text-sm mt-2">
              {activeTab === 'Ongoing' 
                ? 'Start working on your first goal!' 
                : 'Complete your first goal to see it here!'
              }
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity className="absolute bottom-20 right-4 w-14 h-14 bg-orange-500 rounded-full items-center justify-center shadow-lg">
        <Ionicons name="add" size={28} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default MyGoalsPage;