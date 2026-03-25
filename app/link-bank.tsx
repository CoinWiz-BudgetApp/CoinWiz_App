import { createPlaidLinkToken, exchangePlaidPublicToken } from '@/lib/plaid';
import React, { useMemo, useState } from 'react';
import { ActivityIndicator, Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { create, LinkExit, LinkSuccess, open } from 'react-native-plaid-link-sdk';
import { useAuth } from './AuthContext';

const PURP = '#af63ffff';

export default function LinkBankScreen() {
  const { user } = useAuth();
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [loadingToken, setLoadingToken] = useState(false);
  const [linking, setLinking] = useState(false);
  const [linkedBankName, setLinkedBankName] = useState<string | null>(null);

  const userId = useMemo(() => String(user?.id ?? user?.username ?? 'coinwiz-user'), [user?.id, user?.username]);

  const handleCreateLinkToken = async () => {
    try {
      setLoadingToken(true);
      const response = await createPlaidLinkToken(userId);
      setLinkToken(response.link_token);
    } catch (error) {
      Alert.alert('Unable to initialize Plaid', error instanceof Error ? error.message : 'Please try again.');
    } finally {
      setLoadingToken(false);
    }
  };

  const handleSuccess = async (success: LinkSuccess) => {
    try {
      setLinking(true);
      await exchangePlaidPublicToken(success.publicToken);

      const institutionName = success.metadata?.institution?.name ?? 'Bank account';
      setLinkedBankName(institutionName);
      setLinkToken(null);
      Alert.alert('Bank linked', `${institutionName} was linked successfully.`);
    } catch (error) {
      Alert.alert('Link failed', error instanceof Error ? error.message : 'Could not finish linking this account.');
    } finally {
      setLinking(false);
    }
  };

  const handleExit = (exit: LinkExit) => {
    if (exit.error) {
      Alert.alert('Plaid closed with an error', exit.error.displayMessage || exit.error.errorMessage || 'Unknown Plaid error');
      return;
    }
    Alert.alert('Plaid closed', 'You can start again whenever you are ready.');
  };

  const handleOpenPlaid = async () => {
    if (!linkToken) return;

    try {
      await create({ token: linkToken });
      open({
        onSuccess: handleSuccess,
        onExit: handleExit,
      });
    } catch (error) {
      Alert.alert('Unable to open Plaid Link', error instanceof Error ? error.message : 'Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.heading}>Link Bank Account</Text>
        <Text style={styles.subheading}>
          Connect to you bank below! We use Plaid to securely link your bank accounts and fetch transactions.
        </Text>

        {linkedBankName ? (
          <View style={styles.successBox}>
            <Text style={styles.successText}>Linked: {linkedBankName}</Text>
          </View>
        ) : null}

        {!linkToken ? (
          <TouchableOpacity style={styles.primaryButton} onPress={handleCreateLinkToken} disabled={loadingToken || linking}>
            {loadingToken ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Initialize Plaid Link</Text>}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.primaryButton, linking ? styles.disabledButton : null]}
            onPress={handleOpenPlaid}
            disabled={linking}
          >
            {linking ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Open Plaid Link</Text>}
          </TouchableOpacity>
        )}

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F8F6FB' },
  container: { flex: 1, padding: 20, gap: 16 },
  heading: { fontSize: 24, fontWeight: 'bold', color: '#1A1A1A' },
  subheading: { fontSize: 14, lineHeight: 20, color: '#4B5563' },
  successBox: {
    backgroundColor: '#ECFDF3',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    borderRadius: 12,
    padding: 12,
  },
  successText: { color: '#047857', fontWeight: '600' },
  primaryButton: {
    backgroundColor: PURP,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
  },
  disabledButton: { opacity: 0.7 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  hint: { color: '#6B7280', fontSize: 13, marginTop: 6 },
});
