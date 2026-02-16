import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { Link } from 'expo-router';

export default function HomeScreen() {
  const balance = 1250.45;
  const expenses = 430.20;
  const remaining = balance - expenses;
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CoinWiz</Text>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Current Balance</Text>
        <Text style={styles.balance}>${balance.toFixed(2)}</Text>
      </View>

      <View style={styles.row}>
        <View style={styles.smallCard}>
          <Text>Expenses</Text>
          <Text style={styles.red}>${expenses.toFixed(2)}</Text>
        </View>

        <View style={styles.smallCard}>
          <Text>Remaining</Text>
          <Text style={styles.green}>${remaining.toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add Expense</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>View Budgets</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      padding: 20,
      paddingTop: 60,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    card: {
      padding: 20,
      borderRadius: 12,
      backgroundColor: '#f2f2f2',
      marginBottom: 20,
    },
    cardLabel: {
      fontSize: 16,
      color: 'gray',
    },
    balance: {
      fontSize: 26,
      fontWeight: 'bold',
      marginTop: 5,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    smallCard: {
      width: '48%',
      padding: 15,
      borderRadius: 12,
      backgroundColor: '#f2f2f2',
    },
    red: {
      color: 'red',
      fontWeight: 'bold',
      marginTop: 5,
    },
    green: {
      color: 'green',
      fontWeight: 'bold',
      marginTop: 5,
    },
    actions: {
      marginTop: 30,
    },
    button: {
      backgroundColor: '#2e78b7',
      padding: 15,
      borderRadius: 10,
      marginBottom: 10,
    },
    buttonText: {
      color: 'white',
      textAlign: 'center',
      fontWeight: 'bold',
    },
  }
);
