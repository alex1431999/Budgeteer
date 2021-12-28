export interface IBudget {
  id: string,
  icon: string,
  value: number,
}

export interface IBudgetGroup {
  name: string,
  icon: string,
  budgets?: IBudget[],
}
