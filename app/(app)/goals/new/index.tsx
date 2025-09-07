import { SafeAreaView, StyleSheet, View, TextInput, Image, ImageSourcePropType, ImageURISource, Touchable, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Header, HeaderConfigs } from '@/components/ui/header';
import { Button, buttonTextVariants } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import HabitForm from '@/components/forms/habit-form';
import { useModal } from '@/components/providers/modal-provider';
import TaskForm from '@/components/forms/task-form';
import { cn } from '@/lib/utils';
import { GoalFormType, HabitFormType, TaskFormType } from '@/lib/dataTypes';
import CoverForm from '@/components/forms/cover-form';
import GoalForm from '@/components/forms/goal-form';
import { Input } from '@/components/ui/input';

type Props = {};

const AddGoal = (props: Props) => {
  const { showForm: showHabitForm } = useModal<HabitFormType>();
  const { showForm: showTaskForm } = useModal<TaskFormType>();
  const { showForm: showCoverForm } = useModal<ImageURISource>();
  const { showForm: showGoalForm } = useModal<GoalFormType>();
  const [goalTitle, setGoalTitle] = useState('');
  const [note, setNote] = useState('');

  const handleSelectCover = async () => {
    const result = await showCoverForm({
      title: 'Select Cover',
      formComponent: CoverForm,
      modal: "fullScreen",
      size: "full",
    });
    console.log("cover form result", result)
  }

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

  const handleCreateGoals = async () => {
    console.log("Create goals with:", { goalTitle, note });

    const result = await showGoalForm({
      title: 'Create Goal',
      formComponent: GoalForm,
      sheet: "bottom",
      size: "md",
    });
    console.log("goal form result", result)
  };

  return (
    <SafeAreaView className="native:pt-10 mb-0 h-screen flex-1 pb-0">
      <Header {...HeaderConfigs.imageBackground('Self-made Goals')} />

      <View className="flex-1 px-4 pt-6">
        {/* Goal Image Placeholder */}
        <TouchableOpacity onPress={handleSelectCover} className="items-center mb-8">
          <View className="w-20 h-20 bg-muted rounded-2xl items-center justify-center">
            <View className="w-8 h-8 bg-background rounded-full" />
            <View className="w-12 h-6 bg-background rounded-lg mt-1" />
          </View>
        </TouchableOpacity>

        {/* Goal Title Input */}
        <View className="mb-6">
          <TouchableOpacity onPress={handleCreateGoals}
          >

            <Input
              className="text-2xl font-medium  bg-transparent"
              placeholder="Add a Goals Title"
              placeholderTextColor="hsl(var(--muted-foreground))"
              value={goalTitle}
              onChangeText={setGoalTitle}
              onFocus={handleCreateGoals}
              onPress={handleCreateGoals}
            />
          </TouchableOpacity>

          {/* Goal metadata */}
          <View className="flex-row items-center mt-3 gap-4">
            <Text className="text-sm text-muted-foreground">Category</Text>
            <View className="flex-row items-center gap-1">
              <View className="w-4 h-4 border border-border rounded" />
              <Text className="text-sm text-muted-foreground">No due date</Text>
            </View>
            <View className="flex-row items-center gap-1">
              <View className="w-4 h-4 border border-border rounded-full" />
              <Text className="text-sm text-muted-foreground">Set reminder</Text>
            </View>
            <View className="w-4 h-4 border border-border rounded rotate-45" />
          </View>
        </View>

        {/* Habit Section */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-lg font-semibold text-foreground">Habit (0)</Text>
            <View className="w-5 h-5 border border-border rounded" />
          </View>
          <Button
            className="bg-secondary/30 border-2 border-dashed border-secondary py-6"
            onPress={handleAddHabit}
            variant={'ghost'}
          >
            <Text className="text-primary font-medium">+ Add Habit</Text>
          </Button>
        </View>

        {/* Task Section */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-lg font-semibold text-foreground">Task (0)</Text>
            <View className="w-5 h-5 border border-border rounded" />
          </View>
          <Button
            className="bg-secondary/30 border-2 border-dashed border-secondary py-6"
            onPress={handleAddTask}
            variant={'ghost'}
          >
            <Text className="text-primary font-medium">+ Add Task</Text>
          </Button>
        </View>

        {/* Note Section */}
        <View className="mb-8">
          <Text className="text-lg font-semibold text-foreground mb-3">Note</Text>
          <TextInput
            className="text-muted-foreground text-base bg-transparent min-h-[100px]"
            placeholder="Add your note..."
            placeholderTextColor="hsl(var(--muted-foreground))"
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
            className="w-full bg-primary py-4 rounded-2xl"
            onPress={handleCreateGoals}
          >
            <Text className="text-primary-foreground font-semibold text-lg">Create Goals</Text>
          </Button>
        </View>
      </View>

      {/* Floating Action Button */}
      <View className="absolute bottom-24 right-4">
        <Button className="w-12 h-12 bg-primary rounded-full items-center justify-center">
          <Text className="text-primary-foreground text-xl">💬</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default AddGoal;

const styles = StyleSheet.create({});