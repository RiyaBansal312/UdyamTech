import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendWhatsAppMessage = async (to, message) => {
  try {
    const res = await client.messages.create({
      body: message,
      from: "whatsapp:+14155238886", // Twilio sandbox number
      to: `whatsapp:${to}`
    });
    console.log(`📩 WhatsApp sent to ${to} - SID: ${res.sid}`);
  } catch (err) {
    console.error("❌ WhatsApp send error:", err.message);
  }
};

export const sendSMS = sendWhatsAppMessage; // alias
