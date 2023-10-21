import { IBankAccount } from '@/types/BankAccount';
import { Commit, Dispatch } from 'vuex';
import _ from 'lodash';

interface IState {
  bankAccounts: IBankAccount[];
}

interface IActionParams {
  commit: Commit,
  dispatch: Dispatch,
  state: IState,
}

const getInitialState = (): IState => ({
  bankAccounts: [],
});

export const mutations = {
  addBankAccount(state: IState, bankAccount: IBankAccount): void {
    state.bankAccounts.push(bankAccount);
  },
  removeBankAccount(state: IState, index: number): void {
    state.bankAccounts.splice(index, 1);
  },
  setBankAccounts(state: IState, bankAccounts:IBankAccount[]): void {
    state.bankAccounts = bankAccounts;
  },
};

export const actions = {
  addBankAccount({ commit }: IActionParams, bankAccount: IBankAccount): void {
    commit('addBankAccount', bankAccount);
  },
  removeBankAccount({ commit }: IActionParams, index: number): void {
    commit('removeBankAccount', index);
  },
  setBankAccounts({ commit }: IActionParams, bankAccounts: IBankAccount[]): void {
    commit('setBankAccounts', bankAccounts);
  },
};

export const state = getInitialState;
