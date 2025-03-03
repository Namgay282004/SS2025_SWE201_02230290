import { Stack } from 'expo-router';
import { Image } from 'react-native';

// Import the Gojek logo image
const gojekLogo = require('/home/namgaywangchuk/Desktop/Fourth-Semester/SWE201/SS2025_SWE201_02230290/gojek-practical1/assets/images/Gojek-logo.png');

export default function RootLayout() {
  return (
    <Stack>
      {/* Home Screen */}
      <Stack.Screen
        name="index"
        options={{
          headerTitle: () => (
            <Image
              source={gojekLogo}
              style={{ width: 100, height: 40 }} 
              resizeMode="contain" // Ensures the image fits within the specified dimensions
            />
          ),
        }}
      />

      {/* Auth Screen (for both Login and Signup) */}
      <Stack.Screen
        name="auth"
        options={{
          title: 'Auth', 
          headerShown: false, // Hide the header for the auth screen
        }}
      />
    </Stack>
  );
}