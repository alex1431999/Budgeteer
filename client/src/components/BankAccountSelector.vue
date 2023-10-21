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
        <v-list v-if="bankAccounts.length > 0">
          <v-list-item v-for="bankAccount in bankAccounts" :key="bankAccount.id">
            <v-btn @click="$emit('input', bankAccount)" text>
              {{ bankAccount.name }}
            </v-btn>
          </v-list-item>
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
});
</script>

<style>

</style>
