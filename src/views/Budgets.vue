<template>
  <div class="budgets">
    <!-- Income -->
    <v-sheet class="budgets--sheet--income" rounded="xl">
      <income v-model="income"/>
    </v-sheet>

    <!-- Budgets -->
    <v-sheet class="budgets--sheet--budgets" rounded="xl">
      <!-- Excess -->
      <excess :value="budgetRemaining"/>

      <!-- Budget Groups -->
      <budget-group
        v-for="budgetGroup in budgetGroups"
        :key="budgetGroup.name"
        :budgetGroup="budgetGroup"
        :budget-remaining="budgetRemaining"
      />

      <!-- Add budget group button -->
      <add-budget-group-dialog
        class="budgets__add-budget-group-button"
        @onSubmit="addBudgetGroup"
      />
    </v-sheet>
  </div>
</template>

<script lang="ts">
import Income from '@/components/Income.vue';
import { IBudget, IBudgetGroup } from '@/types/Budget';
import BudgetGroup from '@/components/BudgetGroup.vue';
import Excess from '@/components/Excess.vue';
import AddBudgetGroupDialog from '@/components/AddBudgetGroupDialog.vue';

interface IData {
  income: number | null;
  budgetGroups: IBudgetGroup[],
}

export default {
  components: {
    Income, BudgetGroup, Excess, AddBudgetGroupDialog,
  },
  data(): IData {
    return {
      income: null,
      budgetGroups: [],
    };
  },
  computed: {
    budgetAllocated(): number {
      // eslint-disable-next-line max-len
      return this.budgetGroups.reduce((totalSum: number, budgetGroup: IBudgetGroup) => totalSum + budgetGroup.budgets.reduce((sum: number, budget: IBudget) => sum + budget.value, 0), 0);
    },
    budgetRemaining(): number {
      return this.income ? this.income - this.budgetAllocated : 0 - this.budgetAllocated;
    },
  },
  methods: {
    addBudgetGroup(budgetGroup: IBudgetGroup): void {
      this.budgetGroups.push(budgetGroup);
    },
  },
};
</script>

<style lang="scss" scoped>
.budgets {
  margin: auto;
  width: 40%;

  &--sheet--income {
    padding: 50px;
    margin-bottom: 10%;
  }

    &--sheet--budgets {
    padding-top: 50px;
    padding-left: 50px;
    padding-right: 50px;
    padding-bottom: 30px;
    margin-bottom: 10%;
  }

  &__add-budget-group-button {
    margin-top: 5%;
  }
}
</style>
