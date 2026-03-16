import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { db } from '../../database/db';
import { useAuth } from '../AuthContext';

const CATEGORIES = ['Food', 'Transport', 'Shopping', 'Health', 'Entertainment', 'Other'];

const CATEGORY_COLORS: Record<string, string> = {
  Food: '#F97316',
  Transport: '#3B82F6',
  Shopping: '#EC4899',
  Health: '#10B981',
  Entertainment: '#8B5CF6',
  Other: '#6B7280',
};

type BudgetRow = { category: string; limit_amount: number; spent: number };

export default function BudgetsScreen() {
  const { user } = useAuth();
  const [budgets, setBudgets] = useState<BudgetRow[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [limitInput, setLimitInput] = useState('');

  const load = () => {
    if (!user) return;
    const rows: BudgetRow[] = CATEGORIES.map((cat) => {
      const budget = db.getFirstSync<{ limit_amount: number }>(
        'SELECT limit_amount FROM budgets WHERE user_id = ? AND category = ?',
        [user.id, cat]
      );
      const spent = db.getFirstSync<{ total: number }>(
        'SELECT COALESCE(SUM(amount), 0) AS total FROM expenses WHERE user_id = ? AND category = ?',
        [user.id, cat]
      );
      return {
        category: cat,
        limit_amount: budget?.limit_amount ?? 0,
        spent: spent?.total ?? 0,
      };
    });
    setBudgets(rows);
  };

  useFocusEffect(useCallback(load, [user]));

  const saveLimit = (category: string) => {
    const val = parseFloat(limitInput);
    if (isNaN(val) || val <= 0) {
      Alert.alert('Error', 'Enter a valid budget amount.');
      return;
    }
    const exists = db.getFirstSync(
      'SELECT id FROM budgets WHERE user_id = ? AND category = ?',
      [user!.id, category]
    );
    if (exists) {
      db.runSync('UPDATE budgets SET limit_amount = ? WHERE user_id = ? AND category = ?',
        [val, user!.id, category]);
    } else {
      db.runSync('INSERT INTO budgets (user_id, category, limit_amount) VALUES (?, ?, ?)',
        [user!.id, category, val]);
    }
    setEditing(null);
    setLimitInput('');
    load();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Budget Overview</Text>
        <Text style={styles.sub}>Tap a category to set a spending limit.</Text>

        {budgets.map((b) => {
          const pct = b.limit_amount > 0 ? Math.min((b.spent / b.limit_amount) * 100, 100) : 0;
          const over = b.limit_amount > 0 && b.spent > b.limit_amount;
          const color = CATEGORY_COLORS[b.category];

          return (
            <View key={b.category} style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <View style={[styles.dot, { backgroundColor: color }]} />
                  <Text style={styles.catName}>{b.category}</Text>
                </View>
                <Text style={styles.amounts}>
                  <Text style={over ? styles.over : styles.spent}>${b.spent.toFixed(2)}</Text>
                  {b.limit_amount > 0 && <Text style={styles.limit}> / ${b.limit_amount.toFixed(2)}</Text>}
                </Text>
              </View>

              {b.limit_amount > 0 && (
                <View style={styles.barTrack}>
                  <View style={[styles.barFill, { width: `${pct}%` as any, backgroundColor: over ? '#EF4444' : color }]} />
                </View>
              )}

              {over && <Text style={styles.overText}>Over budget by ${(b.spent - b.limit_amount).toFixed(2)}</Text>}

              {editing === b.category ? (
                <View style={styles.editRow}>
                  <TextInput
                    placeholder="Set limit"
                    placeholderTextColor="#999"
                    keyboardType="decimal-pad"
                    style={styles.limitInput}
                    value={limitInput}
                    onChangeText={setLimitInput}
                    autoFocus
                  />
                  <TouchableOpacity style={styles.saveBtn} onPress={() => saveLimit(b.category)}>
                    <Text style={styles.saveBtnText}>Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setEditing(null)} style={styles.cancelBtn}>
                    <Text style={styles.cancelText}>✕</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity onPress={() => { setEditing(b.category); setLimitInput(b.limit_amount > 0 ? String(b.limit_amount) : ''); }}>
                  <Text style={styles.setLimit}>{b.limit_amount > 0 ? 'Edit limit' : '+ Set limit'}</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F8F6FB' },
  container: { padding: 20, paddingBottom: 40 },
  heading: { fontSize: 24, fontWeight: 'bold', color: '#1a1a1a', marginBottom: 4 },
  sub: { fontSize: 13, color: '#888', marginBottom: 24 },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  dot: { width: 10, height: 10, borderRadius: 5 },
  catName: { fontSize: 15, fontWeight: '600', color: '#1a1a1a' },
  amounts: { fontSize: 14 },
  spent: { color: '#1a1a1a', fontWeight: '600' },
  over: { color: '#EF4444', fontWeight: '600' },
  limit: { color: '#888' },
  barTrack: { height: 7, backgroundColor: '#F0EEF4', borderRadius: 4, marginBottom: 8, overflow: 'hidden' },
  barFill: { height: 7, borderRadius: 4 },
  overText: { fontSize: 12, color: '#EF4444', marginBottom: 6 },
  setLimit: { fontSize: 13, color: '#af63ffff', marginTop: 4 },
  editRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 8 },
  limitInput: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 14,
    color: '#1a1a1a',
  },
  saveBtn: { backgroundColor: '#af63ffff', borderRadius: 8, paddingHorizontal: 14, paddingVertical: 8 },
  saveBtnText: { color: 'white', fontWeight: '600', fontSize: 13 },
  cancelBtn: { padding: 8 },
  cancelText: { color: '#888', fontSize: 15 },
});
