import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Header, HeaderConfigs } from '@/components/ui/header';

const SubscriptionPage = () => {
  const router = useRouter();

  const currentPlan = {
    name: 'Pro Plan',
    price: '$9.99/month',
    nextBilling: 'January 15, 2024',
    features: [
      'Unlimited goals and tasks',
      'Advanced analytics',
      'Priority support',
      'Custom themes',
      'Export data',
    ],
  };

  const availablePlans = [
    {
      id: 1,
      name: 'Free',
      price: '$0/month',
      features: ['Up to 5 goals', 'Basic task management', 'Standard support'],
      isCurrent: false,
    },
    {
      id: 2,
      name: 'Pro',
      price: '$9.99/month',
      features: ['Unlimited goals', 'Advanced analytics', 'Priority support', 'Custom themes'],
      isCurrent: true,
    },
    {
      id: 3,
      name: 'Premium',
      price: '$19.99/month',
      features: ['Everything in Pro', 'Team collaboration', 'API access', 'White-label options'],
      isCurrent: false,
    },
  ];

  const PlanCard = ({ plan }: { plan: any }) => (
    <View className={`p-4 rounded-2xl mb-4 ${plan.isCurrent ? 'bg-orange-50 border-2 border-orange-500' : 'bg-card border border-border'}`}>
      <View className="flex-row items-center justify-between mb-3">
        <Text className={`text-xl font-bold ${plan.isCurrent ? 'text-orange-500' : 'text-foreground'}`}>
          {plan.name}
        </Text>
        <Text className={`text-lg font-semibold ${plan.isCurrent ? 'text-orange-500' : 'text-foreground'}`}>
          {plan.price}
        </Text>
      </View>
      
      {plan.isCurrent && (
        <View className="bg-orange-500 px-3 py-1 rounded-full self-start mb-3">
          <Text className="text-white text-sm font-medium">Current Plan</Text>
        </View>
      )}
      
      <View className="mb-4">
        {plan.features.map((feature: string, index: number) => (
          <View key={index} className="flex-row items-center mb-2">
            <Ionicons name="checkmark-circle" size={16} color="#10b981" />
            <Text className="text-muted-foreground ml-2">{feature}</Text>
          </View>
        ))}
      </View>
      
      {!plan.isCurrent && (
        <TouchableOpacity className="bg-orange-500 py-3 rounded-xl">
          <Text className="text-white text-center font-semibold">
            {plan.name === 'Free' ? 'Downgrade' : 'Upgrade'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 h-screen native:pt-10 pb-0 mb-0">
    
      {/* Header */}
      <Header {...HeaderConfigs.withBackButton("Subscription")} />

      <ScrollView className="flex-1">
        {/* Current Subscription */}
        <View className="mx-4 mt-6">
          <Text className="text-lg font-semibold text-foreground mb-4">
            Current Subscription
          </Text>
          <View className="bg-card rounded-2xl p-4">
            <View className="flex-row items-center justify-between mb-3">
              <View>
                <Text className="text-xl font-bold text-foreground">{currentPlan.name}</Text>
                <Text className="text-orange-500 font-semibold">{currentPlan.price}</Text>
              </View>
              <View className="bg-green-100 px-3 py-1 rounded-full">
                <Text className="text-green-800 text-sm font-medium">Active</Text>
              </View>
            </View>
            
            <View className="border-t border-border pt-3">
              <Text className="text-sm text-muted-foreground mb-2">Next billing date:</Text>
              <Text className="text-base font-medium text-foreground">{currentPlan.nextBilling}</Text>
            </View>
            
            <TouchableOpacity className="mt-4 bg-red-50 border border-red-200 py-3 rounded-xl">
              <Text className="text-red-600 text-center font-semibold">Cancel Subscription</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Available Plans */}
        <View className="mx-4 mt-8">
          <Text className="text-lg font-semibold text-foreground mb-4">
            Available Plans
          </Text>
          {availablePlans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </View>

        {/* Billing Information */}
        <View className="mx-4 mt-8">
          <Text className="text-lg font-semibold text-foreground mb-4">
            Billing Information
          </Text>
          <View className="bg-card rounded-2xl p-4">
            <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-border">
              <Text className="text-base text-foreground">Payment Method</Text>
              <View className="flex-row items-center">
                <Text className="text-muted-foreground mr-2">Visa ••••4242</Text>
                <Ionicons name="chevron-forward" size={20} color="#6b7280" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center justify-between py-3">
              <Text className="text-base text-foreground">Billing History</Text>
              <Ionicons name="chevron-forward" size={20} color="#6b7280" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom spacing */}
        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SubscriptionPage;
