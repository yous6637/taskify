import { SafeAreaView, StyleSheet, View } from 'react-native'
import React from 'react'
import { Header, HeaderConfigs } from '@/components/ui/header'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { useDialog } from '@/components/providers/dialog-provider'
import HabitForm from '@/components/forms/habit-form'
type Props = {}

const AddGoal = (props: Props) => {
    const { showForm } = useDialog();

    const handleAddHabit = () => {
        showForm({
            title: 'Add Habit',
            formComponent: HabitForm,
        })
    }
  return (
    <SafeAreaView className="flex-1 h-screen native:pt-10 pb-0 mb-0">
        <Header {...HeaderConfigs.imageBackground("Self-made Goals")} />





        <Text variant={"h3"}>
            Habits (0)
        </Text>
        <Button onPress={handleAddHabit} variant={"secondary"}>
            Add Habit
        </Button>
        <Text variant={"h3"}>
            Tasks (0)
        </Text>
        <Button variant={"secondary"}>
            Add Task
        </Button>

    </SafeAreaView>
  )
}

export default AddGoal

const styles = StyleSheet.create({})