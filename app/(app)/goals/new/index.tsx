import { SafeAreaView, StyleSheet, View } from 'react-native';
import React from 'react';
import { Header, HeaderConfigs } from '@/components/ui/header';
import { Button, buttonTextVariants } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import HabitForm from '@/components/forms/habit-form';
import { useModal } from '@/components/providers/modal-provider';
type Props = {};

const AddGoal = (props: Props) => {
  const { showForm } = useModal();

  const handleAddHabit = () => {
    showForm({
      title: 'Add Habit',
      formComponent: HabitForm,
      side: 'bottom',
      align: 'center',
      alignOffset: 0,
      sideOffset: 0,
    });
  };
  return (
    <SafeAreaView className="native:pt-10 mb-0 h-screen flex-1 pb-0">
      <Header {...HeaderConfigs.imageBackground('Self-made Goals')} />

      <Text variant={'h3'}>Habits (0)</Text>
      <Button className="bg-orange-500/5" onPress={handleAddHabit} variant={'secondary'}>
        <Text className={buttonTextVariants({ variant: 'secondary' })}>Add Habit</Text>
      </Button>
      <Text variant={'h3'}>Tasks (0)</Text>
      <Button className="bg-orange-500/5" variant={'secondary'}>
        <Text className={buttonTextVariants({ variant: 'secondary' })}>Add Task</Text>
      </Button>
    </SafeAreaView>
  );
};

export default AddGoal;

const styles = StyleSheet.create({});
