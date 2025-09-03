import * as React from 'react'
import type { Habit } from '@/lib/dataTypes'
import { HabitCard as NewHabitCard, HabitCardConfigs } from '@/components/cards/habit-card'

export default function HabitCard({ habit, onPress, onToggle }: { 
  habit: Habit;
  onPress?: () => void;
  onToggle?: () => void;
}) {
  return (
    <NewHabitCard
      {...HabitCardConfigs.simple}
      habit={{
        id: habit.title, // Using title as id since Habit interface doesn't have id
        title: habit.title,
        reminder: habit.reminder,
        frequency: habit.repeat_days.join(', '),
        isCompleted: false, // This would come from app state
      }}
      onPress={onPress}
      onToggle={onToggle}
    />
  )
}


