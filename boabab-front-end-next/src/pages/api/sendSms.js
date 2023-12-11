require('dotenv').config();
const twilio = require('twilio');



export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      
      const { phoneNumber, message } = req.body;

      // Retrieve Twilio credentials from environment variables
      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      console.log(accountSid)
      const authToken = process.env.TWILIO_AUTH_TOKEN;
      const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

      // Create a Twilio client
      const client = twilio(accountSid, authToken);

      // Construct the message to be sent
      const messageBody = `Your SMS content: ${message}`;

      // Send SMS using Twilio
      const twilioResponse = await client.messages.create({
        body: messageBody,
        to: phoneNumber,
        from: twilioPhoneNumber,
      });

      // Handle successful SMS sending
      console.log('SMS sent successfully!', twilioResponse);

      res.status(200).json({ success: true, message: 'SMS sent successfully' });
    } catch (error) {
      // Handle error
      console.error('Error sending SMS:', error.message);
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
