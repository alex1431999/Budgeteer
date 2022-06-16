import { Commit } from 'vuex';

import { IBudgetSheet, IBudgetGroup } from '@/types/Budget';

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
  income: null,
};

const getInitialState = (): IState => ({
  budgetSheets: [budgetSheetDefault],
  budgetSheetSelected: budgetSheetDefault,
});

export const getters = {
  getIndexOfBudgetSheet(state: IState, budgetSheet: IBudgetSheet): number {
    return state.budgetSheets.findIndex(
      (budgetSheetCurrent) => budgetSheetCurrent.name === budgetSheet.name,
    );
  },
};

export const mutations = {
  setBudgetSheets(state: IState, budgetSheets: IBudgetSheet[]): void {
    state.budgetSheets = budgetSheets;
  },
  addBudgetSheet(state: IState, budgetSheet: IBudgetSheet): void {
    state.budgetSheets.push(budgetSheet);
  },
  deleteBudgetSheet(state: IState, budgetSheet: IBudgetSheet): void {
    const index = getters.getIndexOfBudgetSheet(state, budgetSheet);

    state.budgetSheets.splice(index, 1);
  },
  setBudgetSheetSelected(state: IState, budgetSheet: IBudgetSheet): void {
    state.budgetSheetSelected = budgetSheet;
  },
  setBudgetSheetName(
    state: IState,
    { budgetSheet, name }: { budgetSheet: IBudgetSheet, name: string },
  ): void {
    const index = getters.getIndexOfBudgetSheet(state, budgetSheet);

    if (index !== -1) {
      state.budgetSheets[index].name = name;
    }
  },
  setBudgetGroups(
    state: IState,
    { budgetSheet, budgetGroups }: { budgetSheet: IBudgetSheet, budgetGroups: IBudgetGroup[] },
  ): void {
    const index = getters.getIndexOfBudgetSheet(state, budgetSheet);

    if (index !== -1) {
      state.budgetSheets[index].budgetGroups = budgetGroups;
    }
  },
  setIncome(
    state: IState,
    { budgetSheet, income }: { budgetSheet: IBudgetSheet, income: number | null },
  ): void {
    const index = getters.getIndexOfBudgetSheet(state, budgetSheet);

    if (index !== -1) {
      state.budgetSheets[index].income = income;
    }
  },
};

export const actions = {
  setBudgetSheets({ commit, state }: IActionParams, budgetSheets: IBudgetSheet[]): void {
    // Set budget sheets
    commit('setBudgetSheets', budgetSheets);

    /* If no sheets are stored load default sheet */
    if (budgetSheets.length === 0) {
      commit('addBudgetSheet', budgetSheetDefault);
    }

    // Select the first sheet as a default
    commit('setBudgetSheetSelected', state.budgetSheets[0]);
  },
  addBudgetSheet({ commit, state }: IActionParams, budgetSheet: IBudgetSheet): boolean {
    const sheetExists = state.budgetSheets.find(({ name }) => name === budgetSheet.name);

    if (sheetExists) {
      return false;
    }

    // Add sheet
    commit('addBudgetSheet', budgetSheet);
    return true;
  },
  deleteBudgetSheet({ commit, state }: IActionParams, budgetSheet: IBudgetSheet): boolean {
    if (state.budgetSheets.length <= 1) {
      return false;
    }

    // Delete budget sheet
    commit('deleteBudgetSheet', budgetSheet);

    // Make sure that a delted budget is not selected
    if (budgetSheet.name === state.budgetSheetSelected.name) {
      commit('setBudgetSheetSelected', state.budgetSheets[0]);
    }

    return true;
  },
  setBudgetSheetSelected({ commit }: IActionParams, budgetSheet: IBudgetSheet): void {
    commit('setBudgetSheetSelected', budgetSheet);
  },
  setBudgetSheetName(
    { commit }: IActionParams,
    { budgetSheet, name }: { budgetSheet: IBudgetSheet, name: string },
  ): void {
    commit('setBudgetSheetName', { budgetSheet, name });
  },
  setBudgetGroups({ commit, state }: IActionParams, budgetGroups: IBudgetGroup[]): void {
    commit('setBudgetGroups', { budgetSheet: state.budgetSheetSelected, budgetGroups });
  },
  setIncome({ commit, state }: IActionParams, income: number | null): void {
    commit('setIncome', { budgetSheet: state.budgetSheetSelected, income });
  },
};

export const state = getInitialState;
