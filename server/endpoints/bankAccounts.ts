import { Request } from 'express';
import app from '../app';
import { IBankAccount } from '../types/BankAccount';
import { getBankAccounts, setBankAccounts } from '../database/queries/bankAccounts';

app.post('/bankAccounts', (req: Request<{}, {}, { bankAccounts: IBankAccount[] }>, res) => {
  const { bankAccounts } = req.body;
  const { userId } = req.session;

  setBankAccounts(userId, bankAccounts)
    .then(() => res.sendStatus(200))
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
});

app.get('/bankAccounts', (req, res) => {
  const { userId } = req.session;

  getBankAccounts(userId)
    .then((bankAccounts: IBankAccount[]) => res.status(200).json(bankAccounts))
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
});
