import { router } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const transactions = [
  { id: '1', name: 'Publix', category: 'Grocery', amount: '-$54.20' },
  { id: '2', name: 'RaceTrac', category: 'Gas', amount: '-$26.80' },
  { id: '3', name: 'McDonalds', category: 'Food', amount: '-$13.12' },
  { id: '4', name: 'Chick-fil-A', category: 'Food', amount: '-$16.12' },
  { id: '5', name: 'Kroger', category: 'Grocery', amount: '-$9.43' },
  { id: '6', name: 'RaceTrac', category: 'Gas', amount: '-$5.19' },
];

const ProgressRing = ({ percent }: { percent: number }) => {
  const radius = 80;
  const strokeWidth = 20;
  const circumference = 2 * Math.PI * radius;

  const progress = circumference - (percent / 100) * circumference;

  const getColor = () => {
    if (percent < 70) return "#4CAF50"; // green
    if (percent < 100) return "#f0c419"; // yellow
    return "#E53935"; // red
  };

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Svg width={200} height={200}>
        {/* Background ring */}
        <Circle
          stroke="#ddd"
          fill="none"
          cx="100"
          cy="100"
          r={radius}
          strokeWidth={strokeWidth}
        />

        {/* Progress ring */}
        <Circle
          stroke={getColor()}
          fill="none"
          cx="100"
          cy="100"
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          strokeLinecap="round"
          rotation="-90"
          origin="100, 100"
        />
      </Svg>

      {/* Percentage text */}
      <Text style={{
        position: 'absolute',
        fontSize: 28,
        fontWeight: 'bold',
      }}>
        {percent}%
      </Text>
    </View>
  );
};

export default function HomeScreen() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const budget = 1000; // replace with DB value later
  const spent = 500; // replace with DB value later
  // use this to replace both const budget & spent: const totalSpent = await db.getFirstAsync("SELECT SUM(amount) as total FROM transactions");

  const percentage = Math.min((spent / budget) * 100, 100);

  return (
    <View style={styles.container}>

      {/* Sidebar */}
      {sidebarOpen && (
        <View style={styles.sidebar}>
          <TouchableOpacity onPress={() => setSidebarOpen(false)}>
            <Image
              source={require('../assets/images/sidebarButton.png')}
              style={styles.sidebarBack}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.replace('/home')}>
            <Text style={styles.sidebarText}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/profile')}>
            <Text style={styles.sidebarText}>Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/reports')}>
            <Text style={styles.sidebarText}>Reports</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/settings')}>
            <Text style={styles.sidebarText}>Settings</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Main Content */}
      <View style={styles.main}>

        {/* Header */}
        <View style={styles.header} />

        {/* Menu Button */}
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setSidebarOpen(true)}
        >
          <Image
            source={require('../assets/images/menuButton.png')}
            style={styles.menuIcon}
          />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>Budget Spent</Text>

        {/* Status Ring */}
        <ProgressRing percent={percentage} />

        {/* Transactions */}
        <Text style={styles.sectionTitle}>Recent Transactions</Text>

        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          style={styles.list}
          renderItem={({ item }) => (
            <View style={styles.transaction}>
              <Image
                //source={require('../assets/icon.png')}
                style={styles.icon}
              />
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.category}>{item.category}</Text>
              <Text style={styles.amount}>{item.amount}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'row',
  },

  main: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
  },

  header: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 70,
    backgroundColor: "#A855C1",
  },

  menuButton: {
    position: 'absolute',
    top: 95,
    left: 25,
    padding: 10,
    borderRadius: 25,
  },

  menuIcon: {
    width: 40,
    height: 40,
  },

  title: {
    marginTop: 150,
    fontSize: 22,
    fontWeight: 'bold',
  },

  circle: {
    marginTop: 20,
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 20,
    borderColor: '#f0c419',
    justifyContent: 'center',
    alignItems: 'center',
  },

  percent: {
    fontSize: 28,
    fontWeight: 'bold',
  },

  sectionTitle: {
    marginTop: 30,
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginLeft: 20,
  },

  list: {
    width: '90%',
    marginTop: 10,
    backgroundColor: '#ddd',
    borderRadius: 10,
    padding: 10,
  },

  transaction: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },

  name: {
    flex: 1,
  },

  category: {
    flex: 1,
    color: '#555',
  },

  amount: {
    fontWeight: 'bold',
  },

  /* Sidebar */
  sidebar: {
    position: 'absolute',
    width: '65%',
    height: '100%',
    backgroundColor: '#5b2a5f',
    paddingTop: 105,
    paddingLeft: 35,
    zIndex: 10,
  },

  sidebarBack: {
    width: 40,
    height: 40,
    marginBottom: 60,
  },

  sidebarText: {
    color: 'white',
    fontSize: 25,
    marginBottom: 50,
    fontWeight: '600',
  },
});