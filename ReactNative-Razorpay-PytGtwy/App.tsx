import React, {useState} from 'react';
import {View, Button, Text, Image, StyleSheet} from 'react-native';
import {RAZORPAY_TEST_KEY} from '@env';
import RazorpayCheckout from 'react-native-razorpay';

// TODO: 
const App = () => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const amount = 1000;

  const handlePayment = () => {
    const options = {
      description: 'Thank you for your purchase',
      image:
        'https://maigha.com/wp-content/uploads/2023/10/Untitled_design-2-removebg-preview.png',
      currency: 'INR',
      key: RAZORPAY_TEST_KEY,
      amount: amount * 100,
      name: 'Maigha Inc',
      prefill: {
        email: 'support@maigha.com',
        phone: '9888626111',
        name: 'Hrushikesh Vetagiri',
        address: {
          city: 'Nellore',
          state: 'Andhra Pradesh',
          country: 'India',
          zip: '524137',
        },
      },
      theme: {color: '#09518e'},
    };

    RazorpayCheckout.open(options)
      .then(data => {
        console.log(`Payment successful: ${data.razorpay_payment_id}`);
        setPaymentSuccess(true); // Set payment success state to true
      })
      .catch(error => {
        console.log('Payment error:', error.description, error.code);
      });
  };

  return (
    <View style={styles.container}>
      {paymentSuccess ? (
        <View style={styles.paymentContainer}>
          <Image
            source={{
              uri: 'https://maigha.com/wp-content/uploads/2023/10/Untitled_design-2-removebg-preview.png',
            }}
            style={styles.image}
          />
          <Text style={styles.description}>Thank you for your purchase!</Text>
          <Text style={styles.amount}>Amount: {amount} INR</Text>
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <Button title="Pay Now" onPress={handlePayment} color="#09518e" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: 200,
    height: 50,
    borderRadius: 10,
    fontSize: 18,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 150,
    height: 100,
    resizeMode: 'cover', // Ensure image fills the container without distortion
    borderRadius: 10, // Apply border radius to match the container
    marginBottom: 10, // Adjust margin for spacing
  },
  description: {
    fontSize: 18,
    marginBottom: 10,
  },
  amount: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default App;
