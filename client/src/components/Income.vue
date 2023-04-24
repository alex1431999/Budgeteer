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
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  props: {
    value: {
      required: true,
    },
  },
});
</script>

<style>

</style>
