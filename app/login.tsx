import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView, Platform,
  StyleSheet, Text, TextInput,
  TouchableOpacity, View,
} from 'react-native';
import { db } from '../database/db';
import { useAuth } from './AuthContext';

export default function LoginScreen() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter your username and password.');
      return;
    }

    try {
      const user = db.getFirstSync<{ id: number; username: string }>(
        'SELECT id, username FROM users WHERE username = ? AND password = ?',
        [username, password]
      );

      if (user) {
        login(user);
        router.replace('/(tabs)');
      } else {
        Alert.alert('Login Failed', 'Incorrect username or password.');
      }
    } catch (e) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Purple curved header */}
      <View style={styles.header} />

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/react-logo.png')}
          style={styles.logo}
        />
      </View>

      <Text style={styles.title}>CoinWiz</Text>
      <Text style={styles.subtitle}>Login to continue</Text>

      <TextInput
        placeholder="Username"
        placeholderTextColor="#999"
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
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

      {/* Forgot password */}
      <TouchableOpacity
        style={styles.forgotContainer}
        onPress={() => router.push('/forgot-password')}
      >
        <Text style={styles.forgotText}>Forgot password?</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      {/* Create account */}
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
    backgroundColor: '#A855C1',
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
    color: '#1a1a1a',   // ✅ Visible text color
  },
  forgotContainer: {
    width: '80%',
    alignItems: 'flex-end',
    marginBottom: 16,
    marginTop: -6,
  },
  forgotText: {
    color: '#A855C1',
    fontSize: 13,
  },
  loginButton: {
    width: '50%',
    height: 48,
    backgroundColor: '#A855C1',
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