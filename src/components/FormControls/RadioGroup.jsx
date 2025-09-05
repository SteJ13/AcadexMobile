import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';
import useStyles from '@hooks/useStyles';

const RadioGroup = ({
  control,
  name,
  rules = {},
  options = [],
  label = null,
  defaultValue = '',
  handleChange = null
}) => {
  const styles = useStyles((theme) =>
    StyleSheet.create({
      container: {
        marginBottom: 12,
      },
      label: {
        fontSize: 16,
        marginBottom: 8,
        color: theme.light,
        marginLeft: 12,
      },
      option: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E6E6E6',
        borderRadius: 20,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginBottom: 8,
        width: '100%',
        backgroundColor: '#FFFFFF',
      },
      selectedOption: {
        borderColor: theme.primary,
      },
      radioCircle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#999',
        alignItems: 'center',
        justifyContent: 'center',
      },
      selectedRb: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: theme.primary,
      },
      optionText: {
        marginLeft: 12,
        fontSize: 16,
        color: '#333333',
      },
      errorText: {
        color: 'red',
        fontSize: 14,
        marginTop: 4,
        marginLeft: 0,
      },
    })
  );

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View style={styles.container}>
          {label && <Text style={styles.label}>{label}</Text>}
          {options.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.option,
                value === option.value && styles.selectedOption,
              ]}
              onPress={() =>{ 
                onChange(option.value);
                if (handleChange) {
                  handleChange(option.value);
                }
              }}
            >
              <View style={styles.radioCircle}>
                {value === option.value && <View style={styles.selectedRb} />}
              </View>
              <Text style={styles.optionText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
          {error && <Text style={styles.errorText}>{error.message}</Text>}
        </View>
      )}
    />
  );
};

export default RadioGroup;
