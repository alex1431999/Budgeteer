<template>
  <div>
    <v-menu
      v-model="show"
      :close-on-content-click="true"
      offset-y
      top
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn small fab v-bind="attrs" v-on="on">
          <v-icon color="blue">mdi-bank</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-list dense v-if="bankAccounts.length > 0">
          <v-list-item-group color="primary" :value="selectedBankAccountPosition">
            <v-list-item v-for="bankAccount in bankAccounts" :key="bankAccount.id">
              <v-list-item-content @click="$emit('input', bankAccount)">
                <v-list-item-title v-text="bankAccount.name"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <v-card-text v-else>
          You don't have any bank accounts yet
        </v-card-text>
      </v-card>
    </v-menu>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { IBankAccount } from '@/types/BankAccount';

interface IData {
  show: boolean,
}

export default Vue.extend({
  data(): IData {
    return {
      show: false,
    };
  },
  props: {
    value: {
      type: String,
      default: null,
    },
    bankAccounts: {
      type: Array as PropType<IBankAccount[]>,
      default: (): IBankAccount[] => [],
    },
  },
  computed: {
    selectedBankAccountPosition(): number {
      return this.bankAccounts?.findIndex(({ id }) => id === this.value);
    },
  },
});
</script>

<style>

</style>
