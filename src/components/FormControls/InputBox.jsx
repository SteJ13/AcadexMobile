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
  secureTextEntry = false,
}) => {
  const styles = useStyles((theme) =>
    StyleSheet.create({
      row: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#E6E6E6',
        paddingHorizontal: 15,
        height: 50,
        backgroundColor: '#FFFFFF',
      },
      input: {
        flex: 1,
        fontSize: 16,
        color: '#333333',
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
                placeholderTextColor="#999999"
                style={styles.input}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
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
