import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import useStyles from '../../hooks/useStyles';

const NotificationsScreen = () => {
  const { t } = useTranslation();
  const styles = useStyles(createStyles);

  // Mock notification data
  const notifications = [
    {
      id: '1',
      title: 'New Assignment Posted',
      message: 'Mathematics assignment due tomorrow',
      time: '2 hours ago',
      read: false,
    },
    {
      id: '2',
      title: 'Fee Payment Reminder',
      message: 'Quarterly fee payment is due',
      time: '1 day ago',
      read: true,
    },
    {
      id: '3',
      title: 'Parent-Teacher Meeting',
      message: 'Scheduled for next Friday at 3 PM',
      time: '3 days ago',
      read: true,
    },
  ];

  const renderNotification = ({ item }) => (
    <View style={[styles.notificationItem, !item.read && styles.unreadNotification]}>
      <Text style={styles.notificationTitle}>{item.title}</Text>
      <Text style={styles.notificationMessage}>{item.message}</Text>
      <Text style={styles.notificationTime}>{item.time}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('navigation.notifications')}</Text>
      
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.light,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.dark,
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  notificationItem: {
    backgroundColor: theme.light,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: theme.primary,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  unreadNotification: {
    backgroundColor: theme.primary + '10',
    borderLeftColor: theme.primary,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.dark,
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  notificationTime: {
    fontSize: 12,
    color: '#666',
  },
});

export default NotificationsScreen;
