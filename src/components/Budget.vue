<template>
  <div class="budget">
    <v-text-field
      outlined
      type="number"
      :value="value"
      @input="value => $emit('input', parseInt(value) || 0)"
    >
      <v-icon slot="append" color="blue">{{icon}}</v-icon>
    </v-text-field>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    value: {
      type: Number,
      required: true,
    },
    icon: {
      type: String,
    },
    budgetRemaining: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    max(): number {
      return this.budgetRemaining + this.value;
    },
  },
};
</script>

<style>

</style>
