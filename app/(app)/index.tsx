import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';

const HomePage = () => {
  const [selectedDate, setSelectedDate] = useState('2024-03-22');
  
  // Mock data for habits and tasks
  const habitStats = {
    completed: 7,
    total: 12,
    habits: 7,
    tasks: 5
  };

  const goals = [
    {
      title: "Become a UI/UX Designer",
      tasks: [
        { 
          id: 1, 
          title: "Make UI/UX design portfolio", 
          time: "09:00 AM", 
          completed: false,
          color: "bg-orange-500"
        },
        { 
          id: 2, 
          title: "Learn Figma design software", 
          time: "", 
          completed: true,
          color: "bg-orange-500"
        },
        { 
          id: 3, 
          title: "Find a UI/UX design online course", 
          time: "16:00 PM", 
          completed: false,
          color: "bg-blue-500"
        }
      ]
    },
    {
      title: "Daily Meditation",
      tasks: [
        { 
          id: 4, 
          title: "Morning Meditation Routine", 
          time: "07:00 AM", 
          completed: true,
          color: "bg-orange-500"
        },
        { 
          id: 5, 
          title: "Evening Wind-Down", 
          time: "16:00 PM", 
          completed: false,
          color: "bg-orange-500"
        },
        { 
          id: 6, 
          title: "Set Daily Meditation Time", 
          time: "10:00 AM", 
          completed: false,
          color: "bg-blue-500"
        }
      ]
    },
    {
      title: "Learn a New Language",
      tasks: [
        { 
          id: 7, 
          title: "Practice vocabulary for 15 minutes", 
          time: "", 
          completed: false,
          color: "bg-orange-500"
        },
        { 
          id: 8, 
          title: "Choose a language learning method", 
          time: "11:00 AM", 
          completed: true,
          color: "bg-green-500"
        }
      ]
    },
    {
      title: "Learn How to Play Guitar",
      tasks: [
        { 
          id: 9, 
          title: "Practice playing guitar for 30 minutes", 
          time: "16:00 PM", 
          completed: true,
          color: "bg-green-500"
        },
        { 
          id: 10, 
          title: "Find a YouTube channel to subscribe", 
          time: "19:00 PM", 
          completed: false,
          color: "bg-blue-500"
        }
      ]
    }
  ];

  const markedDates = {
    '2024-03-16': { marked: true, dotColor: '#f97316' },
    '2024-03-17': { marked: true, dotColor: '#f97316' },
    '2024-03-18': { marked: true, dotColor: '#f97316' },
    '2024-03-19': { marked: true, dotColor: '#f97316' },
    '2024-03-20': { marked: true, dotColor: '#f97316' },
    '2024-03-21': { marked: true, dotColor: '#f97316' },
    '2024-03-22': { 
      selected: true, 
      selectedColor: '#f97316',
      marked: true,
      dotColor: 'white'
    }
  };

  const toggleTask = (taskId) => {
    // Handle task completion toggle
    console.log('Toggle task:', taskId);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row justify-between items-center px-4 py-2">
        <View className="w-8 h-8 bg-orange-500 rounded-lg items-center justify-center">
          <View className="w-4 h-4 border-2 border-white transform rotate-45" />
        </View>
        <Text className="text-xl font-semibold text-gray-900">Home</Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={24} color="gray" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1">
        {/* Calendar */}
        <View className="px-4 mb-4">
          <Calendar
            current="2024-03-22"
            onDayPress={(day) => setSelectedDate(day.dateString)}
            markedDates={markedDates}
            theme={{
              backgroundColor: 'white',
              calendarBackground: 'white',
              textSectionTitleColor: '#6b7280',
              selectedDayBackgroundColor: '#f97316',
              selectedDayTextColor: 'white',
              todayTextColor: '#f97316',
              dayTextColor: '#374151',
              textDisabledColor: '#d1d5db',
              dotColor: '#f97316',
              selectedDotColor: 'white',
              arrowColor: '#f97316',
              monthTextColor: '#374151',
              indicatorColor: '#f97316',
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 14
            }}
            hideExtraDays={true}
            disableMonthChange={true}
            firstDay={1}
            hideDayNames={false}
            showWeekNumbers={false}
            disableArrowLeft={false}
            disableArrowRight={false}
          />
        </View>

        {/* Progress Bar */}
        <View className="px-4 mb-6">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-gray-600">
              Today you have <Text className="text-orange-500 font-semibold">{habitStats.habits} habits</Text>, <Text className="text-blue-500 font-semibold">{habitStats.tasks} tasks</Text>
            </Text>
            <Text className="text-gray-400">{habitStats.completed} / {habitStats.total}</Text>
          </View>
          <View className="w-full bg-gray-200 rounded-full h-2">
            <View 
              className="bg-orange-500 h-2 rounded-full" 
              style={{ width: `${(habitStats.completed / habitStats.total) * 100}%` }}
            />
          </View>
        </View>

        {/* Task Categories */}
        {goals.map((category, categoryIndex) => (
          <View key={categoryIndex} className="px-4 mb-6">
            <Text className="text-gray-600 text-sm mb-3">{category.title}</Text>
            
            {category.tasks.map((task, taskIndex) => (
              <View key={task.id} className="flex-row items-center mb-3">
                {/* Color indicator */}
                <View className={`w-1 h-12 ${task.color} rounded-full mr-3`} />
                
                {/* Checkbox */}
                <TouchableOpacity 
                  onPress={() => toggleTask(task.id)}
                  className="mr-3"
                >
                  <View className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
                    task.completed 
                      ? 'bg-green-500 border-green-500' 
                      : 'border-gray-300'
                  }`}>
                    {task.completed && (
                      <Ionicons name="checkmark" size={14} color="white" />
                    )}
                  </View>
                </TouchableOpacity>
                
                {/* Task content */}
                <View className="flex-1">
                  <Text className={`text-gray-900 font-medium ${
                    task.completed ? 'line-through text-gray-500' : ''
                  }`}>
                    {task.title}
                  </Text>
                  {task.time && (
                    <View className="flex-row items-center mt-1">
                      <Ionicons name="time-outline" size={14} color="gray" />
                      <Text className="text-gray-500 text-sm ml-1">{task.time}</Text>
                    </View>
                  )}
                </View>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>

      

      {/* Floating Action Button */}
      <TouchableOpacity className="absolute bottom-20 right-4 w-14 h-14 bg-orange-500 rounded-full items-center justify-center shadow-lg">
        <Ionicons name="add" size={28} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomePage;