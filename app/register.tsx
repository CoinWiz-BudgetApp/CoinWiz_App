import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert, KeyboardAvoidingView, Platform,
  StyleSheet,
  Text, TextInput, TouchableOpacity,
  View,
} from 'react-native';
import { db } from '../database/db';

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pin, setPin] = useState('');

  const register = () => {
    if (!username || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters.');
      return;
    }

    try {
      db.runSync(
        'INSERT INTO users (username, password, recovery_pin) VALUES (?, ?, ?)',
          username,
          password,
          pin || null
      );
      Alert.alert('Success', 'Account created! Please log in.');
      router.replace('/login');
    } catch (error) {
      console.log('DB ERROR:', error);
      Alert.alert('Error', 'Username already exists. Please choose another.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header} />

      <View style={styles.inner}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join CoinWiz to track your finances</Text>

        <Text style={styles.label}>Username *</Text>
        <TextInput
          placeholder="Choose a username"
          placeholderTextColor="#999"
          autoCapitalize="none"
          style={styles.input}
          onChangeText={setUsername}
          value={username}
        />

        <Text style={styles.label}>Password *</Text>
        <TextInput
          placeholder="At least 6 characters"
          placeholderTextColor="#999"
          secureTextEntry
          style={styles.input}
          onChangeText={setPassword}
          value={password}
        />

        <Text style={styles.label}>Confirm Password *</Text>
        <TextInput
          placeholder="Re-enter your password"
          placeholderTextColor="#999"
          secureTextEntry
          style={styles.input}
          onChangeText={setConfirmPassword}
          value={confirmPassword}
        />

        <Text style={styles.label}>Recovery PIN (optional)</Text>
        <TextInput
          placeholder="4-digit PIN for password recovery"
          placeholderTextColor="#999"
          keyboardType="numeric"
          maxLength={4}
          style={styles.input}
          onChangeText={setPin}
          value={pin}
        />

        <TouchableOpacity style={styles.button} onPress={register}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text style={styles.loginLink}>Already have an account? <Text style={styles.loginLinkBold}>Log in</Text></Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F4F4' },
  header: {
    height: 60,
    backgroundColor: '#af63ffff',
  },
  inner: {
    flex: 1,
    padding: 28,
    paddingTop: 32,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 28,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#444',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 18,
    fontSize: 15,
    color: '#1a1a1a',
  },
  button: {
    backgroundColor: '#af63ffff',
    padding: 15,
    borderRadius: 12,
    marginTop: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginLink: {
    textAlign: 'center',
    color: '#555',
    fontSize: 14,
  },
  loginLinkBold: {
    color: '#af63ffff',
    fontWeight: '600',
  },
});
