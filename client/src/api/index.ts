import axios from 'axios';

axios.defaults.withCredentials = true;

// eslint-disable-next-line
export const API_URL = process.env.API_URL || 'http://localhost:3000';
