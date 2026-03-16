import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { db } from '../../database/db';
import { useAuth } from '../AuthContext';

type Expense = { id: number; title: string; amount: number; category: string; date: string };

const CATEGORIES = ['All', 'Food', 'Transport', 'Shopping', 'Health', 'Entertainment', 'Other'];

const CATEGORY_COLORS: Record<string, string> = {
  Food: '#F97316',
  Transport: '#3B82F6',
  Shopping: '#EC4899',
  Health: '#10B981',
  Entertainment: '#8B5CF6',
  Other: '#6B7280',
};

export default function ReportsScreen() {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filter, setFilter] = useState('All');

  const load = () => {
    if (!user) return;
    const rows = db.getAllSync<Expense>(
      'SELECT * FROM expenses WHERE user_id = ? ORDER BY date DESC',
      [user.id]
    );
    setExpenses(rows);
  };

  useFocusEffect(useCallback(load, [user]));

  const deleteExpense = (id: number) => {
    Alert.alert('Delete', 'Remove this expense?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete', style: 'destructive',
        onPress: () => {
          db.runSync('DELETE FROM expenses WHERE id = ?', [id]);
          load();
        },
      },
    ]);
  };

  const filtered = filter === 'All' ? expenses : expenses.filter(e => e.category === filter);
  const total = filtered.reduce((sum, e) => sum + e.amount, 0);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Reports</Text>

        {/* Category filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.chip, filter === cat && styles.chipActive]}
              onPress={() => setFilter(cat)}
            >
              <Text style={[styles.chipText, filter === cat && styles.chipTextActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>{filter === 'All' ? 'Total Spent' : `${filter} Total`}</Text>
          <Text style={styles.summaryAmount}>${total.toFixed(2)}</Text>
          <Text style={styles.summaryCount}>{filtered.length} transaction{filtered.length !== 1 ? 's' : ''}</Text>
        </View>

        {/* Expense list */}
        {filtered.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No expenses in this category.</Text>
          </View>
        ) : (
          filtered.map((e) => (
            <View key={e.id} style={styles.row}>
              <View style={[styles.dot, { backgroundColor: CATEGORY_COLORS[e.category] ?? '#6B7280' }]} />
              <View style={styles.info}>
                <Text style={styles.title}>{e.title}</Text>
                <Text style={styles.meta}>{e.category} · {e.date}</Text>
              </View>
              <Text style={styles.amount}>−${e.amount.toFixed(2)}</Text>
              <TouchableOpacity onPress={() => deleteExpense(e.id)} style={styles.deleteBtn}>
                <Text style={styles.deleteText}>✕</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F8F6FB' },
  container: { padding: 20, paddingBottom: 40 },
  heading: { fontSize: 24, fontWeight: 'bold', color: '#1a1a1a', marginBottom: 16 },
  filterRow: { marginBottom: 20, flexGrow: 0 },
  chip: {
    paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20,
    borderWidth: 1.5, borderColor: '#DDD', backgroundColor: '#FFF', marginRight: 8,
  },
  chipActive: { backgroundColor: '#af63ffff', borderColor: '#af63ffff' },
  chipText: { fontSize: 13, color: '#555', fontWeight: '500' },
  chipTextActive: { color: 'white' },
  summaryCard: {
    backgroundColor: '#af63ffff', borderRadius: 16, padding: 20, marginBottom: 24,
  },
  summaryLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 13 },
  summaryAmount: { color: 'white', fontSize: 34, fontWeight: 'bold', marginTop: 4 },
  summaryCount: { color: 'rgba(255,255,255,0.7)', fontSize: 13, marginTop: 2 },
  empty: { alignItems: 'center', paddingVertical: 40 },
  emptyText: { color: '#aaa', fontSize: 15 },
  row: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#FFF', borderRadius: 12, padding: 14, marginBottom: 10,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 4, elevation: 1,
  },
  dot: { width: 10, height: 10, borderRadius: 5, marginRight: 12 },
  info: { flex: 1 },
  title: { fontSize: 15, fontWeight: '600', color: '#1a1a1a' },
  meta: { fontSize: 12, color: '#888', marginTop: 2 },
  amount: { fontSize: 14, fontWeight: 'bold', color: '#E53E3E', marginRight: 10 },
  deleteBtn: { padding: 4 },
  deleteText: { color: '#CCC', fontSize: 14 },
});
