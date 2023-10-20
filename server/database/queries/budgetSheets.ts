import { getDb } from '../index';
import { IBudgetSheet } from '../../types/Budget';
import { addId, addIdsToNestedObject } from '../../util/database';

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

  // Add Ids to every sheet, group and budget
  const budgetSheetsWithId = budgetSheets.map(addIdsToNestedObject);

  const collection = await getBudgetSheetsCollection();

  const query = { userId };

  await collection.updateOne(
    query,
    { $set: { userId, budgetSheets: budgetSheetsWithId } },
    { upsert: true },
  );

  return getBudgetSheets(userId);
};
