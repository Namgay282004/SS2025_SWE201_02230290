# Report on Gojek Practical Task


## 1. Introduction 

The project is well-documented, with a clear folder structure and code organization. Below is a breakdown of how the project mimics the Gojek app's design and functionality:



### **Code Documentation**
- **`_layout.tsx`**: Defines the root layout and navigation stack. It includes a custom header with the Gojek logo for the home screen and hides the header for the auth screen.
- **`[type].tsx`**: Handles dynamic routing for login and signup screens using Expo Router's `useLocalSearchParams`. This mimics the Gojek app's unified login/signup flow.
- **`index.tsx`**: Implements a carousel for the home screen, allowing users to swipe through images and descriptions. This mimics the Gojek app's homepage carousel.
- **`auth.tsx`**: The authentication screen where users can enter their phone number and select a country code. This mimics the Gojek app's phone number input and country code selection functionality.
- **`otp-input.tsx`**: A screen for entering the OTP sent via SMS. This mimics the Gojek app's OTP input flow.
- **`otp-verification.tsx`**: A screen for selecting the OTP verification method (SMS or WhatsApp). This mimics the Gojek app's OTP verification method selection.


---

## 2. Reflections

### **What I Did**
1. **Mimicked the Gojek Home Screen**:
   - Created a carousel using `FlatList` to display images and descriptions, similar to the Gojek app's homepage.
   - Added buttons for login and signup, which navigate to the `auth.tsx` screen.

2. **Implemented Dynamic Routing for Login/Signup**:
   - Used Expo Router's `useLocalSearchParams` to handle dynamic routing for login and signup screens in `[type].tsx`.
   - This approach mimics the Gojek app's unified login/signup flow.

3. **Designed the Authentication Screen**:
   - Built a clean and user-friendly interface for entering phone numbers and selecting country codes, similar to the Gojek app.
   - Integrated a "Continue" button that logs the full phone number (including the country code) for further processing.

4. **Added OTP Screens**:
   - Created `otp-input.tsx` for entering OTPs sent via SMS, mimicking the Gojek app's OTP input flow.
   - Built `otp-verification.tsx` to allow users to choose between SMS and WhatsApp for OTP verification, similar to the Gojek app.

5. **Handled Navigation**:
   - Used Expo Router's `router.push` and `router.back` to navigate between screens seamlessly, mimicking the Gojek app's smooth navigation flow.
   - Ensured that the back button is available on all screens for a consistent user experience.

### **Challenges Faced**
- **Country Code Picker**: Initially, I faced issues with the `react-native-country-picker-modal` library due to missing dependencies. I resolved this by switching to `react-native-country-picker` and ensuring all dependencies were installed correctly.
- **Dynamic Routing**: Understanding how to use `useLocalSearchParams` for dynamic routing was challenging at first, but I was able to implement it successfully after studying the Expo Router documentation.

### **What I Learned**
- **Expo Router**: I gained a deeper understanding of Expo Router and how to handle dynamic routing, navigation, and passing data between screens.

---

## **Conclusion**

This practical successfully mimics the Gojek app's design and functionality using Expo Router and React Native. The documentation is thorough, the reflections are insightful, and the code is clear and coherent. The project meets the requirements and provides a solid foundation for further development, such as integrating backend APIs for OTP verification and user authentication.

