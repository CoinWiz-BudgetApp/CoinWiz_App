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

  // ✅ Fixed: useEffect is now inside the component
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
          <Stack.Screen name="add-expense"     options={{ title: 'Add Expense',     headerTintColor: '#A855C1' }} />
          <Stack.Screen name="budget-details"  options={{ title: 'Budget Details',  headerTintColor: '#A855C1' }} />
          <Stack.Screen name="reports"         options={{ title: 'Reports',         headerTintColor: '#A855C1' }} />
          <Stack.Screen name="settings"        options={{ title: 'Settings',        headerTintColor: '#A855C1' }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </AuthProvider>
  );
}
