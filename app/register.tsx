import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { db } from '../database/db';
import { router } from 'expo-router';

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const register = () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    try {
      db.runSync(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        [username, password]
      );

      Alert.alert('Success', 'Account created');
      router.replace('/login');
    } catch (e) {
      Alert.alert('Error', 'Username may already exist');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        placeholder="Username"
        style={styles.input}
        onChangeText={setUsername}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={register}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/login')}>
        <Text>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create(
  {
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    input: {
        color: 'white',
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
    },
    button: {
        backgroundColor: '#2e78b7',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
    },
    buttonText: { color: 'white', textAlign: 'center', fontWeight: 'bold' },
  }
);