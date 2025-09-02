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

const PaymentPage = () => {
  const router = useRouter();

  const paymentMethods = [
    {
      id: 1,
      type: 'card',
      name: 'Visa ending in 4242',
      icon: 'card-outline',
      isDefault: true,
    },
    {
      id: 2,
      type: 'card',
      name: 'Mastercard ending in 8888',
      icon: 'card-outline',
      isDefault: false,
    },
    {
      id: 3,
      type: 'paypal',
      name: 'PayPal',
      icon: 'logo-paypal',
      isDefault: false,
    },
  ];

  const PaymentMethodItem = ({ item }: { item: any }) => (
    <TouchableOpacity className="flex-row items-center p-4 bg-white border-b border-gray-100">
      <View className="w-10 h-10 items-center justify-center mr-4">
        <Ionicons name={item.icon} size={24} color="#374151" />
      </View>
      <View className="flex-1">
        <Text className="text-base font-medium text-gray-900">{item.name}</Text>
        {item.isDefault && (
          <Text className="text-sm text-orange-500 mt-1">Default</Text>
        )}
      </View>
      <TouchableOpacity>
        <Ionicons name="ellipsis-vertical" size={20} color="#9ca3af" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 bg-white border-b border-gray-200">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="#374151" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold text-gray-900">Payment Methods</Text>
      </View>

      <ScrollView className="flex-1">
        {/* Payment Methods */}
        <View className="mt-6 mx-4">
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            Your Payment Methods
          </Text>
          <View className="bg-white rounded-2xl overflow-hidden">
            {paymentMethods.map((item, index) => (
              <View key={item.id}>
                <PaymentMethodItem item={item} />
              </View>
            ))}
          </View>
        </View>

        {/* Add New Payment Method */}
        <View className="mx-4 mt-6">
          <TouchableOpacity className="flex-row items-center justify-center p-4 bg-orange-500 rounded-2xl">
            <Ionicons name="add" size={24} color="white" />
            <Text className="text-white text-base font-semibold ml-2">
              Add New Payment Method
            </Text>
          </TouchableOpacity>
        </View>

        {/* Payment History */}
        <View className="mx-4 mt-8">
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            Recent Transactions
          </Text>
          <View className="bg-white rounded-2xl p-4">
            <View className="flex-row items-center justify-between py-3 border-b border-gray-100">
              <View>
                <Text className="text-base font-medium text-gray-900">Pro Subscription</Text>
                <Text className="text-sm text-gray-500">Dec 15, 2023</Text>
              </View>
              <Text className="text-base font-semibold text-gray-900">$9.99</Text>
            </View>
            <View className="flex-row items-center justify-between py-3">
              <View>
                <Text className="text-base font-medium text-gray-900">Premium Features</Text>
                <Text className="text-sm text-gray-500">Nov 15, 2023</Text>
              </View>
              <Text className="text-base font-semibold text-gray-900">$4.99</Text>
            </View>
          </View>
        </View>

        {/* Bottom spacing */}
        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentPage;
