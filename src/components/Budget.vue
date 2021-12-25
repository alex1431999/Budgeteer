<template>
  <div class="budget">
    <v-slider thumb-label ticks hide-details :max="max" @input="value => $emit('input', value)">
      <v-icon slot="prepend" color="blue">{{ icon }}</v-icon>
    </v-slider>
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
