import axios from 'axios';
import { IBudgetGroup } from '../../../types/Budget';

/**
 * Sign into the backend
 * @param token string
 * @returns Promise
 */
// eslint-disable-next-line
export const setBudgetGroups = (budgetGroups: IBudgetGroup[]) => axios.post('/budgetGroups', { budgetGroups });
