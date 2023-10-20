import { getDb } from '../index';
import { IBudgetSheet } from '../../types/Budget';
import { addId } from '../../util/database';

const getBudgetSheetsCollection = async () => {
  const db = await getDb();
  return db.collection('budgetSheets');
};

export const getBudgetSheets = async (userId: string): Promise<IBudgetSheet[]> => {
  const collection = await getBudgetSheetsCollection();

  const query = { userId };

  const result = await collection.findOne(query);

  return result?.budgetSheets || [];
};

export const setBudgetSheets = async (
  userId: string,
  budgetSheets: IBudgetSheet[],
): Promise<IBudgetSheet[]> => {
  if (!userId || !budgetSheets) {
    return Promise.reject(new Error(`invalid parameters: userId: ${userId}, budgetSheets: ${budgetSheets}`));
  }

  const budgetSheetsWithId = budgetSheets.map(addId);

  const collection = await getBudgetSheetsCollection();

  const query = { userId };

  await collection.updateOne(
    query,
    { $set: { userId, budgetSheets: budgetSheetsWithId } },
    { upsert: true },
  );

  return getBudgetSheets(userId);
};
