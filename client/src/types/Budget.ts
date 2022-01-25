export interface IBudget {
  name: string,
  value: number,
}

export interface IBudgetGroup {
  name: string,
  icon: string,
  budgets: IBudget[],
}
