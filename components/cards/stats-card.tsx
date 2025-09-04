import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { Ionicons } from '@expo/vector-icons';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const statsCardVariants = cva(
  'rounded-2xl shadow-sm',
  {
    variants: {
      variant: {
        default: 'bg-card',
        progress: 'bg-card',
        metric: 'bg-card',
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

interface StatsCardProps extends VariantProps<typeof statsCardVariants> {
  title?: string;
  value?: string | number;
  subtitle?: string;
  icon?: string;
  iconColor?: string;
  progress?: {
    current: number;
    total: number;
    label?: string;
  };
  metrics?: {
    habits?: number;
    tasks?: number;
    completed?: number;
    total?: number;
  };
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
    label?: string;
  };
  onPress?: () => void;
  className?: string;
  children?: React.ReactNode;
}

function getProgressColor(percentage: number) {
  if (percentage >= 80) return 'bg-green-500';
  if (percentage >= 60) return 'bg-blue-500';
  if (percentage >= 40) return 'bg-yellow-500';
  return 'bg-orange-500';
}

function getTrendIcon(direction: 'up' | 'down' | 'neutral') {
  switch (direction) {
    case 'up': return 'trending-up';
    case 'down': return 'trending-down';
    default: return 'remove';
  }
}

function getTrendColor(direction: 'up' | 'down' | 'neutral') {
  switch (direction) {
    case 'up': return 'text-green-500';
    case 'down': return 'text-red-500';
    default: return 'text-muted-foreground';
  }
}

export function StatsCard({
  title,
  value,
  subtitle,
  icon,
  iconColor = 'hsl(var(--primary))',
  progress,
  metrics,
  trend,
  onPress,
  variant = 'default',
  size = 'default',
  className,
  children,
  ...props
}: StatsCardProps) {
  const CardWrapper = onPress ? TouchableOpacity : View;

  // Progress variant
  if (variant === 'progress' && progress) {
    const percentage = (progress.current / progress.total) * 100;
    
    return (
      <CardWrapper
        className={cn(statsCardVariants({ variant, size }), className)}
        onPress={onPress}
        {...props}
      >
        <CardContent className="p-0">
          {title && (
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-muted-foreground text-sm">{title}</Text>
              <Text className="text-muted-foreground text-sm">
                {progress.current} / {progress.total}
              </Text>
            </View>
          )}
          
          {/* Progress bar */}
          <View className="w-full bg-muted rounded-full h-2 mb-2">
            <View 
              className={cn('h-2 rounded-full', getProgressColor(90))}
              style={{ width: `${Math.min(90, 100)}%` }}
            />
          </View>
          
          {progress.label && (
            <Text className="text-muted-foreground text-sm">{progress.label}</Text>
          )}
        </CardContent>
      </CardWrapper>
    );
  }

  // Metric variant with habits/tasks breakdown
  if (variant === 'metric' && metrics) {
    return (
      <CardWrapper
        className={cn(statsCardVariants({ variant, size }), className)}
        onPress={onPress}
        {...props}
      >
        <CardContent className="p-0">
          {title && (
            <Text className="text-muted-foreground text-sm mb-3">{title}</Text>
          )}
          
          <View className="flex-row items-center justify-between">
            <Text className="text-muted-foreground">
              Today you have{' '}
              {metrics.habits !== undefined && (
                <>
                  <Text className="text-orange-500 font-semibold">{metrics.habits} habits</Text>
                  {metrics.tasks !== undefined && ', '}
                </>
              )}
              {metrics.tasks !== undefined && (
                <Text className="text-blue-500 font-semibold">{metrics.tasks} tasks</Text>
              )}
            </Text>
            {metrics.completed !== undefined && metrics.total !== undefined && (
              <Text className="text-muted-foreground">
                {metrics.completed} / {metrics.total}
              </Text>
            )}
          </View>
        </CardContent>
      </CardWrapper>
    );
  }

  // Default variant
  return (
    <CardWrapper
      className={cn(statsCardVariants({ variant, size }), className)}
      onPress={onPress}
      {...props}
    >
      <CardContent className="p-0">
        <View className="flex-row items-start justify-between">
          <View className="flex-1">
            {title && (
              <Text className="text-muted-foreground text-sm mb-1">{title}</Text>
            )}
            
            {value !== undefined && (
              <Text className="text-2xl font-bold text-foreground mb-1">
                {value}
              </Text>
            )}
            
            {subtitle && (
              <Text className="text-muted-foreground text-sm">{subtitle}</Text>
            )}
            
            {/* Trend indicator */}
            {trend && (
              <View className="flex-row items-center mt-2">
                <Ionicons 
                  name={getTrendIcon(trend.direction) as any}
                  size={16}
                  color={getTrendColor(trend.direction)}
                />
                <Text className={cn('text-sm ml-1', getTrendColor(trend.direction))}>
                  {trend.value}%
                </Text>
                {trend.label && (
                  <Text className="text-muted-foreground text-sm ml-1">
                    {trend.label}
                  </Text>
                )}
              </View>
            )}
          </View>
          
          {/* Icon */}
          {icon && (
            <View className="ml-4">
              <Ionicons name={icon as any} size={24} color={iconColor} />
            </View>
          )}
        </View>
        
        {children}
      </CardContent>
    </CardWrapper>
  );
}

// Predefined configurations for different use cases
export const StatsCardConfigs = {
  progress: {
    variant: 'progress' as const,
  },
  
  metric: {
    variant: 'metric' as const,
  },
  
  simple: {
    variant: 'default' as const,
  },
  
  compact: {
    variant: 'compact' as const,
    size: 'compact' as const,
  },
  
  withTrend: {
    variant: 'default' as const,
  },
} as const;
