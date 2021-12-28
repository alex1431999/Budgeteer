<template>
  <div class="budget-group">
    <v-expansion-panels accordion inset>
      <v-expansion-panel>
        <span class="budget-group__header">
          {{ budgetGroup.name }}
        </span>

        <!-- Budgets Allocated -->
        <v-expansion-panel-header disable-icon-rotate>
          <v-slider readonly :value="budgetAllocated" :max="max" >
            <v-icon slot="append" color="blue">{{budgetGroup.icon}}</v-icon>
          </v-slider>

          <!-- This is only to make `disable-icon-rotate` work -->
          <template v-slot:actions>
            <span></span>
          </template>
        </v-expansion-panel-header>

        <!-- Budgets -->
        <v-expansion-panel-content>
          <div v-for="budget in budgets" :key="budget.id">
            <Budget
              v-model="budget.value"
              :icon="budget.icon"
              :budget-remaining="budgetRemaining"
            />
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue';
import Budget from '@/components/Budget.vue';
import { IBudget, IBudgetGroup } from '@/types/Budget';

export default {
  components: { Budget },
  props: {
    budgetGroup: {
      type: Object as PropType<IBudgetGroup>,
    },
    budgetRemaining: {
      type: Number,
      required: true,
    },
  },
  computed: {
    budgets(): IBudget[] {
      return this.budgetGroup.budgets || [];
    },
    budgetAllocated(): number {
      return this.budgets.reduce((sum: number, budget: IBudget) => sum + budget.value, 0);
    },
    max(): number {
      return this.budgetAllocated + this.budgetRemaining;
    },
  },
};
</script>

<style lang="scss" scoped>
.budget-group {
  &__header {
    color: var(--primary-color);
    font-size: 20px;
    font-weight: bolder;
  }
}
</style>
