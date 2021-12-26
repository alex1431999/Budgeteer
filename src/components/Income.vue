<template>
  <div class="income">
    <v-text-field
      hide-details
      outlined
      label="Monthly Income"
      type="number"
      color="green"
      @input="value => $emit('input', parseInt(value) || 0)"
    >
      <v-icon slot="append" color="green">mdi-bank</v-icon>
    </v-text-field>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      required: true,
    },
  },
};
</script>

<style>

</style>
