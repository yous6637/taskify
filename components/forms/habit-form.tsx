import React from 'react'
import { View } from 'react-native'
import { Text } from '../ui/text'
import { Button } from '../ui/button'
import { Form, FormField } from '../ui/form'
import { FormInput } from '../ui/form/form-input'
import { FormTextarea } from '../ui/form/form-textarea'
import { FormTimePicker } from '../ui/form/form-time-picker'
import { FormSwitch } from '../ui/form/form-switch'
import { zodResolver } from '@/lib/utils'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { habitForm as habitSchema } from '@/lib/formsSchema'
import { cn } from '@/lib/utils'

type Props = {
  defaultValues?: Partial<z.infer<typeof habitSchema>> & { note?: string }
  onSubmit?: (values: z.infer<typeof habitSchema> & { note?: string }) => void
}

const HabitForm = ({ defaultValues, onSubmit }: Props) => {
  // Extend schema with optional note (UI shows a Note field)

  const form = useForm({
    defaultValues: {
      title: '',
      repeat_days: [],
      reminder: new Date().toISOString(),
      isPaused: false,
      note: '',
      ...defaultValues,
    },
    resolver: zodResolver(habitSchema),
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
            <FormInput label='Habit Title' placeholder='Make UI/UX design portfolio' {...field} />
          )}
        />

        {/* Repeat Days selector */}
        <FormField
          control={form.control}
          name='repeat_days'
          render={({ field: { value = [], onChange } }) => {
            const days = [
              { key: 'monday', label: 'M' },
              { key: 'tuesday', label: 'T' },
              { key: 'wednesday', label: 'W' },
              { key: 'thursday', label: 'T' },
              { key: 'friday', label: 'F' },
              { key: 'saturday', label: 'S' },
              { key: 'sunday', label: 'S' },
            ] as const

            const toggle = (day: string) => {
              const set = new Set(value as string[])
              set.has(day) ? set.delete(day) : set.add(day)
              onChange(Array.from(set))
            }

            return (
              <View className='gap-2'>
                <Text className='font-medium'>Repeat Days</Text>
                <View className='flex-row gap-2 flex-wrap'>
                  {days.map((d) => {
                    const active = (value as string[]).includes(d.key)
                    return (
                      <Button
                        key={d.key}
                        variant={active ? 'default' : 'outline'}
                        className={cn('w-10 h-10 rounded-full p-0 items-center justify-center')}
                        onPress={() => toggle(d.key)}
                      >
                        <Text className={cn('text-sm', !active && 'text-foreground')}>{d.label}</Text>
                      </Button>
                    )
                  })}
                </View>
              </View>
            )
          }}
        />

        {/* <FormField
          control={form.control}
          name='reminder'
          render={({ field }) => (
            <FormTimePicker label='Habit Reminder' {...field}>
              <></>
            </FormTimePicker>
          )}
        /> */}

        <FormField
          control={form.control}
          name='note'
          render={({ field }) => (
            <FormTextarea label='Note' placeholder='Create portfolio for Dribbble & Behance' {...field} />
          )}
        />

        <FormField
          control={form.control}
          name='isPaused'
          render={({ field }) => (
            <FormSwitch label='Pause Habit' description="Short breaks habit, start when you're ready" {...field} />
          )}
        />

        <Button className='w-full' onPress={form.handleSubmit(handleSubmit)}>
          <Text>Save</Text>
        </Button>
      </View>
    </Form>
  )
}

export default HabitForm