import React, { useState } from 'react';
import axios from 'axios';
const SmsForm = () => {
  const [number, setNumber] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    try {
      if (!number || !message) {
        alert('Please fill in both telephone number and message.');
        return;
      };

      console.log(number);
      console.log(message)

      const response = await axios.post('/api/sendSms', {
        phoneNumber: number,
        message: message,
      });

      
      // For example, you can show a success message to the user
      alert('SMS sent successfully!');
    } catch (error) {
      console.error('Error sending SMS:', error.message);
      // Handle error
      // For example, you can show a more informative error message to the user
      alert('Error sending SMS. Please try again.');
    }
  };

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div>
      <h2>SMS Form</h2>
      <label htmlFor="phoneNumber">Telephone Number:</label>
      <input
        type="tel"
        id="phoneNumber"
        name="phoneNumber"
        required
        pattern="[0-9]{10}"
        value={number}
        onChange={handleNumberChange}
      />

      <label htmlFor="message">Message:</label>
      <textarea
        id="message"
        name="message"
        value={message}
        onChange={handleMessageChange}
      />

      <button type="button" onClick={handleSubmit}>
        Send SMS
      </button>
    </div>
  );
};

export default SmsForm;
