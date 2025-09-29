import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import useStyles from '@hooks/useStyles';

const IndependentNotificationsScreen = ({ onLoginPress }) => {
  const { t } = useTranslation();
  const styles = useStyles(createStyles);

  // Generic notifications that can be shown without login
  const genericNotifications = [
    {
      id: '1',
      title: 'School Announcement',
      message: 'The school will remain closed for holidays from 26/09/2025 (Friday) to 05/10/2025 (Sunday). Regular classes will resume on 06/10/2025 (Monday).',
      time: '2 hours ago',
      avatar: 'A',
      avatarColor: '#EC4899',
      sender: '- Sacred Heart School, Administrator',
      type: 'announcement',
    },
    {
      id: '2',
      title: 'App Update',
      message: 'A new version of Acadex app is available. Please update to get the latest features and improvements.',
      time: '1 day ago',
      avatar: 'U',
      avatarColor: '#8B5CF6',
      sender: '- Acadex Team',
      type: 'update',
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

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages / Notifications</Text>
        <TouchableOpacity style={styles.loginButton} onPress={onLoginPress}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>

      {/* Login Prompt */}
      <View style={styles.loginPrompt}>
        <Text style={styles.loginPromptTitle}>Login to view your notifications</Text>
        <Text style={styles.loginPromptMessage}>
          Get personalized notifications about your ward's attendance, fees, and school updates.
        </Text>
        <TouchableOpacity style={styles.loginPromptButton} onPress={onLoginPress}>
          <Text style={styles.loginPromptButtonText}>Login Now</Text>
        </TouchableOpacity>
      </View>

      {/* Generic Notifications */}
      <View style={styles.genericSection}>
        <Text style={styles.sectionTitle}>General Announcements</Text>
        <FlatList
          data={genericNotifications}
          renderItem={renderNotification}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
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
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.light,
  },
  loginButton: {
    backgroundColor: theme.light,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  loginButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.primary,
  },
  loginPrompt: {
    backgroundColor: theme.primary + '10',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  loginPromptTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.dark,
    marginBottom: 8,
    textAlign: 'center',
  },
  loginPromptMessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  loginPromptButton: {
    backgroundColor: theme.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  loginPromptButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.light,
  },
  genericSection: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.dark,
    marginBottom: 12,
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

export default IndependentNotificationsScreen;
