import React, { useState } from 'react';
import { Image, StyleSheet, Switch, Text, TouchableOpacity, View, } from 'react-native';
import Sidebar from '../components/Sidebar';

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <View style={styles.container}>
      
      <Sidebar
        visible={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Purple Header */}
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
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Settings</Text>
      </View>

      {/* Account Section */}
      <Text style={styles.sectionTitle}>Account</Text>

      <View style={styles.card}>
        <SettingRow text="Change Password" />
        <Divider />
        <SettingRow text="Manage Bank Connection" />
        <Divider />
        <SettingRow text="Security" />
        <Divider />
        <SettingRow text="Delete Account" />
      </View>

      {/* App Section */}
      <Text style={styles.sectionTitle}>App</Text>

      <View style={styles.card}>
        {/* Dark Mode */}
        <View style={styles.row}>
          <Text style={styles.rowText}>Dark Appearance</Text>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
          />
        </View>

        <Divider />
        <SettingRow text="Currency" />
        <Divider />
        <SettingRow text="Terms of Service" />
      </View>

    </View>
  );
}

/* Reusable Row Component */
const SettingRow = ({ text }: { text: string }) => (
  <TouchableOpacity style={styles.row}>
    <Text style={styles.rowText}>{text}</Text>
    <Text style={styles.arrow}>›</Text>
  </TouchableOpacity>
);

/* Divider */
const Divider = () => <View style={styles.divider} />;

/* Styles */
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    paddingTop: 110,
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

  titleContainer: {
    alignSelf: 'center',
    backgroundColor: '#ddd',
    paddingHorizontal: 25,
    paddingVertical: 8,
    borderRadius: 50,
    marginBottom: 25,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 25,
    marginTop: 20,
    marginBottom: 10,
  },

  card: {
    backgroundColor: '#ddd',
    marginHorizontal: 20,
    borderRadius: 10,
    paddingVertical: 5,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
  },

  rowText: {
    fontSize: 16,
    color: '#333',
  },

  arrow: {
    fontSize: 20,
    color: '#777',
  },

  divider: {
    height: 1,
    backgroundColor: '#bbb',
    marginHorizontal: 10,
  },
});