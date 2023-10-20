<template>
  <!-- Loading spinner -->
  <div v-if="isLoading">
    <v-progress-circular
      indeterminate
      color="primary"
    ></v-progress-circular>
  </div>

  <!-- Content -->
  <div v-else class="budgets">
    <!-- Income -->
    <v-sheet class="budgets--sheet--income" :rounded="isMobile ? '' : 'xl'">
      <income v-model="income"/>
    </v-sheet>

    <!-- Budgets -->
    <v-sheet class="budgets--sheet--budgets" :rounded="isMobile ? '' : 'xl'">
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
        :no-groups-yet="budgetGroups.length === 0"
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
import { setBudgetSheets, getBudgetSheets } from '@/api/budgets';
import { IBudget, IBudgetGroup, IBudgetSheet } from '@/types/Budget';
import { isMobile } from '@/utils/mobile';
import { IBankAccount } from '@/types/BankAccount';
import { getBankAccounts, setBankAccounts } from '@/api/bankAccounts';

interface IData {
  income: number | null;
  budgetGroups: IBudgetGroup[],
  isLoading: boolean,
}

export default Vue.extend({
  components: {
    Income, BudgetGroup, Excess, AddBudgetGroupDialog,
  },
  data(): IData {
    return {
      income: null,
      budgetGroups: [],
      isLoading: false,
    };
  },
  computed: {
    isMobile(): boolean {
      return isMobile();
    },
    budgetSheetSelected(): IBudgetSheet {
      return this.$store.state.budgetStore.budgetSheetSelected;
    },
    budgetSheets(): IBudgetSheet[] {
      return this.$store.state.budgetStore.budgetSheets;
    },
    bankAccounts(): IBankAccount[] {
      return this.$store.state.bankAccountsStore.bankAccounts;
    },
    budgetAllocated(): number {
      // eslint-disable-next-line max-len
      return this.budgetGroups.reduce((totalSum: number, budgetGroup: IBudgetGroup) => totalSum + budgetGroup.budgets.reduce((sum: number, budget: IBudget) => sum + budget.value, 0), 0);
    },
    budgetRemaining(): number {
      return this.income ? this.income - this.budgetAllocated : 0 - this.budgetAllocated;
    },
    isSignedIn(): boolean {
      return this.$store.state.authStore.isSignedIn;
    },
  },
  watch: {
    isSignedIn: {
      async handler(isSignedIn: boolean) {
        if (isSignedIn) {
          this.isLoading = true;

          const budgetSheets = (await getBudgetSheets()).data;
          this.$store.dispatch('setBudgetSheets', budgetSheets);

          const bankAccounts = (await getBankAccounts()).data;
          this.$store.dispatch('setBankAccounts', bankAccounts);

          this.isLoading = false;
        }
      },
      immediate: true,
    },
    budgetSheetSelected: {
      handler(budgetSheet: IBudgetSheet) {
        this.budgetGroups = budgetSheet.budgetGroups;
        this.income = budgetSheet.income;
      },
      immediate: true,
      deep: true,
    },
    budgetSheets: {
      async handler(budgetSheets: IBudgetSheet[]) {
        if (this.isSignedIn) {
          const budgetSheetsUpdated: IBudgetSheet[] = (await setBudgetSheets(budgetSheets)).data;
          this.$store.commit('setBudgetSheets', budgetSheetsUpdated);
        }
      },
      deep: true,
    },
    bankAccounts: {
      async handler(bankAccounts: IBankAccount[]) {
        if (this.isSignedIn) {
          const bankAccountsUpdated: IBankAccount[] = (await setBankAccounts(bankAccounts)).data;
          this.$store.commit('setBankAccounts', bankAccountsUpdated);
        }
      },
      deep: true,
    },
    budgetGroups: {
      handler() {
        this.storeBudgetGroups();
      },
      deep: true,
    },
    income(): void {
      this.storeIncome();
    },
  },
  methods: {
    addBudgetGroup(budgetGroup: IBudgetGroup): void {
      this.budgetGroups.push(budgetGroup);
    },
    deleteBudgetGroup(index: number): void {
      this.budgetGroups.splice(index, 1);
    },
    storeBudgetGroups() {
      this.$store.dispatch('setBudgetGroups', this.budgetGroups);
    },
    storeIncome() {
      this.$store.dispatch('setIncome', this.income);
    },
  },
});
</script>

<style lang="scss" scoped>
.budgets {
  margin: auto;
  max-width: 800px;

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
      padding: 50px 50px 30px;
      margin-bottom: 10%;
    }
  }

  &__add-budget-group-button {
    margin-top: 5%;
  }
}
</style>
