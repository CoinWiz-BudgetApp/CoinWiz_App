import { HapticTab } from '@/components/haptic-tab';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

const PURP = '#af63ffff';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: PURP,
        tabBarInactiveTintColor: '#999',
        headerShown: true,
        headerStyle: {
          backgroundColor: '#9352be',
          height: 70,
        },
        headerTitle: '',
        headerShadowVisible: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 8,
          shadowColor: '#000',
          shadowOpacity: 0.08,
          shadowRadius: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size ?? 26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="budgets"
        options={{
          title: 'Budgets',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="wallet" size={size ?? 26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="reports"
        options={{
          title: 'Reports',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bar-chart" size={size ?? 26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size ?? 26} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}