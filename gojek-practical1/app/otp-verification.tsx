import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

const OTPVerification: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Choose verification method</Text>

      {/* OTP via SMS */}
      <TouchableOpacity style={styles.option} onPress={() => router.push('/otp-input')}>
        <FontAwesome name="envelope" size={24} color="#FF9800" />
        <Text style={styles.optionText}>OTP via SMS</Text>
      </TouchableOpacity>

      {/* OTP via WhatsApp */}
      <TouchableOpacity style={styles.option} onPress={() => router.push('/otp-input')}>
        <FontAwesome name="whatsapp" size={24} color="#25D366" />
        <Text style={styles.optionText}>OTP via WhatsApp</Text>
      </TouchableOpacity>

      {/* Footer */}
      <Text style={styles.footer}>from <Text style={styles.brand}>goto</Text></Text>
    </View>
  );
};

export default OTPVerification;

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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 15,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
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
