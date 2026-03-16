import { useColorScheme } from '@/hooks/use-color-scheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { initDB } from '../database/db';
import { AuthProvider } from './AuthContext';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    initDB();
  }, []);

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="index"           options={{ headerShown: false }} />
          <Stack.Screen name="login"           options={{ headerShown: false }} />
          <Stack.Screen name="register"        options={{ headerShown: false }} />
          <Stack.Screen name="forgot-password" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)"          options={{ headerShown: false }} />
          <Stack.Screen name="add-expense"     options={{ title: 'Add Expense',     headerTintColor: '#ffcd62ff' }} />
          <Stack.Screen name="budget-details"  options={{ title: 'Budget Details',  headerTintColor: '#ffcd62ff' }} />
          <Stack.Screen name="reports"         options={{ title: 'Reports',         headerTintColor: '#ffcd62ff' }} />
          <Stack.Screen name="settings"        options={{ title: 'Settings',        headerTintColor: '#ffcd62ff' }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </AuthProvider>
  );
}
