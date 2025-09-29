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
    paymentDetails: [
      {
        id: 1,
        term: 'Term I',
        dueDate: '01/01/2025',
        paidAmount: 10000,
        status: 'paid',
        color: '#8B5CF6', // Purple
      },
      {
        id: 2,
        term: 'Term II',
        dueDate: '15/01/2025',
        paidAmount: 10000,
        status: 'paid',
        color: '#EC4899', // Pink
      },
      {
        id: 3,
        term: 'Term III',
        dueDate: '05/02/2025',
        paidAmount: 5000,
        status: 'paid',
        color: '#F59E0B', // Yellow
      },
    ],
    paymentHistory: [
      {
        id: 1,
        term: 'Term I',
        dueDate: '01/01/2025',
        paidAmount: 10000,
        paymentDate: '28/12/2024',
        paymentMethod: 'Online Banking',
        transactionId: 'TXN001234',
        status: 'completed',
      },
      {
        id: 2,
        term: 'Term I',
        dueDate: '15/01/2025',
        paidAmount: 10000,
        paymentDate: '10/01/2025',
        paymentMethod: 'Credit Card',
        transactionId: 'TXN001235',
        status: 'completed',
      },
      {
        id: 3,
        term: 'Term II',
        dueDate: '05/02/2025',
        paidAmount: 5000,
        paymentDate: '01/02/2025',
        paymentMethod: 'UPI',
        transactionId: 'TXN001236',
        status: 'completed',
      },
      {
        id: 4,
        term: 'Term III',
        dueDate: '25/03/2025',
        paidAmount: 5000,
        paymentDate: '20/03/2025',
        paymentMethod: 'Net Banking',
        transactionId: 'TXN001237',
        status: 'completed',
      },
    ],
  };

  const renderPaymentDetailsCards = () => (
    <View style={styles.paymentCardsContainer}>
      {feeData.paymentDetails.map((payment) => (
        <View key={payment.id} style={styles.paymentCard}>
          <View style={styles.cardHeader}>
            <View style={[styles.termIcon, { backgroundColor: payment.color }]}>
              <Text style={styles.termIconText}>₹</Text>
            </View>
            <View style={styles.termInfo}>
              <Text style={styles.termName}>{payment.term}</Text>
            </View>
            <View style={styles.termDetails}>
              <Text style={styles.termAmount}>₹ {payment.paidAmount.toLocaleString()}</Text>
              <Text style={styles.termDueDate}>Due Date: {payment.dueDate}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );

  const renderPaymentHistoryTable = () => (
    <View style={styles.tableContainer}>
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>Term</Text>
        <Text style={styles.headerText}>Payment Date</Text>
        <Text style={styles.headerText}>Amount</Text>
        <Text style={styles.headerText}>Method</Text>
      </View>
      {feeData.paymentHistory.map((payment, index) => (
        <View key={payment.id} style={[styles.tableRow, index > 0 && styles.tableRowBorder]}>
          <Text style={styles.termText}>{payment.term}</Text>
          <Text style={styles.paymentDateText}>{payment.paymentDate}</Text>
          <Text style={styles.paidAmountText}>₹ {payment.paidAmount.toLocaleString()}</Text>
          <Text style={styles.paymentMethodText}>{payment.paymentMethod}</Text>
        </View>
      ))}
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

        {/* Payment Details Cards */}
        {activeTab === 'paymentDetails' && renderPaymentDetailsCards()}

        {/* Payment History Table */}
        {activeTab === 'paymentHistory' && renderPaymentHistoryTable()}
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
  // Payment Cards styles
  paymentCardsContainer: {
    gap: 12,
  },
  paymentCard: {
    backgroundColor: theme.light,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
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
  },
  termDetails: {
    alignItems: 'flex-end',
  },
  termAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 2,
  },
  termDueDate: {
    fontSize: 12,
    color: '#ff4444',
  },
  // Table styles
  tableContainer: {
    backgroundColor: theme.light,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingBottom: 12,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: theme.dark,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    alignItems: 'center',
  },
  tableRowBorder: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  termText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: theme.dark,
    textAlign: 'center',
  },
  dueDateText: {
    flex: 1,
    fontSize: 14,
    color: theme.dark,
    textAlign: 'center',
  },
  paymentDateText: {
    flex: 1,
    fontSize: 14,
    color: theme.dark,
    textAlign: 'center',
  },
  paidAmountText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
    textAlign: 'center',
  },
  paymentMethodText: {
    flex: 1,
    fontSize: 14,
    color: theme.dark,
    textAlign: 'center',
  },
});

export default FeesScreen;
