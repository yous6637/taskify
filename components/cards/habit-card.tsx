import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Card, CardContent } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { Ionicons } from '@expo/vector-icons';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const habitCardVariants = cva(
  'rounded-2xl shadow-sm',
  {
    variants: {
      variant: {
        default: 'bg-card',
        compact: 'bg-card',
        detailed: 'bg-card',
      },
      size: {
        default: 'p-4',
        compact: 'p-3',
        large: 'p-6',
      },
      state: {
        default: 'opacity-100',
        deleted: 'opacity-50',
        completed: 'opacity-100',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      state: 'default',
    },
  }
);

interface HabitCardProps extends VariantProps<typeof habitCardVariants> {
  habit: {
    id: number | string;
    title: string;
    reminder?: string;
    frequency?: string;
    completed?: boolean[];
    streak?: number;
    isCompleted?: boolean;
  };
  onPress?: () => void;
  onDelete?: () => void;
  onToggle?: () => void;
  showProgress?: boolean;
  showDelete?: boolean;
  showToggle?: boolean;
  isDeleted?: boolean;
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

export function HabitCard({
  habit,
  onPress,
  onDelete,
  onToggle,
  showProgress = false,
  showDelete = false,
  showToggle = true,
  isDeleted = false,
  variant = 'default',
  size = 'default',
  className,
  ...props
}: HabitCardProps) {
  const CardWrapper = onPress ? TouchableOpacity : View;
  const completedCount = habit.completed?.filter(Boolean).length || 0;

  return (
    <CardWrapper
      className={cn(
        habitCardVariants({ 
          variant, 
          size, 
          state: isDeleted ? 'deleted' : 'default' 
        }), 
        className
      )}
      onPress={onPress}
      {...props}
    >
      <CardContent className="p-0">
        <View className="flex-row items-start justify-between mb-3">
          <View className="flex-1">
            <Text className={cn(
              'text-lg font-semibold text-foreground mb-1',
              isDeleted && 'line-through'
            )}>
              {habit.title}
            </Text>
            
            {/* Time and frequency info */}
            <View className="flex-row items-center flex-wrap">
              {habit.reminder && (
                <View className="flex-row items-center mr-4 mb-1">
                  <Ionicons name="time-outline" size={16} color="hsl(var(--muted-foreground))" />
                  <Text className="text-muted-foreground text-sm ml-1">
                    {formatTime(habit.reminder)}
                  </Text>
                </View>
              )}
              {habit.frequency && (
                <View className="flex-row items-center mb-1">
                  <Ionicons name="repeat-outline" size={16} color="hsl(var(--muted-foreground))" />
                  <Text className="text-muted-foreground text-sm ml-1">
                    {habit.frequency}
                  </Text>
                </View>
              )}
            </View>
          </View>
          
          {/* Action buttons */}
          <View className="flex-row items-center">
            {showToggle && onToggle && (
              <TouchableOpacity 
                onPress={onToggle}
                className="p-2 mr-1"
              >
                <View className={cn(
                  'w-6 h-6 rounded-full border-2 items-center justify-center',
                  habit.isCompleted 
                    ? 'bg-green-500 border-green-500' 
                    : 'border-muted-foreground'
                )}>
                  {habit.isCompleted && (
                    <Ionicons name="checkmark" size={14} color="white" />
                  )}
                </View>
              </TouchableOpacity>
            )}
            
            {showDelete && onDelete && (
              <TouchableOpacity onPress={onDelete} className="p-2">
                <Ionicons name="trash-outline" size={20} color="hsl(var(--destructive))" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Weekly progress (for detailed variant) */}
        {showProgress && habit.completed && variant === 'detailed' && (
          <>
            <View className="flex-row justify-between mb-3">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
                <View key={index} className="items-center">
                  <Text className="text-xs text-muted-foreground mb-1">{day}</Text>
                  <View
                    className={cn(
                      'w-8 h-8 rounded-full items-center justify-center',
                      habit?.completed?.[index]
                        ? 'bg-primary'
                        : index <= 2 
                          ? 'bg-muted' 
                          : 'bg-muted/50'
                    )}
                  >
                    {habit?.completed?.[index] && (
                      <Ionicons name="checkmark" size={16} color="white" />
                    )}
                    {!habit?.completed?.[index] && index <= 2 && (
                      <Text className="text-muted-foreground text-xs">{index + 1}</Text>
                    )}
                  </View>
                </View>
              ))}
            </View>

            {/* Progress info */}
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Ionicons name="flame-outline" size={16} color="hsl(var(--primary))" />
                <Text className="text-primary text-sm ml-1 font-medium">
                  {habit.streak || completedCount} day streak
                </Text>
              </View>
              <Text className="text-muted-foreground text-sm">
                {completedCount}/7 completed
              </Text>
            </View>
          </>
        )}

        {/* Simple progress for default variant */}
        {showProgress && habit.completed && variant === 'default' && (
          <View className="flex-row items-center justify-between mt-2">
            <View className="flex-row items-center">
              <Ionicons name="checkmark-circle-outline" size={16} color="hsl(var(--primary))" />
              <Text className="text-primary text-sm ml-1 font-medium">
                {completedCount} completed this week
              </Text>
            </View>
          </View>
        )}
      </CardContent>
    </CardWrapper>
  );
}

// Predefined configurations for different use cases
export const HabitCardConfigs = {
  simple: {
    variant: 'default' as const,
    showProgress: false,
    showDelete: false,
    showToggle: true,
  },
  
  detailed: {
    variant: 'detailed' as const,
    showProgress: true,
    showDelete: true,
    showToggle: false,
  },
  
  compact: {
    variant: 'compact' as const,
    size: 'compact' as const,
    showProgress: false,
    showDelete: false,
    showToggle: true,
  },
  
  manageable: {
    variant: 'default' as const,
    showProgress: true,
    showDelete: true,
    showToggle: true,
  },
} as const;
