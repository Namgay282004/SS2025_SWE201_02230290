import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';

const OTPInput: React.FC = () => {
  const [otp, setOtp] = useState('');

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Enter OTP sent via SMS</Text>
      <Text style={styles.subtitle}>We've sent OTP to +97577270847</Text>

      {/* OTP Input */}
      <Text style={styles.label}>OTP *</Text>
      <TextInput
        style={styles.otpInput}
        keyboardType="number-pad"
        maxLength={6}
        value={otp}
        onChangeText={setOtp}
      />

      {/* Timer */}
      <Text style={styles.timer}>00:55</Text>

      {/* Try Another Method */}
      <TouchableOpacity style={styles.anotherMethod} onPress={() => router.push('/otp-verification')}>
        <Text style={styles.anotherMethodText}>Try another method</Text>
      </TouchableOpacity>

      {/* Footer */}
      <Text style={styles.footer}>from <Text style={styles.brand}>goto</Text></Text>
    </View>
  );
};

export default OTPInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 18,
    color: '#000',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
  },
  otpInput: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 10,
    padding: 10,
  },
  timer: {
    fontSize: 16,
    color: 'green',
    alignSelf: 'flex-end',
  },
  anotherMethod: {
    marginTop: 20,
    alignSelf: 'center',
  },
  anotherMethodText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    fontSize: 12,
    color: '#666',
  },
  brand: {
    color: '#00AA13',
    fontWeight: 'bold',
  },
});
