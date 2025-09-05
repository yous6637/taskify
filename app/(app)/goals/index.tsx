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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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



  return (
    <SafeAreaView className="flex-1 h-screen native:pt-10 pb-0 mb-0">
      {/* Header */}

      <Header {...HeaderConfigs.basic("My Goals")} />

      {/* Tab Navigation */}
      <View className="px-4 py-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-gray-100 dark:bg-gray-900 rounded-full p-1">
            <TabsTrigger 
              value="Ongoing" 
              className="flex-1 py-3 rounded-full bg-transparent data-[state=active]:bg-orange-500"
            >
              <Text className="text-center font-medium text-gray-600 dark:text-gray-300 data-[state=active]:text-white">
                Ongoing
              </Text>
            </TabsTrigger>
            <TabsTrigger 
              value="Achieved" 
              className="flex-1 py-3 rounded-full bg-transparent data-[state=active]:bg-orange-500"
            >
              <Text className="text-center font-medium text-gray-600 dark:text-gray-300 data-[state=active]:text-white">
                Achieved
              </Text>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </View>

      {/* Goals List */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
        <TabsContent value="Ongoing" className="flex-1 px-4">
          <ScrollView className="flex-1">
            {ongoingGoals.length > 0 ? (
              ongoingGoals.map((goal) => (
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
                <Text className="text-muted-foreground dark:text-muted-foreground text-lg">
                  No ongoing goals
                </Text>
                <Text className="text-muted-foreground dark:text-muted-foreground text-sm mt-2">
                  Start working on your first goal!
                </Text>
              </View>
            )}
          </ScrollView>
        </TabsContent>
        
        <TabsContent value="Achieved" className="flex-1 px-4">
          <ScrollView className="flex-1">
            {achievedGoals.length > 0 ? (
              achievedGoals.map((goal) => (
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
                <Text className="text-muted-foreground dark:text-muted-foreground text-lg">
                  No achieved goals yet
                </Text>
                <Text className="text-muted-foreground dark:text-muted-foreground text-sm mt-2">
                  Complete your first goal to see it here!
                </Text>
              </View>
            )}
          </ScrollView>
        </TabsContent>
      </Tabs>

      {/* Floating Action Button */}
      <TouchableOpacity className="absolute bottom-20 right-4 w-14 h-14 bg-orange-500 rounded-full items-center justify-center shadow-lg">
        <Ionicons name="add" size={28} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default MyGoalsPage;