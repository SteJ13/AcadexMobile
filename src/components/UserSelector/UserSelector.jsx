import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import useStyles from '@hooks/useStyles';
import { useAuth } from '@context/AuthContext';
import { getRoleName } from '../../config/drawerMenuConfig';
import AddUserModal from './AddUserModal';
import LogoutModal from '@components/LogoutModal';

const UserSelector = ({ 
  profileButtonStyle, 
  profileImageStyle, 
  profileInitialStyle,
  modalStyle,
  showProfileButton = true 
}) => {
  const { t } = useTranslation();
  const styles = useStyles(createStyles);
  const { user, users, switchUser } = useAuth();
  const navigation = useNavigation();
  const [showUserPopup, setShowUserPopup] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleUserSwitch = async (userId) => {
    await switchUser(userId);
    setShowUserPopup(false);
  };


  const handleAddUser = () => {
    setShowUserPopup(false);
    setShowAddUserModal(true);
  };

  const renderUserItem = ({ item }) => (
    <View style={styles.userItem}>
      <View style={styles.userInfo}>
        <View style={styles.userAvatar}>
          <Text style={styles.userAvatarText}>
            {item.memberName?.charAt(0)?.toUpperCase() || 'U'}
          </Text>
        </View>
        <View style={styles.userDetails}>
          <Text style={styles.userName}>{item.memberName}</Text>
          <Text style={styles.userRole}>{getRoleName(item.roleId)}</Text>
        </View>
      </View>
      <View style={styles.userActions}>
        {user?.id !== item.id && (
          <TouchableOpacity 
            style={styles.switchButton}
            onPress={() => handleUserSwitch(item.id)}
          >
            <Text style={styles.switchButtonText}>{t('common.switch')}</Text>
          </TouchableOpacity>
        )}
        {user?.id === item.id && (
          <Text style={styles.currentUserText}>{t('common.current')}</Text>
        )}
      </View>
    </View>
  );

  if (!showProfileButton) {
    return null;
  }

  return (
    <>
      <TouchableOpacity 
        style={[styles.profileButton, profileButtonStyle]} 
        onPress={() => setShowUserPopup(true)}
      >
        <View style={[styles.profileImage, profileImageStyle]}>
          <Text style={[styles.profileInitial, profileInitialStyle]}>
            {user?.memberName?.charAt(0)?.toUpperCase() || 'U'}
          </Text>
        </View>
      </TouchableOpacity>

      {/* User Selection Popup */}
      <Modal
        visible={showUserPopup}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowUserPopup(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, modalStyle]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{t('common.selectUser')}</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setShowUserPopup(false)}
              >
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={users}
              keyExtractor={(item) => item.id}
              renderItem={renderUserItem}
              style={styles.userList}
              showsVerticalScrollIndicator={true}
              nestedScrollEnabled={true}
            />
            
            {/* Add User Button - Not part of scrollable list */}
            <TouchableOpacity 
              style={styles.addUserButton}
              onPress={handleAddUser}
            >
              <Text style={styles.addUserButtonText}>+ {t('common.addUser')}</Text>
            </TouchableOpacity>
            
            {/* Logout Button */}
            <TouchableOpacity 
              style={styles.logoutButton}
              onPress={() => {
                setShowUserPopup(false);
                setShowLogoutModal(true);
              }}
            >
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Add User Modal */}
      <AddUserModal 
        visible={showAddUserModal}
        onClose={() => setShowAddUserModal(false)}
      />
      
      {/* Logout Modal */}
      <LogoutModal 
        visible={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
      />
    </>
  );
};

const createStyles = (theme) => StyleSheet.create({
  profileButton: {
    padding: 5,
  },
  profileImage: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: theme.light,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.primary,
  },
  // Modal styles
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
    maxHeight: '70%',
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
  userList: {
    maxHeight: 250,
    marginBottom: 15,
  },
  // User item styles
  userItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 8,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  userAvatarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.light,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.dark,
    marginBottom: 2,
  },
  userRole: {
    fontSize: 14,
    color: '#666',
  },
  userActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  switchButton: {
    backgroundColor: theme.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  switchButtonText: {
    color: theme.light,
    fontSize: 12,
    fontWeight: '600',
  },
  currentUserText: {
    color: theme.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  // Add User button styles
  addUserButton: {
    backgroundColor: theme.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  addUserButtonText: {
    color: theme.light,
    fontSize: 16,
    fontWeight: '600',
  },
  // Logout button styles
  logoutButton: {
    backgroundColor: '#ff4444',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  logoutButtonText: {
    color: theme.light,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default UserSelector;
