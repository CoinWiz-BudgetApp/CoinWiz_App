import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView, Platform,
  StyleSheet, Text, TextInput,
  TouchableOpacity, View,
} from 'react-native';
import { useAuth } from '../context/_AuthContext';
import { supabase } from '../database/db';

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter your email and password.');
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.user) {
      Alert.alert('Login Failed', error?.message || 'Invalid credentials.');
      return;
    }

    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('id, username, email')
      .eq('id', data.user.id)
      .single();

    if (profileError || !profile) {
      Alert.alert('Error', 'Could not load user profile.');
      return;
    }

    login(profile);
    router.replace('/(tabs)');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header} />

      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/coin-logo.png')}
          style={styles.logo}
        />
      </View>

      <Text style={styles.title}>CoinWiz</Text>
      <Text style={styles.subtitle}>Login to continue</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#999"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.forgotContainer}
        onPress={() => router.push('/forgot-password')}
      >
        <Text style={styles.forgotText}>Forgot password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/register')}>
        <Text style={styles.createAccount}>Create an account</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    top: 0,
    width: '140%',
    height: 70,
    backgroundColor: '#9352be',
  },
  logoContainer: {
    marginTop: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 16,
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    marginBottom: 28,
    marginTop: 4,
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#DDD',
    fontSize: 15,
    color: '#1a1a1a', 
  },
  forgotContainer: {
    width: '80%',
    alignItems: 'flex-end',
    marginBottom: 16,
    marginTop: -6,
  },
  forgotText: {
    color: '#af63ffff',
    fontSize: 13,
  },
  loginButton: {
    width: '50%',
    height: 48,
    backgroundColor: '#af63ffff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  createAccount: {
    textDecorationLine: 'underline',
    fontSize: 15,
    color: '#555',
  },
});