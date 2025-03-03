import { Stack, useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function AuthScreen() {
  const { type } = useLocalSearchParams(); // Get the dynamic `type` parameter

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: type === 'login' ? 'Log In' : 'Sign Up' }} />

      {/* Display Content Based on `type` */}
      {type === 'login' ? (
        <Text style={styles.text}>Log In Screen</Text>
      ) : (
        <Text style={styles.text}>Sign Up Screen</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    color: '#000',
  },
});