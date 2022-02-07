import { Request } from 'express';
import app from '../app';
import { IBudgetGroup } from '../../types/Budget';
import { setBudgetGroups } from '../database/queries/budgetGroups';

app.post('/budgetGroups', (req: Request<{}, {}, { budgetGroups: IBudgetGroup[] }>, res) => {
  const { budgetGroups } = req.body;
  const { userId } = req.session;

  setBudgetGroups(userId, budgetGroups)
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(500));
});
