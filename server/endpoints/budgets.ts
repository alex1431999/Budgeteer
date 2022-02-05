import { Request } from 'express';
import app from '../server';
import { IBudgetGroup } from '../../types/Budget';
import { setBudgetGroups } from '../database/queries/budgetGroups';

app.post('/budgetGroups', (req: Request<{}, {}, { budgetGroups: IBudgetGroup[] }>, res) => {
  const budgetGroups = req.body.budgetGroups;
  const userId = req.session.userId;

  setBudgetGroups(userId, budgetGroups)
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(500));
});