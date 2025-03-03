import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

// Import the Gojek logo and other images
const gojekLogo = require('/home/namgaywangchuk/Desktop/Fourth-Semester/SWE201/SS2025_SWE201_02230290/gojek-practical1/assets/images/gojek1.jpg');
const transportImage = require('/home/namgaywangchuk/Desktop/Fourth-Semester/SWE201/SS2025_SWE201_02230290/gojek-practical1/assets/images/transport-gojek.jpeg');
const groceriesImage = require('/home/namgaywangchuk/Desktop/Fourth-Semester/SWE201/SS2025_SWE201_02230290/gojek-practical1/assets/images/groceries-gojek.jpeg');
const paymentImage = require('/home/namgaywangchuk/Desktop/Fourth-Semester/SWE201/SS2025_SWE201_02230290/gojek-practical1/assets/images/visa-gojek.jpg');

// Screen width for carousel
const { width: screenWidth } = Dimensions.get('window');

// Data for the carousel
const carouselData = [
  {
    image: gojekLogo,
    title: 'Welcome to Gojek!',
    subtitle: 'Your go-to app for a hassle-free life. We\'re here to help with all your needs anytime, anywhere.',
  },
  {
    image: transportImage,
    title: 'Transport & Logistics',
    subtitle: 'Daily commute and goods delivery made easy.',
  },
  {
    image: groceriesImage,
    title: 'Get food & groceries',
    subtitle: 'Either needs or cravings, we got you covered.',
  },
  {
    image: paymentImage,
    title: 'Payment',
    subtitle: 'Pay utility bills, phone credit, and transfer money from your phone.',
  },
];

export default function Index() {
  const [activeSlide, setActiveSlide] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  // Handle scroll event to update the active slide
  const handleScroll = (event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const currentIndex = event.nativeEvent.contentOffset.x / slideSize;
    setActiveSlide(Math.round(currentIndex));
  };

  // Render each carousel item
  const renderCarouselItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Image source={item.image} style={styles.carouselImage} resizeMode="contain" />
      <Text style={styles.carouselTitle}>{item.title}</Text>
      <Text style={styles.carouselSubtitle}>{item.subtitle}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Carousel */}
      <FlatList
        ref={flatListRef}
        data={carouselData}
        renderItem={renderCarouselItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.flatListContent}
      />

      {/* Pagination Dots */}
      <View style={styles.paginationContainer}>
        {carouselData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              activeSlide === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>

      {/* Log In Button */}
      <TouchableOpacity style={styles.loginButton}>
        <Link href="/auth" style={styles.loginButtonText}>
          Log In
        </Link>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signUpButton}>
        <Link href="/auth" style={styles.signUpButtonText}>
          I'm new, sign me up
        </Link>
      </TouchableOpacity>
      

      {/* Footer Text */}
      <Text style={styles.footerText}>
        By logging in or registering, you agree to our{' '}
        <Text style={styles.linkText}>Terms of service</Text> and{' '}
        <Text style={styles.linkText}>Privacy policy</Text>.
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
  },
  flatListContent: {
    alignItems: 'center', // Center content horizontally
  },
  carouselItem: {
    width: screenWidth,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  carouselImage: {
    width: '80%', // Adjust image width as needed
    height: 300,
    borderRadius: 10,
  },
  carouselTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 20,
    textAlign: 'center', // Center text horizontally
  },
  carouselSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center', // Center text horizontally
    marginTop: 10,
    paddingHorizontal: 20,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#00AA13',
  },
  inactiveDot: {
    backgroundColor: '#ccc',
  },
  loginButton: {
    width: '90%', // Adjust button width as needed
    padding: 15,
    backgroundColor: '#00AA13',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpButton: {
    width: '90%', // Adjust button width as needed
    padding: 15,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#00AA13',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  signUpButtonText: {
    color: '#00AA13',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 30,
    paddingHorizontal: 20,
  },
  linkText: {
    color: '#00AA13',
    textDecorationLine: 'underline',
  },
});