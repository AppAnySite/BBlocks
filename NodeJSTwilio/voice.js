require('dotenv').config();
const fs = require('fs');
const path = require('path');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

// Function to make a voice call
const makeVoiceCall = async () => {
    try {
        const voiceXml = fs.readFileSync(path.join(__dirname, 'voice.xml'), 'utf8');
        const call = await client.calls.create({
            twiml: voiceXml,
            to: process.env.TO_NUMBER,
            from: process.env.TWILIO_PHONE_NUMBER
        });
        console.log(call);
    } catch (error) {
        console.error(error);
    }
}

// Function to send WhatsApp message
const sendWhatsAppMessage = async (body) => {
    try {
        const message = await client.messages.create({
            body: body,
            from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
            to: `whatsapp:${process.env.TO_NUMBER}`
        });
        console.log(message.sid);
    } catch (error) {
        console.error(error);
    }
}


// Making a voice call
// makeVoiceCall();

// Sending WhatsApp message
// sendWhatsAppMessage('Your appointment is coming up on July 21 at 3PM');
