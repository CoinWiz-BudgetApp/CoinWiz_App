import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAuth } from '../context/_AuthContext';
import { supabase } from '../database/db';

const CATEGORIES = ['Food', 'Transport', 'Shopping', 'Health', 'Entertainment', 'Other'];

const CATEGORY_COLORS: Record<string, string> = {
  Food: '#F97316',
  Transport: '#3B82F6',
  Shopping: '#EC4899',
  Health: '#10B981',
  Entertainment: '#8B5CF6',
  Other: '#6B7280',
};

export default function AddExpenseScreen() {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');

  const today = new Date().toISOString().split('T')[0];

  const handleAdd = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a title for the expense.');
      return;
    }

    const parsed = parseFloat(amount);
    if (isNaN(parsed) || parsed <= 0) {
      Alert.alert('Error', 'Please enter a valid amount.');
      return;
    }

    const { error } = await supabase
      .from('expenses')
      .insert([
        {
          user_id: user!.id,
          title: title.trim(),
          amount: parsed,
          category,
          date: today,
        },
      ]);

    if (error) {
      Alert.alert('Error', error.message);
      return;
    }

    Alert.alert('Added!', `${title} — $${parsed.toFixed(2)} added.`, [
      { text: 'Done', onPress: () => router.back() },
      { text: 'Add Another', onPress: () => { setTitle(''); setAmount(''); } },
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header} />

      <View style={styles.inner}>
        <Text style={styles.title}>New Expense</Text>

        <Text style={styles.label}>Title</Text>
        <TextInput
          placeholder="e.g. Groceries, Uber, Netflix"
          placeholderTextColor="#999"
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Amount ($)</Text>
        <TextInput
          placeholder="0.00"
          placeholderTextColor="#999"
          keyboardType="decimal-pad"
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
        />

        <Text style={styles.label}>Category</Text>
        <View style={styles.categoryGrid}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryChip,
                category === cat && {
                  backgroundColor: CATEGORY_COLORS[cat],
                  borderColor: CATEGORY_COLORS[cat],
                },
              ]}
              onPress={() => setCategory(cat)}
            >
              <Text
                style={[
                  styles.categoryChipText,
                  category === cat && { color: 'white' },
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.dateLabel}>Date: {today}</Text>

        <TouchableOpacity style={styles.button} onPress={handleAdd}>
          <Text style={styles.buttonText}>Add Expense</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F4F4F4' 
  },
  header: {
    height: 70,
    backgroundColor: '#9352be',
  },
  inner: {
    flex: 1,
    padding: 28,
    paddingTop: 32,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#444',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 18,
    fontSize: 15,
    color: '#1a1a1a',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  categoryChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#DDD',
    backgroundColor: '#FFF',
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#444',
  },
  dateLabel: {
    color: '#888',
    fontSize: 13,
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#af63ffff',
    padding: 15,
    borderRadius: 12,
    marginTop: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButton: {
    alignItems: 'center',
    padding: 12,
  },
  cancelText: {
    color: '#888',
    fontSize: 15,
  },
});