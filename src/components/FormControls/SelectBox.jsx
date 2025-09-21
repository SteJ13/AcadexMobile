import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import { Controller } from 'react-hook-form';
import useStyles from '../../hooks/useStyles';

const SelectBox = ({ 
  control, 
  name, 
  rules = {}, 
  placeholder = 'Select an option', 
  options = [], 
  loading = false,
  style,
  icon,
  ...props 
}) => {
  const styles = useStyles(createStyles);
  const [isOpen, setIsOpen] = useState(false);

  const renderOption = ({ item }) => (
    <TouchableOpacity
      style={styles.optionItem}
      onPress={() => {
        // This will be handled by the Controller
        setIsOpen(false);
      }}
    >
      <Text style={styles.optionText}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View style={[styles.container, style]}>
          <TouchableOpacity
            style={[
              styles.selectButton,
              error && styles.selectButtonError,
              loading && styles.selectButtonLoading
            ]}
            onPress={() => !loading && setIsOpen(true)}
            disabled={loading}
          >
            {icon && (
              <View style={styles.iconContainer}>
                {icon}
              </View>
            )}
            <Text style={[
              styles.selectButtonText,
              !value && styles.placeholderText,
              loading && styles.loadingText
            ]}>
              {loading ? 'Loading...' : (value ? options.find(opt => opt.value === value)?.label || placeholder : placeholder)}
            </Text>
            <Text style={styles.dropdownIcon}>▼</Text>
          </TouchableOpacity>

          {error && (
            <Text style={styles.errorText}>{error.message}</Text>
          )}

          <Modal
            visible={isOpen}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setIsOpen(false)}
          >
            <TouchableOpacity
              style={styles.modalOverlay}
              activeOpacity={1}
              onPress={() => setIsOpen(false)}
            >
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>{placeholder}</Text>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setIsOpen(false)}
                  >
                    <Text style={styles.closeButtonText}>×</Text>
                  </TouchableOpacity>
                </View>
                
                <FlatList
                  data={options}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={[
                        styles.optionItem,
                        value === item.value && styles.selectedOption
                      ]}
                      onPress={() => {
                        onChange(item.value);
                        setIsOpen(false);
                      }}
                    >
                      <Text style={[
                        styles.optionText,
                        value === item.value && styles.selectedOptionText
                      ]}>
                        {item.label}
                      </Text>
                      {value === item.value && (
                        <Text style={styles.checkmark}>✓</Text>
                      )}
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item.value.toString()}
                  style={styles.optionsList}
                />
              </View>
            </TouchableOpacity>
          </Modal>
        </View>
      )}
    />
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.light,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 48,
  },
  selectButtonError: {
    borderColor: '#ff4444',
  },
  selectButtonLoading: {
    opacity: 0.6,
  },
  iconContainer: {
    marginRight: 10,
  },
  selectButtonText: {
    fontSize: 16,
    color: theme.dark,
    flex: 1,
  },
  placeholderText: {
    color: '#ab7cca',
  },
  loadingText: {
    color: '#ab7cca',
  },
  dropdownIcon: {
    fontSize: 12,
    color: '#ab7cca',
    marginLeft: 8,
  },
  errorText: {
    color: '#ff4444',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: theme.light,
    borderRadius: 12,
    width: '80%',
    maxHeight: '60%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    position: 'relative',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.dark,
    flex: 1,
    marginRight: 40, // Add margin to prevent overlap with close button
    lineHeight: 24,
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ff4444',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 16,
    right: 16,
  },
  closeButtonText: {
    color: theme.light,
    fontSize: 18,
    fontWeight: 'bold',
  },
  optionsList: {
    maxHeight: 300,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  selectedOption: {
    backgroundColor: theme.primary + '20',
  },
  optionText: {
    fontSize: 16,
    color: theme.dark,
    flex: 1,
  },
  selectedOptionText: {
    color: theme.primary,
    fontWeight: 'bold',
  },
  checkmark: {
    fontSize: 16,
    color: theme.primary,
    fontWeight: 'bold',
  },
});

export default SelectBox;
