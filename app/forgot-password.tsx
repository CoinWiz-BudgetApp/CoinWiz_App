import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert, KeyboardAvoidingView, Platform,
  StyleSheet,
  Text, TextInput, TouchableOpacity,
  View,
} from 'react-native';
import { supabase } from '../database/db';

type Step = 'verify' | 'reset';

export default function ForgotPasswordScreen() {
  const [step, setStep] = useState<Step>('verify');
  const [username, setUsername] = useState('');
  const [pin, setPin] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verifiedEmail, setVerifiedEmail] = useState<string | null>(null);

  const verifyPin = async () => {
    if (!username || !pin) {
      Alert.alert('Error', 'Please enter your username and PIN.');
      return;
    }

    const { data, error } = await supabase
      .from('users')
      .select('email')
      .eq('username', username)
      .eq('recovery_pin', pin)
      .single();

    if (error || !data) {
      Alert.alert('Error', 'Username or PIN is incorrect.');
      return;
    }

    setVerifiedEmail(data.email);
    setStep('reset');
  };

  const resetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in both password fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
    if (newPassword.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters.');
      return;
    }

    if (!verifiedEmail) return;

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      Alert.alert('Error', error.message);
      return;
    }

    Alert.alert('Success', 'Password reset! Please log in with your new password.', [
      { text: 'OK', onPress: () => router.replace('/login') },
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header} />

      <View style={styles.inner}>
        <Text style={styles.title}>Password Recovery</Text>
        <Text style={styles.subtitle}>
          {step === 'verify'
            ? 'Enter your username and recovery PIN to continue.'
            : 'Enter your new password below.'}
        </Text>

        {step === 'verify' ? (
          <>
            <Text style={styles.label}>Username</Text>
            <TextInput
              placeholder="Your username"
              placeholderTextColor="#999"
              autoCapitalize="none"
              style={styles.input}
              onChangeText={setUsername}
              value={username}
            />

            <Text style={styles.label}>Recovery PIN</Text>
            <TextInput
              placeholder="4-digit PIN"
              placeholderTextColor="#999"
              keyboardType="numeric"
              maxLength={4}
              style={styles.input}
              onChangeText={setPin}
              value={pin}
            />

            <TouchableOpacity style={styles.button} onPress={verifyPin}>
              <Text style={styles.buttonText}>Verify PIN</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.label}>New Password</Text>
            <TextInput
              placeholder="At least 6 characters"
              placeholderTextColor="#999"
              secureTextEntry
              style={styles.input}
              onChangeText={setNewPassword}
              value={newPassword}
            />

            <Text style={styles.label}>Confirm New Password</Text>
            <TextInput
              placeholder="Re-enter new password"
              placeholderTextColor="#999"
              secureTextEntry
              style={styles.input}
              onChangeText={setConfirmPassword}
              value={confirmPassword}
            />

            <TouchableOpacity style={styles.button} onPress={resetPassword}>
              <Text style={styles.buttonText}>Reset Password</Text>
            </TouchableOpacity>
          </>
        )}

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backLink}>Back</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F4F4' },
  header: { height: 70, backgroundColor: '#9352be', },
  inner: { flex: 1, padding: 28, paddingTop: 32 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#1a1a1a', marginBottom: 6 },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 28 },
  label: { fontSize: 13, fontWeight: '600', color: '#444', marginBottom: 6 },
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
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  backLink: { textAlign: 'center', color: '#af63ffff', fontSize: 14 },
});