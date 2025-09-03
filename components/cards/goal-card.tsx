import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Card, CardContent } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { Ionicons } from '@expo/vector-icons';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const goalCardVariants = cva(
  'rounded-2xl shadow-sm',
  {
    variants: {
      variant: {
        default: 'bg-card',
        explore: 'bg-card',
        compact: 'bg-card',
      },
      size: {
        default: 'p-4',
        compact: 'p-3',
        large: 'p-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const illustrationVariants = cva(
  'rounded-2xl items-center justify-center mr-4',
  {
    variants: {
      variant: {
        gradient: 'bg-gradient-to-br',
        solid: 'bg-primary/10',
        image: 'overflow-hidden',
      },
      size: {
        default: 'w-20 h-20',
        compact: 'w-16 h-16',
        large: 'w-24 h-24',
      },
    },
    defaultVariants: {
      variant: 'solid',
      size: 'default',
    },
  }
);

interface GoalCardProps extends VariantProps<typeof goalCardVariants> {
  goal: {
    id: number | string;
    title: string;
    illustration?: string;
    image?: any;
    habits?: { completed: number; total: number };
    tasks?: { completed: number; total: number };
    daysLeft?: number | null;
    users?: string;
    backgroundColor?: string;
    category?: string;
  };
  onPress?: () => void;
  onAddPress?: () => void;
  showAddButton?: boolean;
  showProgress?: boolean;
  showUsers?: boolean;
  showDaysLeft?: boolean;
  className?: string;
}

export function GoalCard({
  goal,
  onPress,
  onAddPress,
  showAddButton = false,
  showProgress = true,
  showUsers = false,
  showDaysLeft = false,
  variant = 'default',
  size = 'default',
  className,
  ...props
}: GoalCardProps) {
  const CardWrapper = onPress ? TouchableOpacity : View;

  return (
    <CardWrapper
      className={cn(goalCardVariants({ variant, size }), className)}
      onPress={onPress}
      {...props}
    >
      <CardContent className="p-0">
        <View className="flex-row">
          {/* Illustration/Image */}
          <View className={illustrationVariants({ 
            variant: goal.image ? 'image' : 'solid',
            size 
          })}>
            {goal.image ? (
              <Image source={goal.image} className="w-full h-full" resizeMode="cover" />
            ) : (
              <Text className="text-2xl">{goal.illustration || '🎯'}</Text>
            )}
          </View>
          
          {/* Content */}
          <View className="flex-1">
            <View className="flex-row justify-between items-start mb-2">
              <Text className="text-lg font-semibold text-foreground flex-1 mr-2">
                {goal.title}
              </Text>
              {showAddButton && onAddPress && (
                <TouchableOpacity onPress={onAddPress}>
                  <Ionicons name="add" size={24} color="hsl(var(--primary))" />
                </TouchableOpacity>
              )}
            </View>
            
            {/* Progress badges */}
            {showProgress && (goal.habits || goal.tasks) && (
              <View className="flex-row mb-3 flex-wrap">
                {goal.habits && goal.habits.total > 0 && (
                  <View className="bg-orange-500/10 px-3 py-1 rounded-full mr-2 mb-1">
                    <Text className="text-orange-600 text-sm font-medium">
                      Habits {goal.habits.completed}/{goal.habits.total}
                    </Text>
                  </View>
                )}
                {goal.tasks && goal.tasks.total > 0 && (
                  <View className="bg-blue-500/10 px-3 py-1 rounded-full mb-1">
                    <Text className="text-blue-600 text-sm font-medium">
                      Tasks {goal.tasks.completed}/{goal.tasks.total}
                    </Text>
                  </View>
                )}
              </View>
            )}
            
            {/* Additional info */}
            <View className="flex-row items-center justify-between">
              {/* Users count */}
              {showUsers && goal.users && (
                <View className="flex-row items-center">
                  <Ionicons name="people-outline" size={16} color="hsl(var(--muted-foreground))" />
                  <Text className="text-muted-foreground text-sm ml-1">{goal.users}</Text>
                </View>
              )}
              
              {/* Days left */}
              {showDaysLeft && goal.daysLeft !== undefined && (
                <View className="flex-row items-center">
                  <Ionicons name="calendar-outline" size={16} color="hsl(var(--muted-foreground))" />
                  <Text className="text-muted-foreground text-sm ml-1">
                    {goal.daysLeft === null ? 'No deadline' : `${goal.daysLeft} days left`}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </CardContent>
    </CardWrapper>
  );
}

// Predefined configurations for different use cases
export const GoalCardConfigs = {
  explore: {
    variant: 'explore' as const,
    showAddButton: true,
    showUsers: true,
    showProgress: true,
  },
  
  myGoals: {
    variant: 'default' as const,
    showProgress: true,
    showDaysLeft: true,
  },
  
  compact: {
    variant: 'compact' as const,
    size: 'compact' as const,
    showProgress: false,
  },
} as const;
