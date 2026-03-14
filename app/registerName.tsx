import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function RegisterScreen() {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const continueRegister = () => {
    if (!firstName || !lastName) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    router.push({
      pathname: '/registerLogin',
      params: {
        firstName: firstName,
        lastName: lastName
      }
    });
  };

  return (
    <View style={styles.container}>

      {/* Purple Top Shape */}
      <View style={styles.header} />

      {/* Title Section */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>What’s your name?</Text>
        <Text style={styles.subtitle}>
          Please provide your full, legal name below to get started.
        </Text>
      </View>

      {/* Inputs */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="First name"
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
        />

        <TextInput
          placeholder="Last name"
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
        />
      </View>

      {/* Continue Button */}
      <TouchableOpacity style={styles.button} onPress={continueRegister}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

      {/* Login Option */}
      <TouchableOpacity 
        style={styles.loginContainer}
        onPress={() => router.push('/login')}
      >
        <Text style={styles.loginText}>
          Already have an account?{" "}
          <Text style={styles.loginLink}>Login</Text>
        </Text>
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

  titleContainer: {
    marginTop: 220,
    alignItems: 'center',
    width: '80%',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },

  subtitle: {
    textAlign: 'center',
    color: '#444',
    width: "70%"
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

  button: {
    marginTop: 20,
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
  },

  loginContainer: {
    marginTop: 20,
  },

  loginText: {
    color: '#444',
  },

  loginLink: {
    color: '#a85bb4',
    fontWeight: 'bold',
  }

});