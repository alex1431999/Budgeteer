import axios from 'axios';
import { IBankAccount } from '@/types/BankAccount';

export const setBankAccounts = (bankAccounts: IBankAccount[]) => axios.post('/bankAccounts', { bankAccounts });
export const getBankAccounts = () => axios.get('/bankAccounts');
