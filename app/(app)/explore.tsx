import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header, HeaderConfigs } from '@/components/ui/header';

const ExplorePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('Popular');
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['Popular', 'Career', 'Health', 'Travel'];
  
  const recentSearches = [
    'Backpack Across Countries',
    'Complete Online Courses',
    'Volunteer Regularly'
  ];

  const removeRecentSearch = (index: number) => {
    // Handle removing recent search
    console.log('Remove search at index:', index);
  };

  const goals = [
    {
      id: 1,
      title: 'Learn New Skills',
      image: require('@/assets/learn-skills.png'), // You'll need to add actual images
      habits: 5,
      tasks: 4,
      users: '+15.2K users',
      backgroundColor: 'bg-purple-100',
      illustration: '👩‍💻📚'
    },
    {
      id: 2,
      title: 'Exercise Regularly',
      image: require('@/assets/exercise.png'),
      habits: 4,
      tasks: 6,
      users: '+12.4K users',
      backgroundColor: 'bg-orange-100',
      illustration: '🏃‍♀️🌅'
    },
    {
      id: 3,
      title: 'Visit New Places',
      image: require('@/assets/travel.png'),
      habits: 6,
      tasks: 5,
      users: '+10.9K users',
      backgroundColor: 'bg-orange-200',
      illustration: '🏔️✈️'
    }
  ];

  // Since we can't use actual images in this example, I'll create placeholder cards
  const GoalCard = ({ goal }: { goal: any }) => (
    <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
      <View className="flex-row">
        {/* Image placeholder with gradient background */}
        <View className={`w-20 h-20 ${goal.backgroundColor} rounded-2xl mr-4 items-center justify-center`}>
          <Image source = {goal.image} />
        </View>
        
        {/* Content */}
        <View className="flex-1">
          <View className="flex-row justify-between items-start mb-2">
            <Text className="text-lg font-semibold text-gray-900 flex-1 mr-2">
              {goal.title}
            </Text>
            <TouchableOpacity>
              <Ionicons name="add" size={24} color="#f97316" />
            </TouchableOpacity>
          </View>
          
          {/* Tags */}
          <View className="flex-row mb-3">
            <View className="bg-orange-100 px-3 py-1 rounded-full mr-2">
              <Text className="text-orange-600 text-sm">Habits {goal.habits}</Text>
            </View>
            <View className="bg-blue-100 px-3 py-1 rounded-full">
              <Text className="text-blue-600 text-sm">Tasks {goal.tasks}</Text>
            </View>
          </View>
          
          {/* Users count */}
          <View className="flex-row items-center">
            <Ionicons name="people-outline" size={16} color="#6b7280" />
            <Text className="text-gray-500 text-sm ml-1">{goal.users}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <Header 
        {...HeaderConfigs.withSearch("Explore")}
        isSearchMode={isSearchMode}
        setIsSearchMode={setIsSearchMode}
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search goals..."
      />

      <ScrollView className="flex-1">
        {isSearchMode ? (
          <View className="flex-1">
            {/* Recent Searches */}
            <View className="px-4 py-4">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-lg font-semibold text-gray-900">Recent Searches</Text>
                <TouchableOpacity>
                  <Ionicons name="close" size={20} color="gray" />
                </TouchableOpacity>
              </View>
              
              {recentSearches.map((search, index) => (
                <View key={index} className="flex-row justify-between items-center py-3 border-b border-gray-100">
                  <Text className="text-gray-600 flex-1">{search}</Text>
                  <TouchableOpacity onPress={() => removeRecentSearch(index)}>
                    <Ionicons name="close" size={20} color="gray" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            {/* Popular Goals Section */}
            <View className="px-4 mt-4">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-lg font-semibold text-gray-900">Popular Goals</Text>
                <TouchableOpacity className="flex-row items-center">
                  <Text className="text-orange-500 font-medium mr-1">View All</Text>
                  <Ionicons name="arrow-forward" size={16} color="#f97316" />
                </TouchableOpacity>
              </View>
              
              {/* Show only first 2 goals in search mode */}
              {goals.slice(0, 2).map((goal) => (
                <GoalCard key={goal.id} goal={goal} />
              ))}
            </View>
          </View>
        ) : (
          <View>
            {/* Hero Banner */}
            <View className="mx-4 mt-4 mb-6">
              <View className="bg-orange-500 rounded-2xl p-6 relative overflow-hidden">
                {/* Background decorative elements */}
                <View className="absolute top-4 right-4">
                  <Ionicons name="sparkles" size={20} color="white" opacity={0.7} />
                </View>
                <View className="absolute top-12 right-12">
                  <Ionicons name="star" size={16} color="white" opacity={0.5} />
                </View>
                <View className="absolute bottom-4 right-8">
                  <Ionicons name="star" size={12} color="white" opacity={0.6} />
                </View>
                
                {/* Content */}
                <View className="flex-row">
                  <View className="flex-1 pr-4">
                    <Text className="text-white text-2xl font-bold mb-2">
                      Explore thousands of amazing goals today!
                    </Text>
                    <Text className="text-white opacity-90 text-base">
                      Make your dreams come true with the power of AI
                    </Text>
                  </View>
                  
                  {/* Illustration placeholder */}
                  <View className="w-24 h-24 items-center justify-center">
                    <View className="w-16 h-20 bg-white bg-opacity-20 rounded-lg items-center justify-center mb-2">
                      <Text className="text-white text-2xl">👨‍💼</Text>
                    </View>
                    <View className="w-12 h-16 bg-white bg-opacity-30 rounded-lg items-center justify-center">
                      <Text className="text-white text-lg">💼</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {/* Category Tabs */}
            <View className="px-4 mb-6">
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="flex-row">
                  {categories.map((category, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => setSelectedCategory(category)}
                      className={`px-6 py-3 rounded-full mr-3 ${
                        selectedCategory === category
                          ? 'bg-orange-500'
                          : 'bg-white'
                      }`}
                    >
                      <Text className={`font-medium ${
                        selectedCategory === category
                          ? 'text-white'
                          : 'text-gray-600'
                      }`}>
                        {category}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>

            {/* Goals List */}
            <View className="px-4 pb-20">
              {goals.map((goal) => (
                <GoalCard key={goal.id} goal={goal} />
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      

      
    </SafeAreaView>
  );
};

export default ExplorePage;