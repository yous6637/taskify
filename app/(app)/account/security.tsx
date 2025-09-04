import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Header, HeaderConfigs } from '@/components/ui/header';

const SecurityPage = () => {
  const router = useRouter();
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [loginNotifications, setLoginNotifications] = useState(true);

  const securityOptions = [
    {
      id: 1,
      title: 'Change Password',
      subtitle: 'Update your account password',
      icon: 'key-outline',
      hasSwitch: false,
      onPress: () => {},
    },
    {
      id: 2,
      title: 'Two-Factor Authentication',
      subtitle: 'Add an extra layer of security',
      icon: 'shield-checkmark-outline',
      hasSwitch: true,
      value: twoFactorEnabled,
      onToggle: setTwoFactorEnabled,
    },
    {
      id: 3,
      title: 'Biometric Login',
      subtitle: 'Use fingerprint or face recognition',
      icon: 'finger-print-outline',
      hasSwitch: true,
      value: biometricEnabled,
      onToggle: setBiometricEnabled,
    },
    {
      id: 4,
      title: 'Login Notifications',
      subtitle: 'Get notified of new sign-ins',
      icon: 'notifications-outline',
      hasSwitch: true,
      value: loginNotifications,
      onToggle: setLoginNotifications,
    },
  ];

  const linkedAccounts = [
    {
      id: 1,
      name: 'Google',
      email: 'andrew.ainsley@gmail.com',
      icon: 'logo-google',
      connected: true,
    },
    {
      id: 2,
      name: 'Apple',
      email: 'Not connected',
      icon: 'logo-apple',
      connected: false,
    },
    {
      id: 3,
      name: 'Facebook',
      email: 'Not connected',
      icon: 'logo-facebook',
      connected: false,
    },
  ];

  const SecurityOption = ({ item }: { item: any }) => (
    <TouchableOpacity 
      className="flex-row items-center p-4 bg-card"
      onPress={item.hasSwitch ? undefined : item.onPress}
      disabled={item.hasSwitch}
    >
      <View className="w-10 h-10 items-center justify-center mr-4">
        <Ionicons name={item.icon} size={24} color="#6b7280" />
      </View>
      <View className="flex-1">
        <Text className="text-base font-medium text-foreground">{item.title}</Text>
        <Text className="text-sm text-muted-foreground mt-1">{item.subtitle}</Text>
      </View>
      {item.hasSwitch ? (
        <Switch
          value={item.value}
          onValueChange={item.onToggle}
          trackColor={{ false: '#e5e7eb', true: '#fed7aa' }}
          thumbColor={item.value ? '#ea580c' : '#f3f4f6'}
        />
      ) : (
        <Ionicons name="chevron-forward" size={20} color="#6b7280" />
      )}
    </TouchableOpacity>
  );

  const LinkedAccount = ({ account }: { account: any }) => (
    <View className="flex-row items-center p-4 bg-card">
      <View className="w-10 h-10 items-center justify-center mr-4">
        <Ionicons name={account.icon} size={24} color="#6b7280" />
      </View>
      <View className="flex-1">
        <Text className="text-base font-medium text-foreground">{account.name}</Text>
        <Text className="text-sm text-muted-foreground mt-1">{account.email}</Text>
      </View>
      <TouchableOpacity 
        className={`px-4 py-2 rounded-lg ${
          account.connected ? 'bg-red-50 border border-red-200' : 'bg-orange-50 border border-orange-200'
        }`}
      >
        <Text className={`text-sm font-medium ${
          account.connected ? 'text-red-600' : 'text-orange-600'
        }`}>
          {account.connected ? 'Disconnect' : 'Connect'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 h-screen native:pt-10 pb-0 mb-0">
      {/* Header */}
      <Header {...HeaderConfigs.withBackButton("Security")} />

      <ScrollView className="flex-1">
        {/* Security Settings */}
        <View className="mt-6 mx-4">
          <Text className="text-lg font-semibold text-foreground mb-4">
            Security Settings
          </Text>
          <View className="bg-card rounded-2xl overflow-hidden">
            {securityOptions.map((item, index) => (
              <View key={item.id}>
                <SecurityOption item={item} />
                {index < securityOptions.length - 1 && (
                  <View className="border-b border-border ml-14" />
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Account Security Status */}
        <View className="mx-4 mt-8">
          <Text className="text-lg font-semibold text-foreground mb-4">
            Security Status
          </Text>
          <View className="bg-card rounded-2xl p-4">
            <View className="flex-row items-center mb-3">
              <View className="w-12 h-12 bg-green-100 rounded-full items-center justify-center mr-4">
                <Ionicons name="shield-checkmark" size={24} color="#10b981" />
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-foreground">Good Security</Text>
                <Text className="text-sm text-muted-foreground">Your account is well protected</Text>
              </View>
            </View>
            
            <View className="bg-muted rounded-xl p-3 mt-3">
              <Text className="text-sm text-muted-foreground mb-2">Security Score: 8/10</Text>
              <View className="bg-muted rounded-full h-2">
                <View className="bg-green-500 rounded-full h-2" style={{ width: '80%' }} />
              </View>
            </View>
          </View>
        </View>

        {/* Linked Accounts */}
        <View className="mx-4 mt-8">
          <Text className="text-lg font-semibold text-foreground mb-4">
            Linked Accounts
          </Text>
          <View className="bg-card rounded-2xl overflow-hidden">
            {linkedAccounts.map((account, index) => (
              <View key={account.id}>
                <LinkedAccount account={account} />
                {index < linkedAccounts.length - 1 && (
                  <View className="border-b border-border ml-14" />
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View className="mx-4 mt-8">
          <Text className="text-lg font-semibold text-foreground mb-4">
            Recent Security Activity
          </Text>
          <View className="bg-card rounded-2xl p-4">
            <View className="flex-row items-center justify-between py-3 border-b border-border">
              <View className="flex-1">
                <Text className="text-base font-medium text-foreground">Password changed</Text>
                <Text className="text-sm text-muted-foreground">2 days ago</Text>
              </View>
              <View className="bg-green-100 px-2 py-1 rounded-full">
                <Text className="text-green-800 text-xs">Success</Text>
              </View>
            </View>
            <View className="flex-row items-center justify-between py-3">
              <View className="flex-1">
                <Text className="text-base font-medium text-foreground">New device login</Text>
                <Text className="text-sm text-muted-foreground">1 week ago</Text>
              </View>
              <View className="bg-blue-100 px-2 py-1 rounded-full">
                <Text className="text-blue-800 text-xs">Verified</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Bottom spacing */}
        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SecurityPage;
