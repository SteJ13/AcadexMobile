import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import useStyles from '@hooks/useStyles';
import ScreenLayout from '@components/Layout/ScreenLayout';

const StaffFeesScreen = ({ isDrawerScreen = false, onBackPress }) => {
  const { t } = useTranslation();
  const styles = useStyles(createStyles);
  const [activeTab, setActiveTab] = useState('feeManagement');

  // Mock fee management data for staff
  const feeData = {
    totalCollected: 250000,
    pendingFees: 45000,
    feeCategories: [
      { id: '1', category: 'Tuition Fee', collected: 150000, pending: 25000, color: '#8A2BE2' },
      { id: '2', category: 'Transport Fee', collected: 50000, pending: 10000, color: '#FF69B4' },
      { id: '3', category: 'Library Fee', collected: 30000, pending: 5000, color: '#FFD700' },
      { id: '4', category: 'Sports Fee', collected: 20000, pending: 5000, color: '#32CD32' },
    ],
    recentTransactions: [
      { id: 't1', student: 'John Doe', amount: 5000, date: '2024-01-15', status: 'Paid' },
      { id: 't2', student: 'Jane Smith', amount: 3000, date: '2024-01-14', status: 'Pending' },
      { id: 't3', student: 'Mike Johnson', amount: 4500, date: '2024-01-13', status: 'Paid' },
    ],
  };

  const renderFeeCategoryCard = (item) => (
    <View key={item.id} style={[styles.feeCard, { borderLeftColor: item.color }]}>
      <View style={styles.feeCardContent}>
        <Text style={styles.feeCategory}>{item.category}</Text>
        <Text style={styles.feeAmount}>₹{item.collected.toLocaleString()}</Text>
      </View>
      <View style={styles.feeCardFooter}>
        <Text style={styles.feeStatus}>Pending: ₹{item.pending.toLocaleString()}</Text>
      </View>
    </View>
  );

  const renderTransactionItem = (item) => (
    <View key={item.id} style={styles.transactionItem}>
      <View>
        <Text style={styles.studentName}>{item.student}</Text>
        <Text style={styles.transactionDate}>{item.date}</Text>
      </View>
      <View style={styles.transactionRight}>
        <Text style={styles.transactionAmount}>₹{item.amount}</Text>
        <Text style={[
          styles.transactionStatus,
          { color: item.status === 'Paid' ? '#32CD32' : '#FF6B6B' }
        ]}>
          {item.status}
        </Text>
      </View>
    </View>
  );

  return (
    <ScreenLayout 
      title="Staff Fee Management"
      isDrawerScreen={isDrawerScreen}
      onBackPress={onBackPress}
    >
      <View style={styles.content}>
          {/* Summary Cards */}
          <View style={styles.summaryContainer}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Total Collected</Text>
              <Text style={styles.summaryAmount}>₹{feeData.totalCollected.toLocaleString()}</Text>
            </View>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Pending Fees</Text>
              <Text style={[styles.summaryAmount, { color: '#FF6B6B' }]}>
                ₹{feeData.pendingFees.toLocaleString()}
              </Text>
            </View>
          </View>

          {/* Fee Categories */}
          <Text style={styles.sectionTitle}>Fee Categories</Text>
          {feeData.feeCategories.map(renderFeeCategoryCard)}

          {/* Recent Transactions */}
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          {feeData.recentTransactions.map(renderTransactionItem)}
      </View>
    </ScreenLayout>
  );
};

const createStyles = (theme) => StyleSheet.create({
  content: {
    padding: 20,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: theme.cardBackground,
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 14,
    color: theme.textSecondary,
    marginBottom: 5,
  },
  summaryAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.primary,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.dark,
    marginBottom: 15,
    marginTop: 10,
  },
  feeCard: {
    backgroundColor: theme.cardBackground,
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    borderLeftWidth: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  feeCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  feeCategory: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.dark,
  },
  feeAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.primary,
  },
  feeCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  feeStatus: {
    fontSize: 14,
    color: theme.textSecondary,
  },
  transactionItem: {
    backgroundColor: theme.cardBackground,
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  studentName: {
    fontSize: 15,
    fontWeight: '500',
    color: theme.dark,
  },
  transactionDate: {
    fontSize: 12,
    color: theme.textSecondary,
    marginTop: 2,
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 15,
    fontWeight: 'bold',
    color: theme.primary,
  },
  transactionStatus: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
});

export default StaffFeesScreen;
