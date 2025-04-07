import axios from 'axios';

const sendCommunication = async (message: string, method: string, recipients: string) => {
  try {
    const response = await axios.post('/api/sendCommunication', {
      message,
      method,
      recipients: recipients.split(',').map(recipient => recipient.trim()),
    });
    return response.data;
  } catch (error) {
    console.error('Error sending communication:', error);
    // Enhanced error handling
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
};

export default sendCommunication;
