import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001', // URL du serveur JSON
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (username: string, password: string) => {
  try {
    const response = await apiClient.get('/users', {
      params: {
        username,
        password,
      },
    });
    if (response.data.length > 0) {
      return response.data[0];
    } else {
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    throw new Error('Login failed');
  }
};

export const register = async (username: string, email: string, password: string) => {
  try {
    const response = await apiClient.post('/users', { username, email, password });
    return response.data;
  } catch (error) {
    throw new Error('Registration failed');
  }
};
