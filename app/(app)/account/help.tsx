import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Header, HeaderConfigs } from '@/components/ui/header';

const HelpPage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const helpCategories = [
    {
      id: 1,
      title: 'Getting Started',
      icon: 'play-circle-outline',
      color: 'bg-blue-100',
      iconColor: '#3b82f6',
    },
    {
      id: 2,
      title: 'Account & Settings',
      icon: 'settings-outline',
      color: 'bg-gray-100',
      iconColor: '#6b7280',
    },
    {
      id: 3,
      title: 'Tasks & Goals',
      icon: 'checkmark-circle-outline',
      color: 'bg-green-100',
      iconColor: '#10b981',
    },
    {
      id: 4,
      title: 'Billing & Subscription',
      icon: 'card-outline',
      color: 'bg-orange-100',
      iconColor: '#ea580c',
    },
  ];

  const faqs = [
    {
      id: 1,
      question: 'How do I create a new goal?',
      answer: 'To create a new goal, go to the Goals tab and tap the "+" button. Fill in your goal details, set a deadline, and choose your preferred tracking method.',
    },
    {
      id: 2,
      question: 'Can I sync my tasks across devices?',
      answer: 'Yes! Your tasks and goals automatically sync across all your devices when you\'re signed in to your account.',
    },
    {
      id: 3,
      question: 'How do I upgrade to Pro?',
      answer: 'You can upgrade to Pro by going to Account > Subscription and selecting the Pro plan. You\'ll get access to unlimited goals, advanced analytics, and priority support.',
    },
    {
      id: 4,
      question: 'How do I reset my password?',
      answer: 'Go to the sign-in page and tap "Forgot Password". Enter your email address and we\'ll send you instructions to reset your password.',
    },
    {
      id: 5,
      question: 'Can I export my data?',
      answer: 'Pro users can export their data in CSV format. Go to Account > Analytics and look for the export option.',
    },
  ];

  const quickActions = [
    {
      id: 1,
      title: 'Contact Support',
      subtitle: 'Get help from our team',
      icon: 'mail-outline',
      action: () => {},
    },
    {
      id: 2,
      title: 'Report a Bug',
      subtitle: 'Let us know about issues',
      icon: 'bug-outline',
      action: () => {},
    },
    {
      id: 3,
      title: 'Feature Request',
      subtitle: 'Suggest new features',
      icon: 'bulb-outline',
      action: () => {},
    },
    {
      id: 4,
      title: 'Rate the App',
      subtitle: 'Leave a review',
      icon: 'star-outline',
      action: () => {},
    },
  ];

  const CategoryCard = ({ category }: { category: any }) => (
    <TouchableOpacity className="bg-card rounded-2xl p-4 flex-1 mx-1">
      <View className={`w-12 h-12 ${category.color} rounded-full items-center justify-center mb-3`}>
        <Ionicons name={category.icon} size={24} color={category.iconColor} />
      </View>
      <Text className="text-base font-medium text-foreground">{category.title}</Text>
    </TouchableOpacity>
  );

  const FaqItem = ({ faq }: { faq: any }) => (
    <TouchableOpacity 
      className="bg-card p-4 border-b border-border"
      onPress={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
    >
      <View className="flex-row items-center justify-between">
        <Text className="text-base font-medium text-foreground flex-1 pr-4">
          {faq.question}
        </Text>
        <Ionicons 
          name={expandedFaq === faq.id ? 'chevron-up' : 'chevron-down'} 
          size={20} 
          color="#9ca3af" 
        />
      </View>
      {expandedFaq === faq.id && (
        <Text className="text-muted-foreground mt-3 leading-6">
          {faq.answer}
        </Text>
      )}
    </TouchableOpacity>
  );

  const QuickActionItem = ({ action }: { action: any }) => (
    <TouchableOpacity 
      className="flex-row items-center p-4 bg-card"
      onPress={action.action}
    >
      <View className="w-10 h-10 items-center justify-center mr-4">
        <Ionicons name={action.icon} size={24} color="#6b7280" />
      </View>
      <View className="flex-1">
        <Text className="text-base font-medium text-foreground">{action.title}</Text>
        <Text className="text-sm text-muted-foreground mt-1">{action.subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#6b7280" />
    </TouchableOpacity>
  );

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <Header {...HeaderConfigs.withBackButton("Help & Support")} />

      <ScrollView className="flex-1">
        {/* Search Bar */}
        <View className="mx-4 mt-6">
          <View className="flex-row items-center bg-card rounded-2xl px-4 py-3">
            <Ionicons name="search-outline" size={20} color="#9ca3af" />
            <TextInput
              className="flex-1 ml-3 text-base text-foreground"
              placeholder="Search for help..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#9ca3af"
            />
          </View>
        </View>

        {/* Help Categories */}
        <View className="mx-4 mt-8">
          <Text className="text-lg font-semibold text-foreground mb-4">
            Browse by Category
          </Text>
          <View className="flex-row mb-4">
            <CategoryCard category={helpCategories[0]} />
            <CategoryCard category={helpCategories[1]} />
          </View>
          <View className="flex-row">
            <CategoryCard category={helpCategories[2]} />
            <CategoryCard category={helpCategories[3]} />
          </View>
        </View>

        {/* FAQs */}
        <View className="mx-4 mt-8">
          <Text className="text-lg font-semibold text-foreground mb-4">
            Frequently Asked Questions
          </Text>
          <View className="bg-card rounded-2xl overflow-hidden">
            {filteredFaqs.map((faq, index) => (
              <View key={faq.id}>
                <FaqItem faq={faq} />
              </View>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View className="mx-4 mt-8">
          <Text className="text-lg font-semibold text-foreground mb-4">
            Need More Help?
          </Text>
          <View className="bg-card rounded-2xl overflow-hidden">
            {quickActions.map((action, index) => (
              <View key={action.id}>
                <QuickActionItem action={action} />
                {index < quickActions.length - 1 && (
                  <View className="border-b border-border ml-14" />
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Contact Information */}
        <View className="mx-4 mt-8">
          <Text className="text-lg font-semibold text-foreground mb-4">
            Contact Information
          </Text>
          <View className="bg-card rounded-2xl p-4">
            <View className="flex-row items-center mb-4">
              <Ionicons name="mail-outline" size={20} color="#374151" />
              <Text className="text-foreground ml-3">support@taskify.com</Text>
            </View>
            <View className="flex-row items-center mb-4">
              <Ionicons name="time-outline" size={20} color="#374151" />
              <Text className="text-foreground ml-3">Response time: 24-48 hours</Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="globe-outline" size={20} color="#374151" />
              <Text className="text-foreground ml-3">www.taskify.com/help</Text>
            </View>
          </View>
        </View>

        {/* App Information */}
        <View className="mx-4 mt-8">
          <Text className="text-lg font-semibold text-foreground mb-4">
            App Information
          </Text>
          <View className="bg-card rounded-2xl p-4">
            <View className="flex-row items-center justify-between py-2">
              <Text className="text-muted-foreground">Version</Text>
              <Text className="text-foreground font-medium">2.1.0</Text>
            </View>
            <View className="flex-row items-center justify-between py-2">
              <Text className="text-muted-foreground">Build</Text>
              <Text className="text-foreground font-medium">2024.01.15</Text>
            </View>
            <View className="flex-row items-center justify-between py-2">
              <Text className="text-muted-foreground">Platform</Text>
              <Text className="text-foreground font-medium">React Native</Text>
            </View>
          </View>
        </View>

        {/* Bottom spacing */}
        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HelpPage;
