import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { Controller } from 'react-hook-form';
import useStyles from '@hooks/useStyles';

const InputBox = ({
  control,
  name,
  rules = {},
  placeholder = 'Email or Phone',
  keyboardType = 'default',
  icon = null,
  defaultValue = '',
}) => {
  const styles = useStyles((theme) =>
    StyleSheet.create({
      row: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#E6E6E6',
        paddingHorizontal: 14,
        height: 56,
        backgroundColor: theme.appBackground,
      },
      input: {
        flex: 1,
        fontSize: 16,
        color: theme.light,
        marginLeft: 8,
      },
      icon: { opacity: 0.75 },
      errorText: {
        color: 'red',
        fontSize: 18,
        marginTop: 4,
        marginLeft: 8,
      },
    })
  );

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
        return (
          <>
            <View style={[styles.row , { borderColor: error ? 'red' : '#E6E6E6' }]}>
              {icon && icon}
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                placeholderTextColor="#ccaede"
                style={styles.input}
                keyboardType={keyboardType}
                />
            </View>
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </>
        )
      }}
    />
  );
};

export default InputBox;
