<template>
  <div class="budget">
    <v-slider thumb-label ticks hide-details :max="max">
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
