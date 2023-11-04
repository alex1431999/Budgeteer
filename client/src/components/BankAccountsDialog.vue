<template>
  <v-dialog width="500">
    <!-- Trigger button -->
    <template v-slot:activator="{ on, attrs }">
      <v-btn small fab v-bind="attrs" v-on="on">
        <v-icon color="blue">mdi-bank</v-icon>
      </v-btn>
    </template>

    <!-- Dialog -->
    <v-card>
      <v-card-title>
        Bank Accounts
      </v-card-title>

      <!-- Content -->
      <v-card-text>
        <BankAccountsChart :bank-accounts="bankAccounts" />
        <v-divider />
        <BankAccount
          class="bank-account-dialog__bank-account"
          v-for="(bankAccount, index) in bankAccounts"
          :key="index"
          :name="bankAccount.name"
          :color="bankAccount.color"
          @remove="remove(index)"
          @name-updated="bankAccount.name = $event"
          @color-updated="bankAccount.color = $event"
        />
        <div class="bank-account-dialog__add-button">
          <v-btn
            small
            fab
            @click="add"
          >
            <v-icon color="blue">mdi-plus</v-icon>
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import BankAccount from '@/components/BankAccount.vue';
import { IBankAccount } from '@/types/BankAccount';
import { generateUUID } from '@/utils/uuid';
import BankAccountsChart from '@/components/BankAccountsChart.vue';

export default Vue.extend({
  name: 'BankAccountsDialog',
  components: { BankAccountsChart, BankAccount },
  computed: {
    bankAccounts(): IBankAccount[] {
      return this.$store.state.bankAccountsStore.bankAccounts;
    },
  },
  methods: {
    remove(index: number): void {
      this.$store.dispatch('removeBankAccount', index);
    },
    add() {
      const defaultBankAccount: IBankAccount = {
        id: generateUUID(),
        name: '',
        color: '#008080',
      };
      this.$store.dispatch('addBankAccount', defaultBankAccount);
    },
  },
});
</script>

<style scoped lang="scss">
.bank-account-dialog__bank-account:not(:nth-child(-1)) {
  margin-top: 15px;
  margin-bottom: 15px;
}

.bank-account-dialog__add-button {
  display: flex;
  justify-content: center;
  padding: 10px;
}
</style>
