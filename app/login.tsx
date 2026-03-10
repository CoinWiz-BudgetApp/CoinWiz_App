import React from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      
      {/* Purple curved header */}
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
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#666"
        secureTextEntry
        style={styles.input}
      />

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      {/* Create account */}
      <TouchableOpacity>
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
    width: "140%",
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
    justifyContent: "center",
    alignItems: "center",
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