import axios from 'axios';
import { API_URL } from './index';

/**
 * Sign into the backend
 * @param token string
 * @returns Promise
 */
// eslint-disable-next-line
export const signIn = (token: string) => axios.post(`${API_URL}/sign-in`, { token });
