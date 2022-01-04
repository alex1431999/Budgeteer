<template>
  <div class="budget-group">
    <v-expansion-panels accordion inset v-model="showPanelModel">
      <v-expansion-panel>
        <span class="budget-group__header">
          {{ budgetGroup.name }}
        </span>

        <!-- Budgets Allocated -->
        <v-expansion-panel-header disable-icon-rotate>
          <v-slider
            readonly
            :key="budgetAllocated + income"
            :value="budgetAllocated"
            :max="income"
          >
            <v-icon slot="append" color="blue">{{budgetGroup.icon}}</v-icon>
          </v-slider>

          <!-- This is only to make `disable-icon-rotate` work -->
          <template v-slot:actions>
            <span></span>
          </template>
        </v-expansion-panel-header>

        <!-- Budgets -->
        <v-expansion-panel-content>
          <div v-for="(budget, i) in budgets" :key="i">
            <Budget
              v-model="budget.value"
              :icon="budget.icon"
              :name.sync="budget.name"
              :budget-remaining="budgetRemaining"
            />
          </div>
        </v-expansion-panel-content>

        <!-- Add Budget button -->
        <v-btn
          class="budget-group__add-budget-button"
          small
          fab
          v-if="showPanel"
          @click="addBudget"
        >
          <v-icon color="blue">mdi-plus</v-icon>
        </v-btn>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import Budget from '@/components/Budget.vue';
import { IBudget, IBudgetGroup } from '@/types/Budget';
import { ICON_SELECTION_BUDGETS } from '@/config/iconSelection';

interface IData {
  showPanelModel: number,
}

export default Vue.extend({
  components: { Budget },
  props: {
    budgetGroup: {
      type: Object as PropType<IBudgetGroup>,
    },
    income: {
      type: Number,
      required: true,
    },
  },
  data(): IData {
    return {
      showPanelModel: 0,
    };
  },
  computed: {
    budgets(): IBudget[] {
      return this.budgetGroup.budgets || [];
    },
    budgetAllocated(): number {
      return this.budgets.reduce((sum: number, budget: IBudget) => sum + budget.value, 0);
    },
    showPanel(): boolean {
      return this.showPanelModel === 0;
    },
  },
  methods: {
    addBudget(): void {
      const budget: IBudget = {
        name: '',
        icon: ICON_SELECTION_BUDGETS[0],
        value: 0,
      };
      this.budgetGroup.budgets.push(budget);
    },
  },
});
</script>

<style lang="scss" scoped>
.budget-group {
  &__header {
    color: rgb(242,242,242);
    font-size: 20px;
    font-weight: bolder;
  }

  &__add-budget-button {
    margin-bottom: 20px;
  }
}
</style>
