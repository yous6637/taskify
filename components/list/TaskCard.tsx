import * as React from 'react'
import type { TaskFormType } from '@/lib/dataTypes'
import { TaskCard as NewTaskCard, TaskCardConfigs } from '@/components/cards/task-card'

export default function TaskCard({ task, onPress, onToggle }: { 
  task: TaskFormType;
  onPress?: () => void;
  onToggle?: () => void;
}) {
  return (
    <NewTaskCard
      {...TaskCardConfigs.simple}
      task={{
        id: task.title, // Using title as id since Task interface doesn't have id
        title: task.title,
        reminder: task.reminder,
        dueDate: task.dueDate,
        note: task.note,
        completed: false, // This would come from app state
      }}
      onPress={onPress}
      onToggle={onToggle}
    />
  )
}


