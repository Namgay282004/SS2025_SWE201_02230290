import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Link, router } from 'expo-router';

export default function AuthScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountryCode, setSelectedCountryCode] = useState('+62'); // Default to Indonesia

  // Static list of country codes
  const countryCodes = [
    { label: 'Indonesia (+62)', value: '+62' },
    { label: 'United States (+1)', value: '+1' },
    { label: 'India (+91)', value: '+91' },
    { label: 'United Kingdom (+44)', value: '+44' },
    { label: 'Bhutan (+975)', value: '+975' },
  ];

  // Handle continue button press
  const handleContinue = () => {
    Keyboard.dismiss(); 
    router.push('/otp-verification'); // Navigate to OTP verification screen
  };

  return (
    <View style={styles.container}>
      {/* Back Button for Index */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Welcome to Gojek!</Text>
      <Text style={styles.subtitle}>Enter or create an account in a few easy steps.</Text>

      {/* Phone Number Input */}
      <View style={styles.phoneInputContainer}>
        {/* Country Code Dropdown */}
        <Picker
          selectedValue={selectedCountryCode}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedCountryCode(itemValue)}
        >
          {countryCodes.map((country) => (
            <Picker.Item key={country.value} label={country.label} value={country.value} />
          ))}
        </Picker>

        {/* Phone Number Input */}
        <TextInput
          style={styles.phoneInput}
          placeholder="Phone number"
          placeholderTextColor="#999"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>

      {/* Continue Button */}
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>

      {/* Terms and Privacy Policy */}
      <Text style={styles.disclaimer}>
        I agree to Gojek’s{' '}
        <Text style={styles.linkText}>Terms of Service</Text> and{' '}
        <Text style={styles.linkText}>Privacy Policy</Text>.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: '#00AA13',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: '100%',
  },
  picker: {
    width: 150,
    height: 50,
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    height: 50,
    paddingLeft: 10,
  },
  continueButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#00AA13',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disclaimer: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  linkText: {
    color: '#00AA13',
    textDecorationLine: 'underline',
  },
});
