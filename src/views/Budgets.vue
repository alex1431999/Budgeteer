<template>
  <div class="budgets">
    <!-- Income -->
    <v-sheet class="budgets--sheet" rounded="xl">
      <income v-model="income"/>
    </v-sheet>

    <!-- Budgets -->
    <v-sheet class="budgets--sheet" rounded="xl">
      <!-- Excess -->
      <excess :value="budgetRemaining"/>

      <!-- Budget Groups -->
      <budget-group :budgets="budgets" :budget-remaining="budgetRemaining" />

      <!-- Add budget group button -->
      <add-budget-group-dialog class="budgets__add-budget-group-button" />
    </v-sheet>
  </div>
</template>

<script lang="ts">
import Income from '@/components/Income.vue';
import { IBudget } from '@/types/Budget';
import BudgetGroup from '@/components/BudgetGroup.vue';
import Excess from '@/components/Excess.vue';
import AddBudgetGroupDialog from '@/components/AddBudgetGroupDialog.vue';

interface IData {
  income: number | null;
  budgets: IBudget[],
}

export default {
  components: {
    Income, BudgetGroup, Excess, AddBudgetGroupDialog,
  },
  data(): IData {
    return {
      income: null,
      budgets: [
        {
          id: '0',
          icon: 'mdi-bank',
          value: 0,
        },
        {
          id: '1',
          icon: 'mdi-food-fork-drink',
          value: 0,
        },
      ],
    };
  },
  computed: {
    budgetAllocated(): number {
      return this.budgets.reduce((sum: number, budget: IBudget) => sum + budget.value, 0);
    },
    budgetRemaining(): number {
      return this.income ? this.income - this.budgetAllocated : 0 - this.budgetAllocated;
    },
  },
};
</script>

<style lang="scss" scoped>
.budgets {
  margin: auto;
  width: 40%;

  &--sheet {
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
