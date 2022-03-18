import axios from 'axios';
import { IBudgetSheet } from '../../../types/Budget';

/**
 * Sign into the backend
 * @param token string
 * @returns Promise
 */
// eslint-disable-next-line
export const setBudgetSheets = (budgetSheets: IBudgetSheet[]) => axios.post('/budgetSheets', { budgetSheets });
