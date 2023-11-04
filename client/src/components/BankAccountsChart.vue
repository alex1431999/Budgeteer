<template>
  <Doughnut
    class="bank-accounts-chart"
    :chart-data="chartData"
    :chart-options="chartOptions"
  />
</template>

<script lang="ts">
import Vue from 'vue';
import { Doughnut } from 'vue-chartjs';
import {
  Chart as ChartJS, ArcElement, Legend, ChartData, Tooltip,
} from 'chart.js';
import { IBankAccount } from '@/types/BankAccount';
import { IBudget, IBudgetGroup } from '@/types/Budget';

ChartJS.register(ArcElement);
ChartJS.register(Legend);
ChartJS.register(Tooltip);

export default Vue.extend({
  name: 'BankAccountsChart',
  components: { Doughnut },
  props: {
    bankAccounts: {
      type: Array,
      required: true,
    },
  },
  computed: {
    chartData(): ChartData {
      const config = {
        labels: [] as Array<string>,
        datasets: [{
          label: 'Bank Accounts',
          data: [] as Array<number>,
          backgroundColor: [] as Array<string>,
        }],
      };

      (this.bankAccounts as IBankAccount[]).forEach((bankAccount: IBankAccount) => {
        config.labels.push(bankAccount.name);
        config.datasets[0].data.push(this.getBudgetAllocated(bankAccount));
        config.datasets[0].backgroundColor.push(bankAccount.color);
      });

      return config;
    },
    chartOptions() {
      return {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: '#FFFFFF',
            },
          },
        },
      };
    },
  },
  methods: {
    getBudgetAllocated(bankAccount: IBankAccount): number {
      const { budgetGroups } = this.$store.state.budgetStore.budgetSheetSelected;
      return budgetGroups.reduce((sum: number, budgetGroup: IBudgetGroup) => {
        const budgets = budgetGroup.budgets
          .filter(({ bankAccountId }) => bankAccountId === bankAccount.id);
        const budgetsSum = budgets
          .reduce((budgetSum: number, budget: IBudget) => budgetSum + budget.value, 0);
        return sum + budgetsSum;
      }, 0);
    },
  },
});
</script>

<style scoped>
.bank-accounts-chart {
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 15px;
  width: 50%;
  height: 50%;
}
</style>
