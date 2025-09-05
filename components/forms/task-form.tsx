import React from 'react'
import { View } from 'react-native'
import { Text } from '../ui/text'
import { Button } from '../ui/button'
import { Form, FormField } from '../ui/form'
import { FormInput } from '../ui/form/form-input'
import { FormTextarea } from '../ui/form/form-textarea'
import { FormDatePicker } from '../ui/form/form-date-picker'
import { FormTimePicker } from '../ui/form/form-time-picker'
import { zodResolver } from '@/lib/utils'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { taskForm as taskSchema } from '@/lib/formsSchema'

type Props = {
  defaultValues?: Partial<z.infer<typeof taskSchema>> & { note?: string }
  onSubmit?: (values: z.infer<typeof taskSchema> & { note?: string }) => void
}

const TaskForm = ({ defaultValues, onSubmit }: Props) => {
  const form = useForm({
    defaultValues: {
      title: '',
      dueDate: new Date().toISOString(),
      reminder: new Date().toISOString(),
      note: '',
      ...defaultValues,
    },
    resolver: zodResolver(taskSchema),
    mode: 'onChange',
  })

  const handleSubmit = (values: any) => {
    onSubmit?.(values)
  }

  return (
    <Form {...form}>
      <View className='gap-6'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormInput 
              label='Task Title' 
              placeholder='Explore design style on Dribbble' 
              {...field} 
            />
          )}
        />

        <FormField
          control={form.control}
          name='dueDate'
          render={({ field }) => (
            <FormDatePicker 
              label='Task Due Date' 
              placeholder='January 31, 2025'
              {...field} 
            />
          )}
        />

        <FormField
          control={form.control}
          name='reminder'
          render={({ field }) => (
            <FormTimePicker 
              label='Task Reminder' 
              placeholder='21:00 PM'
              {...field} 
            />
          )}
        />

        <FormField
          control={form.control}
          name='note'
          render={({ field }) => (
            <FormTextarea 
              label='Note' 
              placeholder='Explore style & build my own niche' 
              {...field} 
            />
          )}
        />

        <Button className='w-full' onPress={form.handleSubmit(handleSubmit)}>
          <Text>Add Task</Text>
        </Button>
      </View>
    </Form>
  )
}

export default TaskForm