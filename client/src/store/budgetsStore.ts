import { IBudgetSheet } from '../../../types/Budget';

interface IState {
  budgetSheets: IBudgetSheet[]
}

const getInitialState = (): IState => ({
  budgetSheets: [],
});

export const mutations = {
  addBudetSheet(state: IState, budgetSheet: IBudgetSheet): void {
    state.budgetSheets.push(budgetSheet);
  },
  deleteBudgetSheet(state: IState, name: string): void {
    const index = state.budgetSheets.findIndex((budgetSheet) => budgetSheet.name === name);
    state.budgetSheets.splice(index, 1);
  },
};

export const actions = {

};

export const state = getInitialState;
