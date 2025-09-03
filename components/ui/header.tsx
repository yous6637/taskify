import React, { ReactNode } from 'react';
import { View, TouchableOpacity, ImageBackground, TextInput } from 'react-native';
import { Text } from '@/components/ui/text';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const headerVariants = cva(
  // Base classes
  'px-4 py-2 bg-white',
  {
    variants: {
      variant: {
        default: 'flex-row justify-between items-center',
        withBackButton: 'flex-row items-center border-b border-gray-200',
        search: 'flex-row justify-between items-center',
        imageBackground: 'relative',
      },
      size: {
        default: 'py-2',
        large: 'py-3',
        small: 'py-1',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface HeaderProps extends VariantProps<typeof headerVariants> {
  title?: string;
  showBackButton?: boolean;
  showSearch?: boolean;
  searchPlaceholder?: string;
  onSearchChange?: (text: string) => void;
  searchValue?: string;
  isSearchMode?: boolean;
  setIsSearchMode?: (value: boolean) => void;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  rightActions?: ReactNode[];
  className?: string;
  children?: ReactNode;
  backgroundImage?: string;
  onBackPress?: () => void;
  showLogo?: boolean;
  logoVariant?: 'orange' | 'purple' | 'blue';
}

export function Header({
  title,
  showBackButton = false,
  showSearch = false,
  searchPlaceholder = "Search...",
  onSearchChange,
  searchValue = "",
  isSearchMode = false,
  setIsSearchMode,
  leftIcon,
  rightIcon,
  rightActions,
  className,
  children,
  backgroundImage,
  onBackPress,
  showLogo = false,
  logoVariant = 'orange',
  variant = 'default',
  size = 'default',
  ...props
}: HeaderProps) {
  const router = useRouter();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  const logoColors = {
    orange: 'bg-orange-500',
    purple: 'bg-purple-500',
    blue: 'bg-blue-500',
  };

  const renderLogo = () => (
    <View className={cn('w-8 h-8 rounded-lg items-center justify-center', logoColors[logoVariant])}>
      <View className="w-4 h-4 border-2 border-white transform rotate-45" />
    </View>
  );

  const renderSearchMode = () => (
    <View className="flex-row items-center flex-1">
      <TouchableOpacity onPress={() => setIsSearchMode?.(false)} className="mr-3">
        <Ionicons name="arrow-back" size={24} color="#374151" />
      </TouchableOpacity>
      <View className="flex-1 h-10 bg-gray-100 rounded-lg flex-row items-center px-3">
        <Ionicons name="search" size={20} color="#9CA3AF" />
        <TextInput
          placeholder={searchPlaceholder}
          value={searchValue}
          onChangeText={onSearchChange}
          className="flex-1 ml-2 text-gray-900"
          autoFocus
        />
      </View>
      <TouchableOpacity onPress={() => setIsSearchMode?.(false)} className="ml-3">
        <Text className="text-orange-500 font-medium">Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  // Image background variant (for goal details)
  if (variant === 'imageBackground' && backgroundImage) {
    return (
      <View className="relative">
        <ImageBackground
          source={{ uri: backgroundImage }}
          className="h-64 justify-between"
          style={{ backgroundColor: '#a855f7' }}
        >
          {/* Gradient overlay */}
          <View className="absolute inset-0 bg-gradient-to-b from-purple-600/60 to-pink-500/60" />
          
          {/* Header controls */}
          <View className="flex-row justify-between items-center px-4 pt-4">
            <TouchableOpacity 
              onPress={handleBackPress}
              className="w-10 h-10 bg-white/20 rounded-full items-center justify-center"
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            {rightIcon && (
              <TouchableOpacity className="w-10 h-10 bg-white/20 rounded-full items-center justify-center">
                {rightIcon}
              </TouchableOpacity>
            )}
          </View>
          {children}
        </ImageBackground>
      </View>
    );
  }

  return (
    <View className={cn(headerVariants({ variant, size }), className)} {...props}>
      {/* Search mode */}
      {showSearch && isSearchMode ? (
        renderSearchMode()
      ) : (
        <>
          {/* Left side */}
          <View className="flex-row items-center">
            {showBackButton && (
              <TouchableOpacity onPress={handleBackPress} className="mr-4">
                <Ionicons name="arrow-back" size={24} color="#374151" />
              </TouchableOpacity>
            )}
            {showLogo && renderLogo()}
            {leftIcon}
            {title && (
              <Text className={cn(
                'text-xl font-semibold text-gray-900',
                showBackButton && 'ml-0',
                showLogo && 'ml-0'
              )}>
                {title}
              </Text>
            )}
          </View>

          {/* Right side */}
          <View className="flex-row items-center space-x-3">
            {showSearch && (
              <TouchableOpacity onPress={() => setIsSearchMode?.(true)}>
                <Ionicons name="search" size={24} color="#374151" />
              </TouchableOpacity>
            )}
            {rightActions?.map((action, index) => (
              <View key={index}>{action}</View>
            ))}
            {rightIcon}
          </View>
        </>
      )}
    </View>
  );
}

// Predefined header configurations for common use cases
export const HeaderConfigs = {
  basic: (title: string) => ({
    title,
    showLogo: true,
    rightIcon: (
      <TouchableOpacity>
        <Ionicons name="ellipsis-vertical" size={24} color="gray" />
      </TouchableOpacity>
    ),
  }),

  withSearch: (title: string) => ({
    title,
    showLogo: true,
    showSearch: true,
  }),

  withBackButton: (title: string) => ({
    title,
    showBackButton: true,
    variant: 'withBackButton' as const,
    size: 'large' as const,
  }),

  imageBackground: (backgroundImage: string) => ({
    variant: 'imageBackground' as const,
    backgroundImage,
    rightIcon: <Ionicons name="share-outline" size={24} color="white" />,
  }),
} as const;
