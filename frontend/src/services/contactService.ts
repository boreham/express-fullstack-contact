import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/contacts';

const submitContact = (data: FormData) => {
  return axios.post(API_URL, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export default {
  submitContact,
};
