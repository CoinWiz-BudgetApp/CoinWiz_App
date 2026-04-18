import { useColorScheme } from '@/hooks/use-color-scheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { AuthProvider } from './AuthContext';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="index"           options={{ headerShown: false }} />
          <Stack.Screen name="login"           options={{ headerShown: false }} />
          <Stack.Screen name="register"        options={{ headerShown: false }} />
          <Stack.Screen name="forgot-password" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)"          options={{ headerShown: false }} />
          <Stack.Screen name="add-expense"     options={{ title: '', headerStyle: { backgroundColor: '#c774f7' }, headerTintColor: 'rgb(250, 250, 250)' }} />
          <Stack.Screen name="link-bank"       options={{ title: '', headerStyle: { backgroundColor: '#c774f7' }, headerTintColor: 'rgb(250, 250, 250)' }} />
          <Stack.Screen name="budget-details"  options={{ title: 'Budget Details',  headerTintColor: '#af63ffff' }} />
          <Stack.Screen name="reports"         options={{ title: 'Reports',         headerTintColor: '#af63ffff' }} />
          <Stack.Screen name="settings"        options={{ title: 'Settings',        headerTintColor: '#af63ffff' }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </AuthProvider>
  );
}