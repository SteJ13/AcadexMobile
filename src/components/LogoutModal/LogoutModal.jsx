import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import useStyles from '@hooks/useStyles';
import { useAuth } from '@context/AuthContext';
import GradientButton from '@components/FormControls/GradientButton';

const LogoutModal = ({ visible, onClose }) => {
  const { t } = useTranslation();
  const styles = useStyles(createStyles);
  const { user, users, logoutCurrentUser, logoutAllUsers } = useAuth();

  const handleLogoutCurrent = () => {
    Alert.alert(
      t('auth.logoutConfirm'),
      `Are you sure you want to logout ${user?.memberName}? ${users.length > 1 ? 'You will be switched to another user.' : 'You will be logged out completely.'}`,
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('common.confirm'),
          onPress: async () => {
            await logoutCurrentUser();
            onClose();
          },
        },
      ]
    );
  };

  const handleLogoutAll = () => {
    Alert.alert(
      'Logout All Users',
      'Are you sure you want to logout all users? This will remove all saved accounts and return you to the login screen.',
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('common.confirm'),
          onPress: async () => {
            await logoutAllUsers();
            onClose();
          },
        },
      ]
    );
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Logout Options</Text>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={onClose}
            >
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.content}>
            <Text style={styles.description}>
              Choose how you want to logout:
            </Text>
            
            <View style={styles.optionsContainer}>
              <TouchableOpacity 
                style={styles.optionButton}
                onPress={handleLogoutCurrent}
              >
                <View style={styles.optionContent}>
                  <Text style={styles.optionTitle}>Logout Current User</Text>
                  <Text style={styles.optionDescription}>
                    {users.length > 1 
                      ? `Logout ${user?.memberName} and switch to another user`
                      : `Logout ${user?.memberName} completely`
                    }
                  </Text>
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.optionButton}
                onPress={handleLogoutAll}
              >
                <View style={styles.optionContent}>
                  <Text style={styles.optionTitle}>Logout All Users</Text>
                  <Text style={styles.optionDescription}>
                    Remove all saved accounts and return to login screen
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={onClose}
              >
                <Text style={styles.cancelButtonText}>{t('common.cancel')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const createStyles = (theme) => StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: theme.light,
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxWidth: 400,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.dark,
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 20,
    color: theme.dark,
    fontWeight: 'bold',
  },
  content: {
    gap: 20,
  },
  description: {
    fontSize: 16,
    color: theme.dark,
    textAlign: 'center',
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  optionContent: {
    gap: 4,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.dark,
  },
  optionDescription: {
    fontSize: 14,
    color: '#666',
  },
  buttonContainer: {
    marginTop: 10,
  },
  cancelButton: {
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: theme.dark,
    fontWeight: '600',
  },
});

export default LogoutModal;
