import axios from 'axios';

/**
 * Sign into the backend
 * @param token string
 * @returns Promise
 */
// eslint-disable-next-line
export const signIn = (token: string) => axios.post('/sign-in', { token });
