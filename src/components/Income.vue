<template>
  <div class="income">
    <v-text-field
      hide-details
      outlined
      label="Monthly Income"
      append-icon="mdi-cash"
      type="number"
      @input="value => $emit('input', value)"
    />
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
