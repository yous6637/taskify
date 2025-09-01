import * as React from 'react'
import { View } from 'react-native'
import { Card, CardContent } from '@/components/ui/card'
import { Text } from '@/components/ui/text'
import type { Task } from '@/lib/dataTypes'
import { Icon } from '@/components/ui/icon'
import { CircleIcon, ClockIcon } from 'lucide-react-native'

function formatTime(iso?: string) {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export default function TaskCard({ task }: { task: Task }) {
  return (
    <Card className='shadow-none border-border/50'>
      <CardContent className='py-4'>
        <View className='flex-row items-start gap-3'>
          <Icon as={CircleIcon} className='text-muted-foreground mt-0.5' />
          <View className='flex-1 gap-1'>
            <Text className='font-medium'>{task.title}</Text>
            <View className='flex-row items-center gap-2'>
              <Icon as={ClockIcon} className='text-muted-foreground' size={16} />
              <Text className='text-xs text-muted-foreground'>{formatTime(task.reminder)}</Text>
            </View>
          </View>
        </View>
      </CardContent>
    </Card>
  )
}


