import { Redirect } from 'expo-router';
import { useAuth } from './AuthContext';

export default function Index() {
  const { user } = useAuth();
  return <Redirect href={user ? '/(tabs)' : '/login'} />;
}