import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { db } from "../database/db";

type User = {
  id: number;
  username: string;
  password: string;
  bankLinked: number;
};

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const login = async () => {
  if (!email || !password) {
    Alert.alert("Error", "Please fill all fields");
    return;
  }

  try {
    const database = await db;

    const user = await database.getFirstAsync<User>(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [email, password]
    );

    if (!user) {
      Alert.alert("Login Failed", "Invalid credentials");
      return;
    }

    if (user.bankLinked === 0) {
      router.replace("/connectBank");
    } else {
      router.replace("/home");
    }

    } catch (error) {
      Alert.alert("Error", "Login failed");
    }
  };

  return (
    <View style={styles.container}>
      
      {/* Purple header */}
      <View style={styles.header} />

      {/* Logo Area */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}
        />
      </View>

      {/* Title */}
      <Text style={styles.title}>CoinWiz</Text>
      <Text style={styles.subtitle}>Login to continue</Text>

      {/* Inputs */}
      <TextInput
        placeholder="Email Address"
        placeholderTextColor="#666"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#666"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={login}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      {/* Create account */}
      <TouchableOpacity onPress={() => router.push('/registerName')}>
        <Text style={styles.createAccount}>Create an account</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    alignItems: "center",
  },

  header: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 70,
    backgroundColor: "#A855C1",
  },

  logoContainer: {
    marginTop: 150,
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 20,
  },

  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 30,
  },

  input: {
    width: "80%",
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#DDD",
  },

  loginButton: {
    width: "50%",
    height: 45,
    backgroundColor: "#A855C1",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },

  loginText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },

  createAccount: {
    textDecorationLine: "underline",
    fontSize: 15,
    color: "#444",
  },
});