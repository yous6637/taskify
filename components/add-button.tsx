import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import { router } from 'expo-router';

const { width: screenWidth } = Dimensions.get('window');

export function AddButton() {
  const { colorScheme } = useColorScheme();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(300));

  const openModal = () => {
    setIsModalVisible(true);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeModal = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsModalVisible(false);
    });
  };

  const goalOptions = [
    {
      id: 'ai-made',
      title: 'AI-made Goals',
      subtitle: 'Let AI create personalized goals for you',
      icon: 'sparkles',
      onPress: () => {
        router.push('/goals/new');

        closeModal();
        // Handle AI-made goals navigation
        console.log('AI-made Goals selected');
      },
    },
    {
      id: 'pre-made',
      title: 'Pre-made Goals',
      subtitle: 'Choose from our curated goal templates',
      icon: 'document-text',
      onPress: () => {
        closeModal();
        // Handle pre-made goals navigation
        console.log('Pre-made Goals selected');
      },
    },
    {
      id: 'self-made',
      title: 'Self-made Goals',
      subtitle: 'Create your own custom goals',
      icon: 'person',
      onPress: () => {
        closeModal();
        // Handle self-made goals navigation
        console.log('Self-made Goals selected');
      },
    },
  ];

  const OptionItem = ({ option }: { option: any }) => (
    <TouchableOpacity
      className="flex-row items-center p-4 border-b border-border last:border-b-0"
      onPress={option.onPress}
      activeOpacity={0.7}
    >
      <View className="w-12 h-12 bg-muted rounded-full items-center justify-center mr-4">
        <Ionicons name={option.icon} size={24} color={colorScheme === 'dark' ? '#e5e7eb' : '#374151'} />
      </View>
      <View className="flex-1">
        <Text className="text-lg font-semibold text-foreground mb-1">
          {option.title}
        </Text>
        <Text className="text-sm text-muted-foreground">
          {option.subtitle}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colorScheme === 'dark' ? '#9ca3af' : '#6b7280'} />
    </TouchableOpacity>
  );

  return (
    <>
      {/* Floating Action Button */}
      <TouchableOpacity 
        className="absolute bottom-20 right-4 w-14 h-14 bg-primary rounded-full items-center justify-center shadow-lg"
        onPress={openModal}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={28} color={colorScheme === 'dark' ? '#000000' : '#ffffff'} />
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="none"
        statusBarTranslucent
        onRequestClose={closeModal}
      >
        {/* Backdrop */}
        <Animated.View
          className="flex-1 bg-black/50"
          style={{ opacity: fadeAnim }}
        >
          <TouchableOpacity
            className="flex-1"
            activeOpacity={1}
            onPress={closeModal}
          />
        </Animated.View>

        {/* Modal Content */}
        <Animated.View
          className="absolute bottom-0 left-0 right-0"
          style={{
            transform: [{ translateY: slideAnim }],
          }}
        >
          <View className="bg-background rounded-t-3xl px-6 pt-6 pb-8">
            {/* Handle bar */}
            <View className="w-12 h-1 bg-muted-foreground rounded-full self-center mb-6" />
            
            {/* Header */}
            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-2xl font-bold text-foreground">
                Create New Goal
              </Text>
              <TouchableOpacity
                onPress={closeModal}
                className="w-8 h-8 bg-primary rounded-full items-center justify-center"
              >
                <Ionicons name="close" size={20} color={colorScheme === 'dark' ? '#000000' : '#ffffff'} />
              </TouchableOpacity>
            </View>

            {/* Options */}
            <View className="bg-card rounded-2xl overflow-hidden border border-border">
              {goalOptions.map((option, index) => (
                <View key={option.id}>
                  <OptionItem option={option} />
                </View>
              ))}
            </View>

            {/* Bottom spacing for safe area */}
            <View className="h-4" />
          </View>
        </Animated.View>
      </Modal>
    </>
  );
}