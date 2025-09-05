import { SafeAreaView, StyleSheet, View, TextInput, Image } from 'react-native';
import React, { useState } from 'react';
import { Header, HeaderConfigs } from '@/components/ui/header';
import { Button, buttonTextVariants } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import HabitForm from '@/components/forms/habit-form';
import { useModal } from '@/components/providers/modal-provider';
import TaskForm from '@/components/forms/task-form';
import { cn } from '@/lib/utils';
import { HabitFormType, TaskFormType } from '@/lib/dataTypes';

type Props = {};

const AddGoal = (props: Props) => {
  const { showForm: showHabitForm } = useModal<HabitFormType>();
  const { showForm: showTaskForm } = useModal<TaskFormType>();
  const [goalTitle, setGoalTitle] = useState('');
  const [note, setNote] = useState('');

  const handleAddHabit = async () => {
    console.log("add habit")
    const result = await showHabitForm({
      title: 'Add Habit',
      formComponent: HabitForm,
      modal: "fullScreen",
      size: "full",
    });
    console.log("habit form result", result)
  };

  const handleAddTask = async () => {
    console.log("add task")
    const result = await showTaskForm({
      title: 'Add Task',
      formComponent: TaskForm,
      modal: "fullScreen",
      size: "full",
    });
    console.log("task form result", result)
  };

  const handleCreateGoals = () => {
    console.log("Create goals with:", { goalTitle, note });
    // Handle goal creation logic here
  };

  return (
    <SafeAreaView className="native:pt-10 mb-0 h-screen flex-1 pb-0 bg-background">
      <Header {...HeaderConfigs.imageBackground('Self-made Goals')} />
      
      <View className="flex-1 px-4 pt-6">
        {/* Goal Image Placeholder */}
        <View className="items-center mb-8">
          <View className="w-20 h-20 bg-gray-300 rounded-2xl items-center justify-center">
            <View className="w-8 h-8 bg-white rounded-full" />
            <View className="w-12 h-6 bg-white rounded-lg mt-1" />
          </View>
        </View>

        {/* Goal Title Input */}
        <View className="mb-6">
          <TextInput
            className="text-2xl font-medium text-gray-400 bg-transparent"
            placeholder="Add a Goals Title"
            placeholderTextColor="#9CA3AF"
            value={goalTitle}
            onChangeText={setGoalTitle}
          />
          
          {/* Goal metadata */}
          <View className="flex-row items-center mt-3 gap-4">
            <Text className="text-sm text-gray-500">Category</Text>
            <View className="flex-row items-center gap-1">
              <View className="w-4 h-4 border border-gray-400 rounded" />
              <Text className="text-sm text-gray-500">No due date</Text>
            </View>
            <View className="flex-row items-center gap-1">
              <View className="w-4 h-4 border border-gray-400 rounded-full" />
              <Text className="text-sm text-gray-500">Set reminder</Text>
            </View>
            <View className="w-4 h-4 border border-gray-400 rounded rotate-45" />
          </View>
        </View>

        {/* Habit Section */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-lg font-semibold text-foreground">Habit (0)</Text>
            <View className="w-5 h-5 border border-gray-400 rounded" />
          </View>
          <Button 
            className="bg-orange-50 border-2 border-dashed border-orange-200 py-6" 
            onPress={handleAddHabit} 
            variant={'ghost'}
          >
            <Text className="text-orange-500 font-medium">+ Add Habit</Text>
          </Button>
        </View>

        {/* Task Section */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-lg font-semibold text-foreground">Task (0)</Text>
            <View className="w-5 h-5 border border-gray-400 rounded" />
          </View>
          <Button 
            className="bg-orange-50 border-2 border-dashed border-orange-200 py-6" 
            onPress={handleAddTask} 
            variant={'ghost'}
          >
            <Text className="text-orange-500 font-medium">+ Add Task</Text>
          </Button>
        </View>

        {/* Note Section */}
        <View className="mb-8">
          <Text className="text-lg font-semibold text-foreground mb-3">Note</Text>
          <TextInput
            className="text-gray-400 text-base bg-transparent min-h-[100px]"
            placeholder="Add your note..."
            placeholderTextColor="#9CA3AF"
            value={note}
            onChangeText={setNote}
            multiline
            textAlignVertical="top"
          />
        </View>

        {/* Spacer to push button to bottom */}
        <View className="flex-1" />

        {/* Create Goals Button */}
        <View className="pb-6">
          <Button 
            className="w-full bg-orange-500 py-4 rounded-2xl" 
            onPress={handleCreateGoals}
          >
            <Text className="text-white font-semibold text-lg">Create Goals</Text>
          </Button>
        </View>
      </View>

      {/* Floating Action Button */}
      <View className="absolute bottom-24 right-4">
        <Button className="w-12 h-12 bg-orange-500 rounded-full items-center justify-center">
          <Text className="text-white text-xl">💬</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default AddGoal;

const styles = StyleSheet.create({});