const twilio = require('twilio');
require('dotenv').config()

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromPhone = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

const sendSms = async (to, body) => {
  try {
    await client.messages.create({
      body,
      from: fromPhone,
      to,
    });
  } catch (error) {
    console.error('Error sending SMS:', error);
    throw new Error('Failed to send OTP');
  }
};

module.exports = sendSms;