import axios from 'axios';
import { IBudgetSheet } from '@types/types//Budget';

export const setBudgetSheets = (budgetSheets: IBudgetSheet[]) => axios.post('/budgetSheets', { budgetSheets });
export const getBudgetSheets = () => axios.get('/budgetSheets');
