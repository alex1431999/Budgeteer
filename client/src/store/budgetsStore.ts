import { Commit } from 'vuex';

import { IBudgetSheet } from '../../../types/Budget';

interface IState {
  budgetSheets: IBudgetSheet[],
  budgetSheetSelected: IBudgetSheet,
}

interface IActionParams {
  commit: Commit,
  state: IState,
}

/**
 * Default budget sheet which is loaded if the user doesn't have a sheet yet
 */
const budgetSheetDefault: IBudgetSheet = {
  name: 'New Sheet',
  budgetGroups: [],
};

const getInitialState = (): IState => ({
  budgetSheets: [budgetSheetDefault],
  budgetSheetSelected: budgetSheetDefault,
});

export const mutations = {
  setBudgetSheets(state: IState, budgetSheets: IBudgetSheet[]): void {
    state.budgetSheets = budgetSheets;
  },
  addBudgetSheet(state: IState, budgetSheet: IBudgetSheet): void {
    state.budgetSheets.push(budgetSheet);
  },
  deleteBudgetSheet(state: IState, budgetSheet: IBudgetSheet): void {
    const index = state.budgetSheets.findIndex(
      (budgetSheetCurrent) => budgetSheetCurrent.name === budgetSheet.name,
    );
    state.budgetSheets.splice(index, 1);
  },
  setBudgetSheetSelected(state: IState, budgetSheet: IBudgetSheet): void {
    state.budgetSheetSelected = budgetSheet;
  },
};

export const actions = {
  addBudgetSheet({ commit, state }: IActionParams, budgetSheet: IBudgetSheet): boolean {
    const sheetExists = state.budgetSheets.find(({ name }) => name === budgetSheet.name);

    if (sheetExists) {
      return false;
    }

    // Add sheet
    commit('addBudgetSheet', budgetSheet);
    return true;
  },
  loadBudgetSheets({ commit }: IActionParams): void {
    // TODO add step that loads budget sheets from api
    const budgetSheets: IBudgetSheet[] = [];

    // Set budget sheets
    commit('setBudgetSheets', budgetSheets);

    /* If no sheets are stored load default sheet */
    if (budgetSheets.length === 0) {
      commit('addBudgetSheet', budgetSheetDefault);
    }
  },
  saveBudgetSheets(): void {
    // TODO: send save request to store the budget sheets
  },
};

export const state = getInitialState;
