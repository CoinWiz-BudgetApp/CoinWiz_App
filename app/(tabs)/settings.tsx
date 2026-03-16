import { IconSymbol } from '@/components/ui/icon-symbol';
import { router } from 'expo-router';
import React from 'react';
import {
    Alert,
    SafeAreaView, ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useAuth } from '../AuthContext';

type SettingRowProps = {
  icon: string;
  label: string;
  color?: string;
  onPress: () => void;
};

function SettingRow({ icon, label, color = '#333', onPress }: SettingRowProps) {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      <IconSymbol name={icon as any} size={20} color={color} style={styles.rowIcon} />
      <Text style={[styles.rowLabel, { color }]}>{label}</Text>
      <Text style={styles.rowArrow}>›</Text>
    </TouchableOpacity>
  );
}

export default function SettingsScreen() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log Out', style: 'destructive',
        onPress: () => {
          logout();
          router.replace('/login');
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Settings</Text>

        {/* Account card */}
        <View style={styles.accountCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.username?.[0]?.toUpperCase() ?? '?'}
            </Text>
          </View>
          <View>
            <Text style={styles.accountName}>{user?.username}</Text>
            <Text style={styles.accountSub}>CoinWiz Account</Text>
          </View>
        </View>

        {/* Settings sections */}
        <Text style={styles.sectionLabel}>Account</Text>
        <View style={styles.section}>
          <SettingRow
            icon="lock.fill"
            label="Change Password"
            onPress={() => router.push('/forgot-password')}
          />
        </View>

        <Text style={styles.sectionLabel}>App</Text>
        <View style={styles.section}>
          <SettingRow
            icon="bell.fill"
            label="Notifications"
            onPress={() => Alert.alert('Coming soon', 'Notifications settings coming in a future update.')}
          />
          <SettingRow
            icon="questionmark.circle.fill"
            label="Help & Support"
            onPress={() => Alert.alert('Help', 'Contact support at support@coinwiz.app')}
          />
        </View>

        <Text style={styles.sectionLabel}>Danger Zone</Text>
        <View style={styles.section}>
          <SettingRow
            icon="arrow.left.square.fill"
            label="Log Out"
            color="#EF4444"
            onPress={handleLogout}
          />
        </View>

        <Text style={styles.version}>CoinWiz v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F8F6FB' },
  container: { padding: 20, paddingBottom: 40 },
  heading: { fontSize: 24, fontWeight: 'bold', color: '#1a1a1a', marginBottom: 24 },

  accountCard: {
    flexDirection: 'row', alignItems: 'center', gap: 16,
    backgroundColor: '#FFF', borderRadius: 16, padding: 18, marginBottom: 28,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, elevation: 2,
  },
  avatar: {
    width: 52, height: 52, borderRadius: 26,
    backgroundColor: '#af63ffff', alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { color: 'white', fontSize: 22, fontWeight: 'bold' },
  accountName: { fontSize: 17, fontWeight: '700', color: '#1a1a1a' },
  accountSub: { fontSize: 13, color: '#888', marginTop: 2 },

  sectionLabel: { fontSize: 12, fontWeight: '700', color: '#888', textTransform: 'uppercase', marginBottom: 8, marginLeft: 4 },
  section: {
    backgroundColor: '#FFF', borderRadius: 14, marginBottom: 20,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 4, elevation: 1, overflow: 'hidden',
  },
  row: {
    flexDirection: 'row', alignItems: 'center', padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#F0EEF4',
  },
  rowIcon: { marginRight: 12 },
  rowLabel: { flex: 1, fontSize: 15 },
  rowArrow: { color: '#CCC', fontSize: 20 },

  version: { textAlign: 'center', color: '#CCC', fontSize: 12, marginTop: 10 },
});
