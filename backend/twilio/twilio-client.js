import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const sendOTPFromClient = async (number) => {
  const otp = Math.floor(1000 + Math.random() * 9000);
  await client.messages.create({
    body: `Your verification code is ${otp}`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: `+91${number}`
  });
  return otp;
};
