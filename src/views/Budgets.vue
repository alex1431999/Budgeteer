<template>
  <div class="budgets">
    <!-- Income -->
    <v-sheet class="budgets--sheet" rounded="xl">
      <income />
    </v-sheet>

    <!-- Budgets -->
    <v-sheet class="budgets--sheet" rounded="xl">
      <div v-for="budget in budgets" :key="budget.id">
        <Budget :icon="budget.icon" :max="budget.max"/>
      </div>
    </v-sheet>
  </div>
</template>

<script lang="ts">
import Budget from '@/components/Budget.vue';
import Income from '@/components/Income.vue';
import { IBudget } from '@/types/Budget';

export default {
  components: { Budget, Income },
  computed: {
    budgets(): IBudget[] {
      return [
        {
          id: '0',
          icon: 'mdi-bank',
          max: 15,
        },
        {
          id: '1',
          icon: 'mdi-food-fork-drink',
          max: 12,
        },
      ];
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
