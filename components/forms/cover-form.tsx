import React from 'react'
import { View, TouchableOpacity, Image, Dimensions, ImageSourcePropType, ImageURISource } from 'react-native'
import { Text } from '../ui/text'
import { Button } from '../ui/button'
import { Form, FormField } from '../ui/form'
import { zodResolver } from '@/lib/utils'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { cn } from '@/lib/utils'
import { COVERS, CoverEnum } from '@/lib/consts'
import { Ionicons } from '@expo/vector-icons'
import { useColorScheme } from 'nativewind'

// Create schema for cover selection
const coverSchema = z.object({
 
    uri: z.string().optional(),
    width: z.number().optional(),
    height: z.number().optional(),
  
})

type CoverFormType = z.infer<typeof coverSchema>

type Props = {
  defaultValues?: Partial<ImageURISource>
  onSubmit?: (values: ImageURISource) => void
  onCancel?: () => void
}

const { width: screenWidth } = Dimensions.get('window')
const cardWidth = (screenWidth - 48) / 2 // 2 columns with padding

const CoverForm = ({ defaultValues, onSubmit, onCancel }: Props) => {
  const { colorScheme } = useColorScheme()

  const form = useForm({
    defaultValues: {
      cover: 'personal' as const,
      ...defaultValues,
    },
    resolver: zodResolver(coverSchema),
    mode: 'onChange',
  })

  const handleSubmit = (values: CoverFormType) => {
    onSubmit?.(values)
  }

  const coverOptions = [
    { key: 'exercise', label: 'Exercise', description: 'Fitness & Health' },
    { key: 'travel', label: 'Travel', description: 'Adventure & Places' },
    { key: 'learnSkills', label: 'Learn Skills', description: 'Education & Growth' },
    { key: 'education', label: 'Education', description: 'Academic & Learning' },
    { key: 'personal', label: 'Personal', description: 'Self Development' },
    { key: 'creative', label: 'Creative', description: 'Art & Design' },
  ] as const

  return (
    <Form {...form}>
      <View className='gap-6'>
        <View className='gap-2'>
          <Text className='text-xl font-semibold text-foreground'>Choose Cover Image</Text>
          <Text className='text-sm text-muted-foreground'>
            Select a cover image that represents your goal
          </Text>
        </View>

        {/* Cover Selection Grid */}
        <FormField
          control={form.control}
          name='cover'
          render={({ field: { value, onChange } }) => (
            <View className='gap-4'>
              <View className='flex-row flex-wrap gap-3 justify-between'>
                {coverOptions.map((option) => {
                  const isSelected = value === option.key
                  const coverImage = COVERS[option.key]
                  
                  return (
                    <TouchableOpacity
                      key={option.key}
                      onPress={() => onChange(option.key)}
                      style={{ width: cardWidth }}
                      className={cn(
                        'relative rounded-2xl overflow-hidden border-2 transition-all',
                        isSelected 
                          ? 'border-primary shadow-lg' 
                          : 'border-border'
                      )}
                    >
                      {/* Cover Image */}
                      <View className='relative'>
                        <Image
                          source={coverImage}
                          className='w-full h-24 rounded-t-xl'
                          resizeMode='cover'
                        />
                        
                        {/* Selection Overlay */}
                        {isSelected && (
                          <View className='absolute inset-0 bg-primary/20 items-center justify-center'>
                            <View className='bg-primary rounded-full p-2'>
                              <Ionicons 
                                name="checkmark" 
                                size={16} 
                                color={colorScheme === 'dark' ? '#000' : '#fff'} 
                              />
                            </View>
                          </View>
                        )}
                      </View>

                      {/* Card Content */}
                      <View className={cn(
                        'p-3 bg-card',
                        isSelected && 'bg-primary/5'
                      )}>
                        <Text className={cn(
                          'font-semibold text-sm text-foreground mb-1',
                          isSelected && 'text-primary'
                        )}>
                          {option.label}
                        </Text>
                        <Text className='text-xs text-muted-foreground'>
                          {option.description}
                        </Text>
                      </View>

                      {/* Selection Border Glow */}
                      {isSelected && (
                        <View className='absolute inset-0 rounded-2xl border-2 border-primary shadow-primary/20' />
                      )}
                    </TouchableOpacity>
                  )
                })}
              </View>

              {/* Selected Cover Preview */}
              {value && (
                <View className='gap-2 mt-2'>
                  <Text className='text-sm font-medium text-foreground'>Selected Cover:</Text>
                  <View className='flex-row items-center gap-3 p-3 bg-muted/50 rounded-xl'>
                    <Image
                      source={COVERS[value]}
                      className='w-12 h-8 rounded-lg'
                      resizeMode='cover'
                    />
                    <View className='flex-1'>
                      <Text className='font-medium text-foreground'>
                        {coverOptions.find(opt => opt.key === value)?.label}
                      </Text>
                      <Text className='text-xs text-muted-foreground'>
                        {coverOptions.find(opt => opt.key === value)?.description}
                      </Text>
                    </View>
                    <Ionicons 
                      name="checkmark-circle" 
                      size={20} 
                      color={colorScheme === 'dark' ? '#10b981' : '#059669'} 
                    />
                  </View>
                </View>
              )}
            </View>
          )}
        />

        {/* Action Buttons */}
        <View className='flex-row gap-3'>
          {onCancel && (
            <Button 
              variant='outline' 
              className='flex-1' 
              onPress={onCancel}
            >
              <Text>Cancel</Text>
            </Button>
          )}
          <Button 
            className='flex-1' 
            onPress={form.handleSubmit(handleSubmit)}
          >
            <Text>Select Cover</Text>
          </Button>
        </View>
      </View>
    </Form>
  )
}

export default CoverForm
export type { CoverFormType }
