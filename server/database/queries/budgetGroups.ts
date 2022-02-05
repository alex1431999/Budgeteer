import { getDb } from '../index';
import { IBudgetGroup } from '../../../types/budget';

const getBudgetGroupsCollection = async () => {
  const db = await getDb();
  return db.collection('budgetGroups');
}

export const setBudgetGroups = async (userId: string, budgetGroups: IBudgetGroup[]) => {
  const collection = await getBudgetGroupsCollection();

  const query = { userId };

  collection.updateOne(query, { $set: { userId, budgetGroups } }, { upsert: true });
}