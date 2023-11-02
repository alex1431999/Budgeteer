<template>
  <div class="color-grid">
    <Color
      class="color-grid__color"
      v-for="color in colors"
      :key="color"
      :color="color"
      :is-selected="colorSelected === color"
      @click="$emit('selected', color)"
     />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Color from '@/components/Color.vue';

export default Vue.extend(
  {
    components: { Color },
    props: {
      colors: {
        type: Array,
        required: false,
        default: () => [],
      },
      colorSelected: {
        type: String,
        required: false,
        default: '#008080',
      },
    },
  },
);
</script>

<style lang="scss" scoped>
.color-grid {
  display: flex;
  flex-wrap: wrap;
  width: 200px;
  padding: 15px;

  &__color  {
    margin: 5px;
  }
}
</style>
