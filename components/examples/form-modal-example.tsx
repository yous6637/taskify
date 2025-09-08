import React from 'react';
import { View } from 'react-native';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useModal } from '@/components/providers/modal-provider';
import HabitForm from '@/components/forms/habit-form';

export function FormModalExample() {
  const { showForm, confirmModal } = useModal();

  const handleShowHabitForm = async () => {
    try {
      const result = await showForm({
        title: 'Add New Habit',
        formComponent: HabitForm,
        confirmText: 'Create Habit',
        cancelText: 'Cancel',
      });
      
      console.log('Form submitted with data:', result);
      // Handle the form data here
    } catch (error) {
      console.log('Form was cancelled');
    }
  };

  const handleShowConfirmationModal = async () => {
    const confirmed = await confirmModal({
      title: 'Delete Habit',
      description: 'Are you sure you want to delete this habit? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel',
    });

    if (confirmed) {
      console.log('User confirmed deletion');
      // Handle deletion here
    } else {
      console.log('User cancelled deletion');
    }
  };

  return (
    <View className="p-4 gap-4">
      <Text className="text-xl font-bold mb-4">Form Modal Examples</Text>
      
      <Button onPress={handleShowHabitForm} className="w-full">
        <Text>Show Habit Form (Bottom Sheet)</Text>
      </Button>
      
      <Button onPress={handleShowConfirmationModal} variant="destructive" className="w-full">
        <Text>Show Confirmation Modal</Text>
      </Button>
    </View>
  );
}
