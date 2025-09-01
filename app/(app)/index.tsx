import * as React from 'react';
import { View, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { PlusIcon } from 'lucide-react-native';
import HabitCard from '@/components/list/HabitCard';
import TaskCard from '@/components/list/TaskCard';
import type { Habit, Task } from '@/lib/dataTypes';

const SCREEN_OPTIONS = {
  headerShown: true,
  title: 'Home',
};

const sampleHabits: Habit[] = [
  {
    title: 'Make UI/UX design portfolio',
    repeat_days: ['monday', 'wednesday', 'friday'],
    reminder: new Date().toISOString(),
    isPaused: false,
  },
  {
    title: 'Morning Meditation Routine',
    repeat_days: ['tuesday', 'thursday'],
    reminder: new Date().toISOString(),
    isPaused: false,
  },
];

const sampleTasks: Task[] = [
  {
    title: 'Learn Figma design software',
    dueDate: new Date().toISOString(),
    reminder: new Date().toISOString(),
    note: 'Watch Auto Layout tutorial',
  },
  {
    title: 'Practice vocabulary for 15 minutes',
    dueDate: new Date().toISOString(),
    reminder: new Date().toISOString(),
    note: 'Use spaced repetition',
  },
];

export default function Home() {
  return (
    <>
      <Stack.Screen options={SCREEN_OPTIONS} />
      <ScrollView className='flex-1 px-4 pt-3'>
        <Text className='text-muted-foreground mb-2'>Today you have 7 habits, 5 tasks</Text>

        <View className='gap-3'>
          {sampleHabits.map((h, idx) => (
            <HabitCard key={`h-${idx}`} habit={h} />
          ))}

          {sampleTasks.map((t, idx) => (
            <TaskCard key={`t-${idx}`} task={t} />
          ))}
        </View>
      </ScrollView>

      <View className='absolute bottom-6 right-6'>
        <Button size='icon' className='rounded-full h-14 w-14'>
          <Icon as={PlusIcon} />
        </Button>
      </View>
    </>
  );
}


