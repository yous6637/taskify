import React from 'react'
import { View, TouchableOpacity } from 'react-native'
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
import { goalForm as goalSchema, getCategoryOptions, getCategoryByName } from '@/lib/formsSchema'
import { cn } from '@/lib/utils'
import { Ionicons } from '@expo/vector-icons'
import { useColorScheme } from 'nativewind'

type Props = {
  defaultValues?: Partial<z.infer<typeof goalSchema>>
  onSubmit?: (values: z.infer<typeof goalSchema>) => void
}

const GoalForm = ({ defaultValues, onSubmit }: Props) => {
  const { colorScheme } = useColorScheme()
  const categoryOptions = getCategoryOptions()

  const form = useForm({
    defaultValues: {
      title: '',
      due_date: new Date().toISOString(),
      category: 'personal' as const,
      reminder: '09:00',
      notes: '',
      ...defaultValues,
    },
    resolver: zodResolver(goalSchema),
    mode: 'onChange',
  })

  const handleSubmit = (values: z.infer<typeof goalSchema>) => {
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
              label='Goal Title' 
              placeholder='Become a UI/UX Designer' 
              {...field} 
            />
          )}
        />

        {/* Category Selector */}
        <FormField
          control={form.control}
          name='category'
          render={({ field: { value, onChange } }) => {
            const selectedCategory = getCategoryByName(value)
            
            return (
              <View className='gap-2'>
                <Text className='font-medium text-foreground'>Category</Text>
                <View className='flex-row flex-wrap gap-2'>
                  {categoryOptions.map((category) => {
                    const isSelected = value === category.value
                    return (
                      <TouchableOpacity
                        key={category.value}
                        onPress={() => onChange(category.value)}
                        className={cn(
                          'flex-row items-center gap-2 px-3 py-2 rounded-full border',
                          isSelected 
                            ? 'bg-primary border-primary' 
                            : 'bg-background border-border'
                        )}
                      >
                        <Ionicons 
                          name={category.icon as any} 
                          size={16} 
                          color={isSelected 
                            ? colorScheme === 'dark' ? '#000' : '#fff'
                            : colorScheme === 'dark' ? '#e5e7eb' : '#374151'
                          } 
                        />
                        <Text className={cn(
                          'text-sm font-medium',
                          isSelected ? 'text-primary-foreground' : 'text-foreground'
                        )}>
                          {category.label}
                        </Text>
                      </TouchableOpacity>
                    )
                  })}
                </View>
                {selectedCategory && (
                  <View className='flex-row items-center gap-2 mt-1'>
                    <View className={cn('w-3 h-3 rounded-full', selectedCategory.color)} />
                    <Text className='text-sm text-muted-foreground'>
                      Selected: {selectedCategory.label}
                    </Text>
                  </View>
                )}
              </View>
            )
          }}
        />

        {/* Due Date Picker */}
        <FormField
          control={form.control}
          name='due_date'
          render={({ field }) => (
            <FormDatePicker 
              label='Due Date' 
              placeholder='Select target date'
              {...field} 
            />
          )}
        />

        {/* Reminder Time Picker */}
        <FormField
          control={form.control}
          name='reminder'
          render={({ field }) => (
            <FormTimePicker 
              label='Daily Reminder' 
              placeholder='Set reminder time'
              {...field}
            />
          )}
        />

        {/* Notes Field */}
        <FormField
          control={form.control}
          name='notes'
          render={({ field }) => (
            <FormTextarea 
              label='Notes' 
              placeholder='Add any additional notes about your goal...' 
              {...field} 
            />
          )}
        />

        <Button className='w-full' onPress={form.handleSubmit(handleSubmit)}>
          <Text>Create Goal</Text>
        </Button>
      </View>
    </Form>
  )
}

export default GoalForm