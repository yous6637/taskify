import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header, HeaderConfigs } from '@/components/ui/header';
import { GoalCard, GoalCardConfigs } from '@/components/cards';
import { Text } from '@/components/ui/text';

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



  return (
    <SafeAreaView className="flex-1 h-screen native:pt-10 pb-0 mb-0">
      {/* Header */}

      <Header isSearchMode = {isSearchMode} setIsSearchMode={setIsSearchMode} {...HeaderConfigs.withSearch("Explore")}  />

      <ScrollView className="flex-1">
        {isSearchMode ? (
          <View className="flex-1">
            {/* Recent Searches */}
            <View className="px-4 py-4">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-lg font-semibold">Recent Searches</Text>
                <TouchableOpacity>
                  <Ionicons name="close" size={20} color="gray" />
                </TouchableOpacity>
              </View>
              
              {recentSearches.map((search, index) => (
                <View key={index} className="flex-row justify-between items-center py-3 border-b border-muted">
                  <Text className="text-muted-foreground flex-1">{search}</Text>
                  <TouchableOpacity onPress={() => removeRecentSearch(index)}>
                    <Ionicons name="close" size={20} color="gray" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            {/* Popular Goals Section */}
            <View className="px-4 mt-4">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-lg font-semibold">Popular Goals</Text>
                <TouchableOpacity className="flex-row items-center">
                  <Text className="text-orange-500 font-medium mr-1">View All</Text>
                  <Ionicons name="arrow-forward" size={16} color="#f97316" />
                </TouchableOpacity>
              </View>
              
              {/* Show only first 2 goals in search mode */}
              {goals.slice(0, 2).map((goal) => (
                <GoalCard 
                  key={goal.id} 
                  {...GoalCardConfigs.explore}
                  goal={{
                    id: goal.id,
                    title: goal.title,
                    image: goal.image,
                    illustration: goal.illustration,
                    backgroundColor: goal.backgroundColor,
                    habits: { completed: 0, total: goal.habits },
                    tasks: { completed: 0, total: goal.tasks },
                    users: goal.users,
                  }}
                  onAddPress={() => console.log('Add goal:', goal.id)}
                  className="mb-4"
                />
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
                    <Text className="text-foreground text-2xl font-bold mb-2">
                      Explore thousands of amazing goals today!
                    </Text>
                    <Text className="text-foreground opacity-90 text-base">
                      Make your dreams come true with the power of AI
                    </Text>
                  </View>
                  
                  {/* Illustration placeholder */}
                  <View className="w-24 h-24 items-center justify-center">
                    <View className="w-16 h-20  bg-opacity-20 rounded-lg items-center justify-center mb-2">
                      <Text className="text-foreground text-2xl">👨‍💼</Text>
                    </View>
                    <View className="w-12 h-16  bg-opacity-30 rounded-lg items-center justify-center">
                      <Text className="text-foreground text-lg">💼</Text>
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
                          : ''
                      }`}
                    >
                      <Text className={`font-medium ${
                        selectedCategory === category
                          ? 'text-foreground'
                          : 'text-muted-foreground'
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
                <GoalCard 
                  key={goal.id} 
                  {...GoalCardConfigs.explore}
                  goal={{
                    id: goal.id,
                    title: goal.title,
                    image: goal.image,
                    illustration: goal.illustration,
                    backgroundColor: goal.backgroundColor,
                    habits: { completed: 0, total: goal.habits },
                    tasks: { completed: 0, total: goal.tasks },
                    users: goal.users,
                  }}
                  onAddPress={() => console.log('Add goal:', goal.id)}
                  className="mb-4"
                />
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      

      
    </SafeAreaView>
  );
};

export default ExplorePage;