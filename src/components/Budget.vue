<template>
  <div class="budget">
    <v-slider thumb-label ticks :prepend-icon="icon" :max="max"/>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
    },
    max: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style>

</style>
