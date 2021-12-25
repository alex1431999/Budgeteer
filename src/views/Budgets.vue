<template>
  <div class="budgets">
    <div v-for="budget in budgets" :key="budget.id" class="budgets__budget">
      <Budget :icon="budget.icon" :max="budget.max"/>
    </div>
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
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
.budgets {
  &__budget {
    margin: auto;
    width: 20%;
  }
}
</style>
