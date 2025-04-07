import React, { useState } from 'react';
import PrivacyPanel from '../../components/PrivacyPanel';
import { useTheme } from '../../contexts/ThemeContext';
import sendCommunication from 'sendCommunication';


export const Communication = () => {
  const { primaryColor, secondaryColor, accentColor } = useTheme();
  const [message, setMessage] = useState('');
  
  const buttonStyle = {
    backgroundColor: primaryColor,
    color: 'white',
  };

  const [method, setMethod] = useState('email');
  const [recipients, setRecipients] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await sendCommunication(message, method, recipients);
    console.log({ message, method, recipients });
  };

  return (
    <div>
      <h1>Send Communication</h1>
      <PrivacyPanel />
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Message:
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Method:
            <select value={method} onChange={(e) => setMethod(e.target.value)}>
              <option value="email">Email</option>
              <option value="sms">SMS</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Recipients (comma-separated):
            <input
              type="text"
              value={recipients}
              onChange={(e) => setRecipients(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit" style={buttonStyle}>Send</button>
      </form>
    </div>
  );
};
