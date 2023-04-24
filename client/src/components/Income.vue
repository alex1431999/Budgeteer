<template>
  <div class="income">
    <v-text-field
      hide-details
      outlined
      label="Monthly Income"
      type="number"
      color="green"
      :value="value"
      @input="value => $emit('input', parseInt(value) || 0)"
    >
      <v-icon slot="append" color="green">mdi-currency-usd</v-icon>
    </v-text-field>
    <div class="income__bank-accounts">
      <BankAccountsDialog />
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import BankAccountsDialog from '@/components/BankAccountsDialog.vue';

export default Vue.extend({
  components: { BankAccountsDialog },
  props: {
    value: {
      required: true,
    },
  },
});
</script>

<style>
.income {
  display: flex;
  align-items: center;
}

.income__bank-accounts {
  margin-left: 20px;
}
</style>
