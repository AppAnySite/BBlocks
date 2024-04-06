/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, TextInput, Button, Alert} from 'react-native';
import axios from 'axios';
import base64 from 'base-64';

// Import Twilio credentials from environment variables
import {TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER} from '@env';

// TwiML content for voice call
const twimlContent = `
<Response>
  <Say>Hello! This is a test voice call from Twilio.</Say>
</Response>
`;

const App = () => {
  const [smsPhoneNumber, setSMSPhoneNumber] = useState('');
  const [smsMessage, setSMSMessage] = useState('');
  // const [voicePhoneNumber, setVoicePhoneNumber] = useState('');
  // const [mmsPhoneNumber, setMMSPhoneNumber] = useState('');
  // const [mmsMessage, setMMSMessage] = useState('');
  // const [mediaUrl, setMediaUrl] = useState('');

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

  // Function to handle initiating voice calls
  // const handleInitiateVoiceCall = async () => {
  //   try {
  //     const authToken = `${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`;
  //     const base64AuthToken = base64.encode(authToken);
  //     const response = await axios.post(
  //       `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Calls.json`,
  //       `To=${voicePhoneNumber}&From=${TWILIO_PHONE_NUMBER}&Url=${encodeURIComponent(
  //         'data:application/xml;base64,' + base64.encode(twimlContent),
  //       )}`,
  //       {
  //         headers: {
  //           Authorization: `Basic ${base64AuthToken}`,
  //           'Content-Type': 'application/x-www-form-urlencoded',
  //         },
  //       },
  //     );
  //     console.log('Voice call initiated successfully:', response.data);
  //     Alert.alert('Success', 'Voice call initiated successfully!');
  //   } catch (error) {
  //     console.error('Error initiating voice call:', error);
  //     Alert.alert('Error', 'Failed to initiate voice call. Please try again.');
  //   }
  // };

  // Function to handle sending MMS messages
  // const handleSendMMS = async () => {
  //   try {
  //     const authToken = `${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`;
  //     const base64AuthToken = base64.encode(authToken);
  //     const response = await axios.post(
  //       `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`,
  //       `To=${mmsPhoneNumber}&From=${TWILIO_PHONE_NUMBER}&Body=${mmsMessage}&MediaUrl=${mediaUrl}`,
  //       {
  //         headers: {
  //           Authorization: `Basic ${base64AuthToken}`,
  //           'Content-Type': 'application/x-www-form-urlencoded',
  //         },
  //       },
  //     );
  //     console.log('MMS sent successfully:', response.data);
  //     Alert.alert('Success', 'MMS sent successfully!');
  //   } catch (error) {
  //     console.error('Error sending MMS:', error);
  //     Alert.alert('Error', 'Failed to send MMS. Please try again.');
  //   }
  // };

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

      {/* Input and button for voice calls */}
      {/* <TextInput
        style={{
          height: 40,
          width: 300,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 10,
          paddingHorizontal: 10,
        }}
        onChangeText={setVoicePhoneNumber}
        value={voicePhoneNumber}
        placeholder="Recipient's Phone Number (Voice Call)"
        keyboardType="numeric"
      />
      <Button title="Initiate Voice Call" onPress={handleInitiateVoiceCall} /> */}

      {/* Add input and button for MMS */}
      {/* <TextInput
        style={{
          height: 40,
          width: 300,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 10,
          paddingHorizontal: 10,
        }}
        onChangeText={setMMSPhoneNumber}
        value={mmsPhoneNumber}
        placeholder="Recipient's Phone Number (MMS)"
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
        onChangeText={setMMSMessage}
        value={mmsMessage}
        multiline={true}
        placeholder="Message (MMS)"
      />
      <TextInput
        style={{
          height: 40,
          width: 300,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 10,
          paddingHorizontal: 10,
        }}
        onChangeText={setMediaUrl}
        value={mediaUrl}
        placeholder="Media URL (Optional)"
      />
      <Button title="Send MMS" onPress={handleSendMMS} /> */}
    </View>
  );
};

export default App;
