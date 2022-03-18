import { getDb } from '../index';
import { IBudgetSheet } from '../../../types/budget';

const getBudgetSheetsCollection = async () => {
  const db = await getDb();
  return db.collection('budgetSheets');
};

export const setBudgetSheets = async (
  userId: string,
  budgetSheets: IBudgetSheet[],
): Promise<void> => {
  if (!userId || !budgetSheets) {
    return Promise.reject();
  }

  const collection = await getBudgetSheetsCollection();

  const query = { userId };

  await collection.updateOne(query, { $set: { userId, budgetSheets } }, { upsert: true });

  return Promise.resolve();
};

export const getBudgetSheets = async (userId: string): Promise<IBudgetSheet[]> => {
  const collection = await getBudgetSheetsCollection();

  const query = { userId };

  const result = await collection.findOne(query);

  return result.budgetSheets;
};
