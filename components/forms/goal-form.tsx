import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Text } from '../ui/text'
import { Button } from '../ui/button'
import { Form, FormDateTimePicker, FormField, FormSelect } from '../ui/form'
import { FormInput } from '../ui/form/form-input'
import { FormTextarea } from '../ui/form/form-textarea'
import { FormDatePicker } from '../ui/form/form-date-picker'
import { zodResolver } from '@/lib/utils'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { goalForm as goalSchema, getCategoryOptions, getCategoryByName } from '@/lib/formsSchema'
import { cn } from '@/lib/utils'
import { Ionicons } from '@expo/vector-icons'
import { useColorScheme } from 'nativewind'
import { Option } from '@rn-primitives/select'
import { SelectContent, SelectItem, SelectTrigger } from '../ui/select'

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
          render={({ field: { value, onChange, onBlur } }) => {
            const selectedCategory = getCategoryByName(value)

            return (
              <FormSelect  value={{ value }} onBlur={onBlur} onChange={(opt) => onChange(opt?.value)} name={'category'}>
                <SelectTrigger>
                 <Text> {selectedCategory?.label}</Text>
                </SelectTrigger>
                 
                <SelectContent>
                  {categoryOptions.map((option) => (
                    <SelectItem
                      key={option.value}
                      label={option.label}
                      value={option.value}
                      className={cn( 'flex-row items-center')}
                      />))}
                </SelectContent>
              </FormSelect>
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
            <FormDateTimePicker
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

        <Button className='w-full' onPress={form.handleSubmit(handleSubmit, console.error)}>
          <Text>Create Goal</Text>
        </Button>
      </View>
    </Form>
  )
}

export default GoalForm