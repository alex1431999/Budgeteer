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
        v-for="(budgetGroup, i) in budgetGroups"
        :key="budgetGroup.name"
        :income="income || 0"
        :budgetGroup="budgetGroup"
        @on-delete="deleteBudgetGroup(i)"
      />

      <!-- Add budget group button -->
      <add-budget-group-dialog
        class="budgets__add-budget-group-button"
        @on-submit="addBudgetGroup"
      />
    </v-sheet>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Income from '@/components/Income.vue';
import BudgetGroup from '@/components/BudgetGroup.vue';
import Excess from '@/components/Excess.vue';
import AddBudgetGroupDialog from '@/components/AddBudgetGroupDialog.vue';
import { setBudgetGroups } from '@/api/budgets';
import { IBudget, IBudgetGroup, IBudgetSheet } from '../../../types/Budget';

interface IData {
  income: number | null;
  budgetGroups: IBudgetGroup[],
}

export default Vue.extend({
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
  mounted(): void {
    this.$store.dispatch('loadBudgetSheets');

    this.budgetGroups = JSON.parse(localStorage.getItem('budgetGroups') || '[]') || [];
    this.income = parseInt(localStorage.getItem('income') || '', 10) || null;
  },
  watch: {
    budgetGroups: {
      handler() {
        this.storeBudgetGroups();
      },
      deep: true,
    },
    income(value: number): void {
      localStorage.setItem('income', value.toString());
    },
  },
  methods: {
    addBudgetGroup(budgetGroup: IBudgetGroup): void {
      this.budgetGroups.push(budgetGroup);
    },
    deleteBudgetGroup(index: number): void {
      this.budgetGroups.splice(index, 1);
    },
    isSignedIn() {
      return window.gapi?.auth2?.getAuthInstance().isSignedIn.get();
    },
    storeBudgetGroups() {
      if (this.isSignedIn()) {
        setBudgetGroups(this.budgetGroups);
      } else {
        localStorage.setItem('budgetGroups', JSON.stringify(this.budgetGroups));
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.budgets {
  margin: auto;
  width: 40%;

  &--sheet {
    &--budget_sheet_menu {
      padding: 50px;
      margin-bottom: 10%;
    }

    &--income {
      padding: 50px;
      margin-bottom: 10%;
    }

    &--budgets {
      padding-top: 50px;
      padding-left: 50px;
      padding-right: 50px;
      padding-bottom: 30px;
      margin-bottom: 10%;
    }
  }

  &__add-budget-group-button {
    margin-top: 5%;
  }
}
</style>
