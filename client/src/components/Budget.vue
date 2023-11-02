<template>
  <div class="budget">
    <v-container>
      <v-row>

        <!-- Budget Name -->
        <v-col :cols="isMobile ? 12 : 7">
          <v-text-field
            placeholder="Name"
            hide-details
            outlined
            :background-color="color"
            :value="name"
            @input="value => $emit('update:name', value || '')"
          >
          </v-text-field>
        </v-col>

        <!-- Budget Allocation -->
        <v-col :cols="isMobile ? 12 : 3">
          <v-text-field
            outlined
            hide-details
            type="number"
            :value="value"
            :background-color="color"
            @input="value => $emit('input', parseInt(value) || 0)"
          >
            <v-icon slot="append" color="blue">mdi-currency-usd</v-icon>
          </v-text-field>
        </v-col>

        <!-- Delete Budget -->
        <v-col :cols="isMobile ? 6 : 1">
          <v-btn class="budget__action-button" fab small @click="$emit('on-delete')">
            <v-icon color="red">mdi-delete</v-icon>
          </v-btn>
        </v-col>

        <v-col :cols="isMobile ? 6 : 1">
          <BankAccountSelector
            class="budget__action-button"
            :value="bankAccountId"
            :bank-accounts="bankAccounts"
            @input="$emit('update:bankAccountId', $event.id)"
          />
        </v-col>
      </v-row>
    </v-container>

    <v-spacer />

    <!-- Create some margin to the bottom -->
    <span v-if="isMobile">
      <br />
      <br />
    </span>
  </div>
</template>

<script lang="ts">
import { isMobile } from '@/utils/mobile';
import Vue from 'vue';
import BankAccountSelector from '@/components/BankAccountSelector.vue';
import { IBankAccount } from '@/types/BankAccount';
import { applyOpacity } from '@/utils/color';

export default Vue.extend({
  components: { BankAccountSelector },
  props: {
    value: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      default: '',
    },
    bankAccountId: {
      type: String,
      default: null,
    },
  },
  computed: {
    isMobile(): boolean {
      return isMobile();
    },
    bankAccounts(): IBankAccount[] {
      return this.$store.state.bankAccountsStore.bankAccounts;
    },
    bankAccount(): IBankAccount | null {
      return this.bankAccounts.find(({ id }) => id === this.bankAccountId) || null;
    },
    color(): string | null {
      if (this.bankAccount === null) {
        return null;
      }
      return applyOpacity(this.bankAccount.color, 40);
    },
  },
});
</script>

<style lang="scss" scoped>
.budget {
  &__action-button {
    margin-top: 8px;
  }
}

</style>
