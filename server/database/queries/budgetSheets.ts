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

  // Add Ids to every sheet, group and budget
  // TODO: we could write a generic function here that adds an id on every level of an
  //  object
  const budgetSheetsWithId = budgetSheets.map((sheet) => {
    const sheetWithId = addId(sheet);
    const budgetGroupsWithId = sheetWithId.budgetGroups?.map((group) => {
      const budgetGroupWithId = addId(group);
      const budgetsWithId = budgetGroupWithId.budgets?.map(addId);

      return { ...budgetGroupWithId, budgets: budgetsWithId || [] };
    });

    return { ...sheetWithId, budgetGroups: budgetGroupsWithId || [] };
  });

  const collection = await getBudgetSheetsCollection();

  const query = { userId };

  await collection.updateOne(
    query,
    { $set: { userId, budgetSheets: budgetSheetsWithId } },
    { upsert: true },
  );

  return getBudgetSheets(userId);
};
