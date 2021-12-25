<template>
  <div class="budgets">
    <v-sheet class="budgets__sheet " rounded="xl">
      <div v-for="budget in budgets" :key="budget.id">
        <Budget :icon="budget.icon" :max="budget.max"/>
      </div>
    </v-sheet>
  </div>
</template>

<script lang="ts">
import Budget from '@/components/Budget.vue';
import { IBudget } from '@/types/Budget';

export default {
  components: { Budget },
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
  width: 20%;

  &__sheet {
    padding: 50px;
  }
}
</style>
