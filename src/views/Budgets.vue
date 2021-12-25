<template>
  <div class="budgets">
    <!-- Income -->
    <v-sheet class="budgets--sheet" rounded="xl">
      <income v-model="income"/>
    </v-sheet>

    <!-- Budgets -->
    <v-sheet class="budgets--sheet" rounded="xl">
      <div v-for="budget in budgets" :key="budget.id">
        <Budget v-model="budget.value" :icon="budget.icon" :budgetRemaining="budgetRemaining"/>
      </div>
    </v-sheet>
  </div>
</template>

<script lang="ts">
import Budget from '@/components/Budget.vue';
import Income from '@/components/Income.vue';
import { IBudget } from '@/types/Budget';

interface IData {
  income: number | null;
  budgets: IBudget[],
}

export default {
  components: { Budget, Income },
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
    margin-bottom: 20%;
  }
}
</style>
