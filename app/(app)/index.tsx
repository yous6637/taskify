import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  useWindowDimensions
  
} from 'react-native';
import { Calendar, CalendarProvider, WeekCalendar } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import { AddButton } from '@/components/add-button';
import { Header, HeaderConfigs } from '@/components/ui/header';
import { TaskCard, TaskCardConfigs, StatsCard, StatsCardConfigs } from '@/components/cards';
import { Text } from '@/components/ui/text';

const HomePage = () => {
  const [selectedDate, setSelectedDate] = useState('2024-03-22');
  const { width } = useWindowDimensions()
  
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

  const toggleTask = (taskId: number) => {
    // Handle task completion toggle
    // Alert.alert()
    console.log('Toggle task:', taskId);
  };

  return (
    <SafeAreaView className="flex-1 h-screen native:pt-10 pb-0 mb-0">
      <CalendarProvider date= {new Date().toDateString()}>
      {/* Header */}
      <Header {...HeaderConfigs.basic("Home")} className="h-20" />

        {/* Calendar */}
        <View className="px-4 mb-4 overflow-hidden">
          <WeekCalendar
            current="2024-03-22"
            onDayPress={(day) => setSelectedDate(day.dateString)}
            markedDates={markedDates}
            windowSize={width - 32}
            theme={{
              backgroundColor: 'white',
              contentStyle: { width: width - 32},
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
              textDayHeaderFontSize: 14,
              stylesheet: {
                calendar: {
                  "main" : {
                    width: width - 32,
                    flexGrow: 1
                  }
                }
              }
            }}
            // hideExtraDays={true}
            disableMonthChange={true}
            firstDay={1}
            hideDayNames={false}
            showWeekNumbers={false}
            disableArrowLeft={false}
            disableArrowRight={false}
          />
        </View>
      <ScrollView className="flex-1 h-full">

        {/* Progress Bar */}
        <View className="px-4 mb-6">
          <StatsCard
            {...StatsCardConfigs.progress}
            progress={{
              current: habitStats.completed,
              total: habitStats.total,
            }}
          />
          <View className="mt-2">
            <StatsCard
              {...StatsCardConfigs.metric}
              metrics={{
                habits: habitStats.habits,
                tasks: habitStats.tasks,
                completed: habitStats.completed,
                total: habitStats.total,
              }}
            />
          </View>
        </View>

        {/* Task Categories */}
        {goals.map((category, categoryIndex) => (
          <View key={categoryIndex} className="px-4 mb-6">
            <Text className="text-muted-foreground text-sm mb-3">{category.title}</Text>
            
            {category.tasks.map((task, taskIndex) => (
              <View key={task.id} className="mb-3">
                <TaskCard
                  {...TaskCardConfigs.inline}
                  task={{
                    id: task.id,
                    title: task.title,
                    time: task.time,
                    completed: task.completed,
                    color: task.color,
                  }}
                  onToggle={() => toggleTask(task.id)}
                />
              </View>
            ))}
          </View>
        ))}
      </ScrollView>

      </CalendarProvider>

      {/* Floating Action Button */}
     <AddButton />
    </SafeAreaView>
  );
};

export default HomePage;