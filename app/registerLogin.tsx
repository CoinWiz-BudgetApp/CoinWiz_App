import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { db } from '../database/db';

export default function RegisterLoginScreen() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const createAccount = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    if (password.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      const database = await db;

      await database.runAsync(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        [email, password]
      );

      Alert.alert("Success", "Account created!");
      router.replace('/login');

    } catch (e) {
      Alert.alert("Error", "Account email already exists");
    }
  };

  return (
    <View style={styles.container}>

      {/* Purple Header */}
      <View style={styles.header} />

      {/* Back Button */}
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Image
          source={require('../assets/images/backButton.png')}
          style={styles.backIcon}
        />
      </TouchableOpacity>

      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Create your login</Text>

        <Text style={styles.subtitle}>
          Please enter a valid email address and password.
        </Text>
      </View>

      {/* Inputs */}
      <View style={styles.inputContainer}>

        <TextInput
          placeholder="Email Address"
          style={styles.input}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Create password"
          secureTextEntry
          style={styles.input}
          onChangeText={setPassword}
        />

        <TextInput
          placeholder="Confirm password"
          secureTextEntry
          style={styles.input}
          onChangeText={setConfirmPassword}
        />

        <Text style={styles.passwordHint}>
          Password must be at least{"\n"}8 characters long
        </Text>

      </View>

      {/* Create Account Button */}
      <TouchableOpacity style={styles.button} onPress={createAccount}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
  },

  header: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 70,
    backgroundColor: "#A855C1",
  },

  backButton: {
    position: 'absolute',
    top: 120,
    left: 25,
    width: 45,
    height: 45,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },

  backIcon: {
    width: 40,
    height: 40,
  },

  titleContainer: {
    marginTop: 260,
    alignItems: 'center',
    width: '80%',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  subtitle: {
    textAlign: 'center',
    color: '#444',
  },

  inputContainer: {
    marginTop: 40,
    width: '80%',
  },

  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 14,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },

  passwordHint: {
    textAlign: 'center',
    fontSize: 12,
    color: '#444',
    marginTop: -5,
    marginBottom: 25,
  },

  button: {
    width: '60%',
    backgroundColor: '#a85bb4',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  }

});