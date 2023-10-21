import { getDb } from '../index';
import { IBankAccount } from '../../types/BankAccount';

const getBudgetSheetsCollection = async () => {
  const db = await getDb();
  return db.collection('budgetSheets');
};

export const getBankAccounts = async (userId: string): Promise<IBankAccount[]> => {
  const collection = await getBudgetSheetsCollection();

  const query = { userId };

  const result = await collection.findOne(query);

  return result?.bankAccounts || [];
};

export const setBankAccounts = async (
  userId: string,
  bankAccounts: IBankAccount[],
): Promise<IBankAccount[]> => {
  if (!userId || !bankAccounts) {
    return Promise.reject(new Error(`invalid parameters: userId: ${userId}, bankAccounts: ${bankAccounts}`));
  }

  const collection = await getBudgetSheetsCollection();

  const query = { userId };

  await collection.updateOne(
    query,
    { $set: { userId, bankAccounts } },
    { upsert: true },
  );

  return getBankAccounts(userId);
};
