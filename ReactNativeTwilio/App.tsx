/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, TextInput, Button, Alert} from 'react-native';
import axios from 'axios';
import base64 from 'base-64';

// Import Twilio credentials from environment variables
import {TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER} from '@env';

const App = () => {
  const [smsPhoneNumber, setSMSPhoneNumber] = useState('');
  const [smsMessage, setSMSMessage] = useState('');

  // Function to handle sending SMS messages
  const handleSendSMS = async () => {
    try {
      const authToken = `${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`;
      const base64AuthToken = base64.encode(authToken);
      const response = await axios.post(
        `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`,
        `To=${smsPhoneNumber}&From=${TWILIO_PHONE_NUMBER}&Body=${smsMessage}`,
        {
          headers: {
            Authorization: `Basic ${base64AuthToken}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
      console.log('SMS sent successfully:', response.data);
      Alert.alert('Success', 'SMS sent successfully!');
    } catch (error) {
      console.error('Error sending SMS:', error);
      Alert.alert('Error', 'Failed to send SMS. Please try again.');
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
      }}>
      <TextInput
        style={{
          height: 40,
          width: 300,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 10,
          paddingHorizontal: 10,
        }}
        onChangeText={setSMSPhoneNumber}
        value={smsPhoneNumber}
        placeholder="Recipient's Phone Number (SMS)"
        keyboardType="numeric"
      />
      <TextInput
        style={{
          height: 100,
          width: 300,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 10,
          paddingHorizontal: 10,
        }}
        onChangeText={setSMSMessage}
        value={smsMessage}
        multiline={true}
        placeholder="Message (SMS)"
      />
      <Button title="Send SMS" onPress={handleSendSMS} />
    </View>
  );
};

export default App;
