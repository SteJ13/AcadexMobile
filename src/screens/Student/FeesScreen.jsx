import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import useStyles from '@hooks/useStyles';
import ScreenLayout from '@components/Layout/ScreenLayout';

const FeesScreen = ({ isDrawerScreen = false, onBackPress }) => {
  const { t } = useTranslation();
  const styles = useStyles(createStyles);
  const [activeTab, setActiveTab] = useState('paymentDetails');

  // Mock fee data - in real app, this would come from API
  const feeData = {
    totalOutstanding: 14500,
    paymentTerms: [
      {
        id: 1,
        term: 'Term I',
        amount: 10000,
        dueDate: '01/01/2025',
        status: 'pending',
        color: '#8B5CF6', // Purple
      },
      {
        id: 2,
        term: 'Term II',
        amount: 10000,
        dueDate: '01/01/2025',
        status: 'pending',
        color: '#EC4899', // Pink
      },
      {
        id: 3,
        term: 'Term III',
        amount: 10000,
        dueDate: '01/01/2025',
        status: 'pending',
        color: '#F59E0B', // Yellow
      },
    ],
  };

  const renderPaymentTerm = (term) => (
    <View key={term.id} style={styles.paymentTermCard}>
      <View style={styles.termHeader}>
        <View style={[styles.termIcon, { backgroundColor: term.color }]}>
          <Text style={styles.termIconText}>₹</Text>
        </View>
        <View style={styles.termInfo}>
          <Text style={styles.termName}>{term.term}</Text>
          <Text style={styles.termAmount}>₹{term.amount.toLocaleString()}</Text>
          <Text style={styles.termDueDate}>Due Date: {term.dueDate}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <ScreenLayout 
      title={t('student.fees')}
      isDrawerScreen={isDrawerScreen}
      onBackPress={onBackPress}
    >
      <View style={styles.content}>
        {/* Total Outstanding Card */}
        <View style={styles.outstandingCard}>
          <View style={styles.outstandingHeader}>
            <Text style={styles.outstandingTitle}>Total Outstanding</Text>
            <View style={styles.walletIcon}>
              <Text style={styles.walletIconText}>💳</Text>
            </View>
          </View>
          <Text style={styles.outstandingAmount}>
            ₹{feeData.totalOutstanding.toLocaleString()}
          </Text>
          <TouchableOpacity style={styles.expandButton}>
            <Text style={styles.expandIcon}>▼</Text>
          </TouchableOpacity>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'paymentDetails' && styles.activeTab]}
            onPress={() => setActiveTab('paymentDetails')}
          >
            <Text style={[styles.tabText, activeTab === 'paymentDetails' && styles.activeTabText]}>
              Payment Details
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'paymentHistory' && styles.activeTab]}
            onPress={() => setActiveTab('paymentHistory')}
          >
            <Text style={[styles.tabText, activeTab === 'paymentHistory' && styles.activeTabText]}>
              Payment History
            </Text>
          </TouchableOpacity>
        </View>

        {/* Payment Terms */}
        {activeTab === 'paymentDetails' && (
          <View style={styles.paymentTermsContainer}>
            {feeData.paymentTerms.map(renderPaymentTerm)}
          </View>
        )}

        {/* Payment History */}
        {activeTab === 'paymentHistory' && (
          <View style={styles.paymentHistoryContainer}>
            <Text style={styles.noHistoryText}>No payment history available</Text>
          </View>
        )}
      </View>
    </ScreenLayout>
  );
};

const createStyles = (theme) => StyleSheet.create({
  content: {
    padding: 20,
  },
  outstandingCard: {
    backgroundColor: theme.light,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  outstandingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  outstandingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.dark,
  },
  walletIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  walletIconText: {
    fontSize: 12,
  },
  outstandingAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ff4444',
    marginBottom: 10,
  },
  expandButton: {
    padding: 4,
  },
  expandIcon: {
    fontSize: 16,
    color: '#666',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: theme.primary,
    borderRadius: 8,
    marginBottom: 20,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: theme.light,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.light,
  },
  activeTabText: {
    color: theme.primary,
  },
  paymentTermsContainer: {
    gap: 12,
  },
  paymentTermCard: {
    backgroundColor: theme.light,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  termHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  termIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  termIconText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.light,
  },
  termInfo: {
    flex: 1,
  },
  termName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.dark,
    marginBottom: 4,
  },
  termAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.primary,
    marginBottom: 2,
  },
  termDueDate: {
    fontSize: 12,
    color: '#ff4444',
  },
  paymentHistoryContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  noHistoryText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default FeesScreen;
