import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Card, CardContent } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { Ionicons } from '@expo/vector-icons';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const taskCardVariants = cva(
  'rounded-2xl shadow-sm',
  {
    variants: {
      variant: {
        default: 'bg-card',
        compact: 'bg-card',
        inline: 'bg-transparent',
      },
      size: {
        default: 'p-4',
        compact: 'p-3',
        large: 'p-6',
      },
      state: {
        default: 'opacity-100',
        completed: 'opacity-75',
        overdue: 'opacity-100',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      state: 'default',
    },
  }
);

interface TaskCardProps extends VariantProps<typeof taskCardVariants> {
  task: {
    id: number | string;
    title: string;
    time?: string;
    reminder?: string;
    dueDate?: string;
    note?: string;
    completed?: boolean;
    priority?: 'low' | 'medium' | 'high';
    category?: string;
    color?: string;
  };
  onPress?: () => void;
  onToggle?: () => void;
  onDelete?: () => void;
  showToggle?: boolean;
  showTime?: boolean;
  showCategory?: boolean;
  showPriority?: boolean;
  showColorIndicator?: boolean;
  className?: string;
}

function formatTime(iso?: string) {
  if (!iso) return '';
  try {
    const d = new Date(iso);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch {
    return iso; // Return as-is if it's already formatted
  }
}

function getPriorityColor(priority?: string) {
  switch (priority) {
    case 'high': return 'text-red-500';
    case 'medium': return 'text-yellow-500';
    case 'low': return 'text-green-500';
    default: return 'text-muted-foreground';
  }
}

function getPriorityIcon(priority?: string) {
  switch (priority) {
    case 'high': return 'alert-circle';
    case 'medium': return 'alert-triangle';
    case 'low': return 'info';
    default: return 'circle';
  }
}

export function TaskCard({
  task,
  onPress,
  onToggle,
  onDelete,
  showToggle = true,
  showTime = true,
  showCategory = false,
  showPriority = false,
  showColorIndicator = false,
  variant = 'default',
  size = 'default',
  className,
  ...props
}: TaskCardProps) {
  const CardWrapper = onPress ? TouchableOpacity : View;
  const isCompleted = task.completed || false;

  return (
    <CardWrapper
      className={cn(
        taskCardVariants({ 
          variant, 
          size, 
          state: isCompleted ? 'completed' : 'default' 
        }), 
        className
      )}
      onPress={onPress}
      {...props}
    >
      <CardContent className={cn('p-0', variant === 'inline' && 'px-0')}>
        <View className="flex-row items-center">
          {/* Color indicator */}
          {showColorIndicator && task.color && (
            <View className={cn('w-1 h-12 rounded-full mr-3', task.color)} />
          )}
          
          {/* Checkbox */}
          {showToggle && onToggle && (
            <TouchableOpacity 
              onPress={onToggle}
              className="mr-3"
            >
              <View className={cn(
                'w-6 h-6 rounded-full border-2 items-center justify-center',
                isCompleted 
                  ? 'bg-green-500 border-green-500' 
                  : 'border-muted-foreground'
              )}>
                {isCompleted && (
                  <Ionicons name="checkmark" size={14} color="white" />
                )}
              </View>
            </TouchableOpacity>
          )}
          
          {/* Task content */}
          <View className="flex-1">
            <Text className={cn(
              'text-foreground font-medium',
              isCompleted && 'line-through text-muted-foreground'
            )}>
              {task.title}
            </Text>
            
            {/* Additional info */}
            <View className="flex-row items-center flex-wrap mt-1">
              {showTime && (task.time || task.reminder) && (
                <View className="flex-row items-center mr-4 mb-1">
                  <Ionicons name="time-outline" size={14} color="hsl(var(--muted-foreground))" />
                  <Text className="text-muted-foreground text-sm ml-1">
                    {formatTime(task.time || task.reminder)}
                  </Text>
                </View>
              )}
              
              {showCategory && task.category && (
                <View className="flex-row items-center mr-4 mb-1">
                  <Ionicons name="folder-outline" size={14} color="hsl(var(--muted-foreground))" />
                  <Text className="text-muted-foreground text-sm ml-1">
                    {task.category}
                  </Text>
                </View>
              )}
              
              {showPriority && task.priority && (
                <View className="flex-row items-center mb-1">
                  <Ionicons 
                    name={getPriorityIcon(task.priority) as any} 
                    size={14} 
                    color={`hsl(var(--${task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'warning' : 'success'}))`}
                  />
                  <Text className={cn('text-sm ml-1 capitalize', getPriorityColor(task.priority))}>
                    {task.priority}
                  </Text>
                </View>
              )}
            </View>
            
            {/* Note */}
            {task.note && (
              <Text className="text-muted-foreground text-sm mt-1" numberOfLines={2}>
                {task.note}
              </Text>
            )}
          </View>
          
          {/* Delete button */}
          {onDelete && (
            <TouchableOpacity onPress={onDelete} className="p-2 ml-2">
              <Ionicons name="trash-outline" size={18} color="hsl(var(--destructive))" />
            </TouchableOpacity>
          )}
        </View>
      </CardContent>
    </CardWrapper>
  );
}

// Predefined configurations for different use cases
export const TaskCardConfigs = {
  simple: {
    variant: 'default' as const,
    showToggle: true,
    showTime: true,
    showCategory: false,
    showPriority: false,
    showColorIndicator: false,
  },
  
  detailed: {
    variant: 'default' as const,
    showToggle: true,
    showTime: true,
    showCategory: true,
    showPriority: true,
    showColorIndicator: false,
  },
  
  compact: {
    variant: 'compact' as const,
    size: 'compact' as const,
    showToggle: true,
    showTime: false,
    showCategory: false,
    showPriority: false,
    showColorIndicator: false,
  },
  
  inline: {
    variant: 'inline' as const,
    showToggle: true,
    showTime: true,
    showCategory: false,
    showPriority: false,
    showColorIndicator: true,
  },
} as const;
