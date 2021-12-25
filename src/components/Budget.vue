<template>
  <div class="budget">
    <v-slider thumb-label ticks :max="max">
      <v-icon slot="prepend" color="blue">{{ icon }}</v-icon>
    </v-slider>
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
