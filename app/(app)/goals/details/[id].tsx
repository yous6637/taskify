import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useDialog } from '@/components/providers/dialog-provider';

const GoalDetailsPage = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

  const { confirmDialog } = useDialog();

  const handleDeleteHabit = async (habitId: number) => {
    const confirmed = await confirmDialog({
      title: 'Delete Habit',
      description: 'Are you sure you want to delete this habit?',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      variant: 'destructive',
    });
    if (confirmed) {
      handleDeleteHabitSuccess(habitId);
    }
  };

  // Sample goal data - in a real app, this would be fetched based on the ID
  const goalData = {
    id: 1,
    title: 'Become a UI/UX Designer',
    category: 'Career',
    duration: '1-180 days',
    deadline: 'Jun 25, 2025 - 10:00 AM',
    description: 'Master the skills needed to become a professional UI/UX designer through hands-on projects and learning.',
    backgroundImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
    habits: [
      {
        id: 1,
        title: 'Learn Figma design software',
        frequency: 'Daily',
        completed: [true, true, true, true, true, true, true],
        streak: 7,
        reminder: 'No reminder'
      },
      {
        id: 2,
        title: 'Build my own Design System',
        frequency: 'Mon, Wed, Fri',
        completed: [true, false, true, false, true, false, false],
        streak: 3,
        reminder: '14:00 PM'
      },
      {
        id: 3,
        title: 'Practice UI Design daily',
        frequency: 'Daily',
        completed: [true, true, true, true, false, false, false],
        streak: 4,
        reminder: '20:00 PM'
      }
    ]
  };

  const handleDeleteHabitSuccess = (habitId: number) => {
    setShowDeleteSuccess(true);
    setTimeout(() => {
      setShowDeleteSuccess(false);
    }, 3000);
  };

  const handleUndo = () => {
    setShowDeleteSuccess(false);
  };

  const HabitCard = ({ habit, isDeleted = false }: { habit: any, isDeleted?: boolean }) => {
    const completedCount = habit.completed.filter(Boolean).length;
    
    return (
      <View className={`bg-white rounded-2xl p-4 mb-4 ${isDeleted ? 'opacity-50' : ''}`}>
        <View className="flex-row items-start justify-between mb-3">
          <View className="flex-1">
            <Text className={`text-lg font-semibold text-gray-900 mb-1 ${isDeleted ? 'line-through' : ''}`}>
              {habit.title}
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="time-outline" size={16} color="#6b7280" />
              <Text className="text-gray-500 text-sm ml-1">{habit.reminder}</Text>
            </View>
          </View>
          <TouchableOpacity 
            onPress={() => handleDeleteHabit(habit.id)}
            className="p-2"
          >
            <Ionicons name="trash-outline" size={20} color="#ef4444" />
          </TouchableOpacity>
        </View>

        {/* Weekly progress */}
        <View className="flex-row justify-between mb-3">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
            <View key={index} className="items-center">
              <Text className="text-xs text-gray-500 mb-1">{day}</Text>
              <View 
                className={`w-8 h-8 rounded-full items-center justify-center ${
                  habit.completed[index] 
                    ? 'bg-orange-500' 
                    : index <= 2 ? 'bg-gray-200' : 'bg-gray-100'
                }`}
              >
                {habit.completed[index] && (
                  <Ionicons name="checkmark" size={16} color="white" />
                )}
                {!habit.completed[index] && index <= 2 && (
                  <Text className="text-gray-600 text-xs">{index + 1}</Text>
                )}
              </View>
            </View>
          ))}
        </View>

        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Ionicons name="time-outline" size={16} color="#6b7280" />
            <Text className="text-gray-500 text-sm ml-1">{habit.reminder}</Text>
          </View>
          <Text className="text-orange-500 text-sm font-medium">
            {completedCount}/7 completed
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header with background image */}
      <View className="relative">
        <ImageBackground
          source={{ uri: goalData.backgroundImage }}
          className="h-64 justify-between"
          style={{ backgroundColor: '#a855f7' }}
        >
          {/* Gradient overlay */}
          <View className="absolute inset-0 bg-gradient-to-b from-purple-600/60 to-pink-500/60" />
          
          {/* Header controls */}
          <View className="flex-row justify-between items-center px-4 pt-4">
            <TouchableOpacity 
              onPress={() => router.back()}
              className="w-10 h-10 bg-white/20 rounded-full items-center justify-center"
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity className="w-10 h-10 bg-white/20 rounded-full items-center justify-center">
              <Ionicons name="share-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>

          {/* Goal info */}
          <View className="px-4 pb-6">
            <Text className="text-white text-2xl font-bold mb-2">
              {goalData.title}
            </Text>
            <View className="flex-row items-center mb-2">
              <Ionicons name="briefcase-outline" size={16} color="white" />
              <Text className="text-white/90 text-sm ml-2">{goalData.category}</Text>
            </View>
            <View className="flex-row items-center mb-2">
              <Ionicons name="calendar-outline" size={16} color="white" />
              <Text className="text-white/90 text-sm ml-2">{goalData.duration}</Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="time-outline" size={16} color="white" />
              <Text className="text-white/90 text-sm ml-2">{goalData.deadline}</Text>
            </View>
          </View>
        </ImageBackground>
      </View>

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {/* Habits section */}
        <View className="mt-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-xl font-bold text-gray-900">Habit (3)</Text>
            <TouchableOpacity className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center">
              <Ionicons name="information-outline" size={16} color="#6b7280" />
            </TouchableOpacity>
          </View>

          {/* Habit cards */}
          {goalData.habits.map((habit) => (
            <HabitCard key={habit.id} habit={habit} />
          ))}
        </View>

        {/* Bottom spacing */}
        <View className="h-20" />
      </ScrollView>

      {/* Success message for deletion */}
      {showDeleteSuccess && (
        <View className="absolute bottom-20 left-4 right-4">
          <View className="bg-gray-900 rounded-2xl p-4 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="w-8 h-8 bg-green-500 rounded-full items-center justify-center mr-3">
                <Ionicons name="checkmark" size={16} color="white" />
              </View>
              <Text className="text-white font-medium">Successfully deleted!</Text>
            </View>
            <TouchableOpacity 
              onPress={handleUndo}
              className="bg-orange-500 px-4 py-2 rounded-full"
            >
              <Text className="text-white font-medium">Undo</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default GoalDetailsPage;
