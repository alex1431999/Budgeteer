export interface IBudget {
  id: string,
  name: string,
  value: number,
}

export interface IBudgetGroup {
  id: string,
  name: string,
  icon: string,
  budgets: IBudget[],
}

export interface IBudgetSheet {
  id: string,
  name: string,
  income: number | null,
  budgetGroups: IBudgetGroup[],
}
