import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

axios.defaults.baseURL = 'http://localhost:5000';

// API Requests

// To get username from token
export const getUsername = async () => {
  const token = localStorage.getItem('token');
  if (!token) return { error: 'Token not found' };
  let decoded = jwtDecode(token);
  return decoded;
};

// Authenticate function
export const authenticate = async (username) => {
  try {
    return await axios.post('/api/authenticate', {
      username,
    });
  } catch (error) {
    return { error: error.response.data.message };
  }
};

// Get user details
export const getUser = async (username) => {
  try {
    const { data } = await axios.get(`/api/user/${username}`);
    return data;
  } catch (error) {
    return { error: error.response.data.message };
  }
};

// Register user
export const registerUser = async (credentials) => {
  try {
    const {
      data: { message },
      status,
    } = await axios.post('/api/register', credentials);
    let { username, email } = credentials;
    if (status === 201) {
      await axios.post('/api/registermail', {
        username,
        userEmail: email,
        text: message,
      });
    }
    return { message };
  } catch (error) {
    return { error: error.response.data.message };
  }
};

// Login user
export const verifyPassword = async ({ username, password }) => {
  try {
    const { data } = await axios.post('/api/login', { username, password });
    return { data };
  } catch (error) {
    return { error: error.response.data.message };
  }
};

// Update user
export const updateUser = async (credentials) => {
  try {
    const token = localStorage.getItem('token');

    const { data } = await axios.put('/api/user', credentials, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data };
  } catch (error) {
    return { error: error.response.data.message };
  }
};

// Generate OTP
export const generateOTP = async (username) => {
  try {
    const {
      data: { code },
      status,
    } = await axios.get('/api/generateotp', { params: { username } });
    if (status === 201) {
      const { email } = await getUser(username);
      let text = `Your OTP is ${code}. Please do not share it with anyone.`;
      await axios.post('/api/registermail', {
        username,
        userEmail: email,
        text,
        subject: 'OTP',
      });
    }
    return { code };
  } catch (error) {
    return { error: error.response?.data?.message || 'OTP generation failed' };
  }
};

// Verify OTP
export const verifyOTP = async ({ username, code }) => {
  try {
    const { data, status } = await axios.get('/api/verifyotp', {
      params: { username, code },
    });
    return { data, status };
  } catch (error) {
    return { error: error.response.data.message };
  }
};

// Reset password
export const resetPassword = async ({ username, password }) => {
  try {
    const { data, status } = await axios.put('/api/resetpassword', {
      username,
      password,
    });
    return { data, status };
  } catch (error) {
    return { error: error.response.data.message };
  }
};
