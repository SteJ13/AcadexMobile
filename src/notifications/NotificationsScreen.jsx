import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import useStyles from '@hooks/useStyles';

const NotificationsScreen = ({ isDrawerScreen = false, onBackPress }) => {
  const { t } = useTranslation();
  const styles = useStyles(createStyles);

  // Mock notification data matching the provided image
  const notificationSections = [
    {
      title: 'Yesterday',
      data: [
        {
          id: '1',
          title: 'Attendance',
          message: 'Dear Parent, Your ward Maria Leo (Admission No: 3247, Class: VI A) was absent on 24/09/2025. Kindly send a leave note to the class teacher.',
          time: '13m ago',
          avatar: 'A',
          avatarColor: '#EC4899',
          sender: '- Sacred Heart School, Administrator',
          read: false,
        },
        {
          id: '2',
          title: 'Announcement',
          message: 'Dear Parent, The school will remain closed for holidays from 26/09/2025 (Friday) to 05/10/2025 (Sunday). Regular classes will resume on 06/10/2025 (Monday).',
          time: '13m ago',
          avatar: 'A',
          avatarColor: '#EC4899',
          sender: '- Sacred Heart School, Administrator',
          read: false,
        },
      ],
    },
    {
      title: 'Today',
      data: [
        {
          id: '3',
          title: 'Fee Reminder',
          message: 'Dear Parent, This is a reminder that the school fee of ₹15,000 for your ward is due on [Due Date]. Kindly make the payment on or before the due date to avoid late fees.',
          time: '13m ago',
          avatar: 'F',
          avatarColor: '#EC4899',
          sender: '- Sacred Heart School, Administrator',
          read: false,
        },
      ],
    },
  ];

  const renderNotification = ({ item }) => (
    <View style={styles.notificationCard}>
      <View style={styles.notificationHeader}>
        <View style={[styles.avatar, { backgroundColor: item.avatarColor }]}>
          <Text style={styles.avatarText}>{item.avatar}</Text>
        </View>
        <View style={styles.notificationContent}>
          <View style={styles.titleRow}>
            <Text style={styles.notificationTitle}>{item.title}</Text>
            <Text style={styles.notificationTime}>{item.time}</Text>
          </View>
          <Text style={styles.notificationMessage}>{item.message}</Text>
          <Text style={styles.sender}>{item.sender}</Text>
        </View>
      </View>
    </View>
  );

  const renderSection = ({ item: section }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      {section.data.map((notification) => (
        <View key={notification.id}>
          {renderNotification({ item: notification })}
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.screenContainer}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.menuButton} onPress={() => {}}>
            <Text style={styles.menuIcon}>☰</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.headerTitle}>Messages / Notifications</Text>
        <View style={styles.headerRight}>
          {/* User profile placeholder */}
        </View>
      </View>

      {/* Content */}
      <FlatList
        data={notificationSections}
        renderItem={renderSection}
        keyExtractor={(item) => item.title}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        style={styles.flatList}
      />
    </View>
  );
};

const createStyles = (theme) => StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: theme.light,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: theme.primary,
  },
  headerLeft: {
    width: 40,
    alignItems: 'flex-start',
  },
  menuButton: {
    padding: 8,
  },
  menuIcon: {
    fontSize: 20,
    color: theme.light,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.light,
    flex: 1,
    textAlign: 'center',
  },
  headerRight: {
    width: 40,
    alignItems: 'flex-end',
  },
  flatList: {
    flex: 1,
  },
  listContainer: {
    padding: 16,
    paddingBottom: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginBottom: 12,
    marginLeft: 4,
  },
  notificationCard: {
    backgroundColor: theme.light,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.light,
  },
  notificationContent: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.dark,
    flex: 1,
  },
  notificationTime: {
    fontSize: 14,
    color: '#007AFF',
    marginLeft: 8,
  },
  notificationMessage: {
    fontSize: 14,
    color: theme.dark,
    lineHeight: 20,
    marginBottom: 8,
  },
  sender: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
});

export default NotificationsScreen;
