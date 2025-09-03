import React, { useState } from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
import { Text } from '@/components/ui/text';
import { Header, HeaderConfigs } from '@/components/ui/header';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

export function HeaderUsageExamples() {
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        <View className="p-4 space-y-6">
          <Text className="text-2xl font-bold text-gray-900 mb-6">Header Component Examples</Text>

          {/* Basic Header */}
          <View className="space-y-2">
            <Text className="text-lg font-semibold text-gray-900">1. Basic Header</Text>
            <Text className="text-gray-600 mb-2">Logo + title + menu button</Text>
            <Header {...HeaderConfigs.basic("Home")} />
          </View>

          {/* Header with Search */}
          <View className="space-y-2">
            <Text className="text-lg font-semibold text-gray-900">2. Header with Search</Text>
            <Text className="text-gray-600 mb-2">Logo + title + search functionality</Text>
            <Header 
              {...HeaderConfigs.withSearch("Explore")}
              isSearchMode={isSearchMode}
              setIsSearchMode={setIsSearchMode}
              searchValue={searchQuery}
              onSearchChange={setSearchQuery}
              searchPlaceholder="Search goals..."
            />
          </View>

          {/* Header with Back Button */}
          <View className="space-y-2">
            <Text className="text-lg font-semibold text-gray-900">3. Header with Back Button</Text>
            <Text className="text-gray-600 mb-2">Back arrow + title (for sub-pages)</Text>
            <Header {...HeaderConfigs.withBackButton("Settings")} />
          </View>

          {/* Custom Header */}
          <View className="space-y-2">
            <Text className="text-lg font-semibold text-gray-900">4. Custom Header</Text>
            <Text className="text-gray-600 mb-2">Custom configuration with multiple actions</Text>
            <Header
              title="Custom"
              showLogo={true}
              logoVariant="purple"
              rightActions={[
                <TouchableOpacity key="filter">
                  <Ionicons name="filter" size={24} color="#374151" />
                </TouchableOpacity>,
                <TouchableOpacity key="settings">
                  <Ionicons name="settings" size={24} color="#374151" />
                </TouchableOpacity>
              ]}
            />
          </View>

          {/* Image Background Header Preview */}
          <View className="space-y-2">
            <Text className="text-lg font-semibold text-gray-900">5. Image Background Header</Text>
            <Text className="text-gray-600 mb-2">Used in goal details with background image</Text>
            <View className="bg-purple-300 rounded-lg p-4">
              <Text className="text-white font-medium">
                This variant is used in goal details with ImageBackground component
              </Text>
            </View>
          </View>

          {/* Code Examples */}
          <View className="space-y-4 mt-8">
            <Text className="text-xl font-bold text-gray-900">Usage Examples</Text>
            
            <View className="bg-gray-100 rounded-lg p-4">
              <Text className="text-sm font-mono text-gray-800">
                {`// Basic header with logo and menu
<Header {...HeaderConfigs.basic("Home")} />

// Header with search functionality
<Header 
  {...HeaderConfigs.withSearch("Explore")}
  isSearchMode={isSearchMode}
  setIsSearchMode={setIsSearchMode}
  searchValue={searchQuery}
  onSearchChange={setSearchQuery}
/>

// Header with back button
<Header {...HeaderConfigs.withBackButton("Settings")} />

// Image background header
<Header {...HeaderConfigs.imageBackground(imageUrl)}>
  <View className="px-4 pb-6">
    {/* Custom content */}
  </View>
</Header>`}
              </Text>
            </View>
          </View>

          {/* Available Props */}
          <View className="space-y-4">
            <Text className="text-xl font-bold text-gray-900">Available Props</Text>
            
            <View className="bg-white rounded-lg p-4 border border-gray-200">
              <Text className="text-sm text-gray-700 leading-relaxed">
                {`• title: string - Header title text
• showBackButton: boolean - Show back arrow
• showSearch: boolean - Show search icon
• searchPlaceholder: string - Search input placeholder
• isSearchMode: boolean - Toggle search mode
• setIsSearchMode: function - Search mode setter
• onSearchChange: function - Search input handler
• leftIcon: ReactNode - Custom left icon
• rightIcon: ReactNode - Custom right icon
• rightActions: ReactNode[] - Multiple right actions
• showLogo: boolean - Show app logo
• logoVariant: 'orange' | 'purple' | 'blue' - Logo color
• variant: 'default' | 'withBackButton' | 'search' | 'imageBackground'
• size: 'default' | 'large' | 'small' - Header height
• backgroundImage: string - For image background variant
• onBackPress: function - Custom back handler
• className: string - Additional CSS classes
• children: ReactNode - Custom content (for image variant)`}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/*
HEADER COMPONENT IMPLEMENTATION SUMMARY:

## Files Created/Modified:

1. ✅ components/ui/header.tsx - Main reusable Header component
2. ✅ app/(app)/index.tsx - Updated to use Header
3. ✅ app/(app)/goals/index.tsx - Updated to use Header  
4. ✅ app/(app)/explore.tsx - Updated to use Header with search
5. ✅ app/(app)/report.tsx - Updated to use Header
6. ✅ app/(app)/account/index.tsx - Updated to use Header
7. ✅ app/(app)/account/security.tsx - Updated to use Header with back button
8. ✅ app/(app)/account/help.tsx - Updated to use Header with back button
9. ✅ app/(app)/account/analytics.tsx - Updated to use Header with back button
10. ✅ app/(app)/account/subscription.tsx - Updated to use Header with back button
11. ✅ app/(app)/account/payment.tsx - Updated to use Header with back button
12. ✅ app/(app)/goals/details/[id].tsx - Updated to use Header with image background

## Header Variants Implemented:

1. **Basic Header** (`HeaderConfigs.basic`)
   - Logo + title + menu icon
   - Used in: Home, Goals, Report, Account

2. **Search Header** (`HeaderConfigs.withSearch`)
   - Logo + title + search functionality
   - Used in: Explore page

3. **Back Button Header** (`HeaderConfigs.withBackButton`)
   - Back arrow + title + border
   - Used in: All account sub-pages

4. **Image Background Header** (`HeaderConfigs.imageBackground`)
   - Background image + overlay + controls + custom content
   - Used in: Goal details page

## Key Features:

✅ Consistent styling across all pages
✅ Responsive design with different variants
✅ TypeScript support with proper type definitions
✅ Configurable props for maximum flexibility
✅ Predefined configurations for common use cases
✅ Search functionality with mode toggle
✅ Custom actions and icons support
✅ Class variance authority for styling variants
✅ Proper accessibility and navigation handling

## Benefits:

- **Maintainability**: Single source of truth for headers
- **Consistency**: Uniform look and feel across the app
- **Flexibility**: Multiple variants for different use cases
- **Reusability**: Easy to implement in new pages
- **Type Safety**: Full TypeScript support
- **Performance**: Optimized with proper React patterns
*/
