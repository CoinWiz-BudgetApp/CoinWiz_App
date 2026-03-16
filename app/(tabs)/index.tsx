import { IconSymbol } from '@/components/ui/icon-symbol';
import { router, useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { db } from '../../database/db';
import { useAuth } from '../AuthContext';

type Expense = {
  id: number;
  title: string;
  amount: number;
  category: string;
  date: string;
};

const CATEGORY_COLORS: Record<string, string> = {
  Food: '#F97316',
  Transport: '#3B82F6',
  Shopping: '#EC4899',
  Health: '#10B981',
  Entertainment: '#8B5CF6',
  Other: '#6B7280',
};

export default function HomeScreen() {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [totalExpenses, setTotalExpenses] = useState(0);

  // Mock balance for now — replace with real budget data later
  const balance = 2000;
  const remaining = balance - totalExpenses;

  useFocusEffect(
    useCallback(() => {
      if (!user) return;
      const rows = db.getAllSync<Expense>(
        'SELECT * FROM expenses WHERE user_id = ? ORDER BY date DESC LIMIT 5',
        [user.id]
      );
      setExpenses(rows);

      const result = db.getFirstSync<{ total: number }>(
        'SELECT COALESCE(SUM(amount), 0) AS total FROM expenses WHERE user_id = ?',
        [user.id]
      );
      setTotalExpenses(result?.total ?? 0);
    }, [user])
  );

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.greeting}>Hello, {user?.username} 👋</Text>
            <Text style={styles.subGreeting}>Here's your financial summary</Text>
          </View>
        </View>

        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Monthly Balance</Text>
          <Text style={styles.balanceAmount}>${balance.toFixed(2)}</Text>
          <View style={styles.balanceRow}>
            <View style={styles.balanceStat}>
              <Text style={styles.statLabel}>Expenses</Text>
              <Text style={styles.statRed}>−${totalExpenses.toFixed(2)}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.balanceStat}>
              <Text style={styles.statLabel}>Remaining</Text>
              <Text style={[styles.statGreen, remaining < 0 && styles.statRed]}>
                ${remaining.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => router.push('/add-expense')}
          >
            <IconSymbol name="plus.circle.fill" size={28} color="#A855C1" />
            <Text style={styles.actionLabel}>Add Expense</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => router.push('/(tabs)/budgets')}
          >
            <IconSymbol name="chart.pie.fill" size={28} color="#3B82F6" />
            <Text style={styles.actionLabel}>View Budget</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => router.push('/(tabs)/reports')}
          >
            <IconSymbol name="chart.bar.fill" size={28} color="#10B981" />
            <Text style={styles.actionLabel}>Reports</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => router.push('/(tabs)/settings')}
          >
            <IconSymbol name="gearshape.fill" size={28} color="#F97316" />
            <Text style={styles.actionLabel}>Settings</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Expenses */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Expenses</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/reports')}>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>

        {expenses.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No expenses yet.</Text>
            <TouchableOpacity onPress={() => router.push('/add-expense')}>
              <Text style={styles.emptyLink}>Add your first expense →</Text>
            </TouchableOpacity>
          </View>
        ) : (
          expenses.map((e) => (
            <View key={e.id} style={styles.expenseRow}>
              <View style={[styles.categoryDot, { backgroundColor: CATEGORY_COLORS[e.category] ?? '#6B7280' }]} />
              <View style={styles.expenseInfo}>
                <Text style={styles.expenseTitle}>{e.title}</Text>
                <Text style={styles.expenseCategory}>{e.category} · {e.date}</Text>
              </View>
              <Text style={styles.expenseAmount}>−${e.amount.toFixed(2)}</Text>
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
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  greeting: { fontSize: 22, fontWeight: 'bold', color: '#1a1a1a' },
  subGreeting: { fontSize: 13, color: '#888', marginTop: 2 },

  balanceCard: {
    backgroundColor: '#ffcd62ff',
    borderRadius: 20,
    padding: 24,
    marginBottom: 28,
  },
  balanceLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 14 },
  balanceAmount: { color: 'white', fontSize: 38, fontWeight: 'bold', marginVertical: 6 },
  balanceRow: { flexDirection: 'row', marginTop: 12 },
  balanceStat: { flex: 1, alignItems: 'center' },
  statLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 12 },
  statRed: { color: '#FFB3B3', fontWeight: 'bold', fontSize: 16, marginTop: 2 },
  statGreen: { color: '#A7F3D0', fontWeight: 'bold', fontSize: 16, marginTop: 2 },
  divider: { width: 1, backgroundColor: 'rgba(255,255,255,0.3)' },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: '#1a1a1a', marginBottom: 14 },
  seeAll: { fontSize: 13, color: '#ffcd62ff', marginBottom: 14 },

  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 28 },
  actionCard: {
    width: '47%',
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 18,
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  actionLabel: { fontSize: 13, fontWeight: '600', color: '#333' },

  emptyState: { alignItems: 'center', paddingVertical: 30 },
  emptyText: { color: '#999', fontSize: 15 },
  emptyLink: { color: '#ffcd62ff', marginTop: 8, fontSize: 14 },

  expenseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  categoryDot: { width: 10, height: 10, borderRadius: 5, marginRight: 12 },
  expenseInfo: { flex: 1 },
  expenseTitle: { fontSize: 15, fontWeight: '600', color: '#1a1a1a' },
  expenseCategory: { fontSize: 12, color: '#888', marginTop: 2 },
  expenseAmount: { fontSize: 15, fontWeight: 'bold', color: '#E53E3E' },
});
