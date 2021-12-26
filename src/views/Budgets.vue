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
    </v-sheet>
  </div>
</template>

<script lang="ts">
import Income from '@/components/Income.vue';
import { IBudget } from '@/types/Budget';
import BudgetGroup from '@/components/BudgetGroup.vue';
import Excess from '@/components/Excess.vue';

interface IData {
  income: number | null;
  budgets: IBudget[],
}

export default {
  components: { Income, BudgetGroup, Excess },
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
      return this.income ? this.income - this.budgetAllocated : 0;
    },
  },
};
</script>

<style lang="scss" scoped>
.budgets {
  margin: auto;
  width: 40%;

  &--sheet {
    padding: 50px;
    margin-bottom: 10%;
  }
}
</style>
