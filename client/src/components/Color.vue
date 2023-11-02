<template>
  <div
    class="color"
    :style="{ 'background-color': color }"
    @click="$emit('click')"
  >
    <v-icon class="color__selected" v-if="isSelected">mdi-check</v-icon>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend(
  {
    props: {
      color: {
        type: String,
        required: true,
      },
      isSelected: {
        type: Boolean,
        required: false,
        default: false,
      },
    },
  },
);
</script>

<style lang="scss" scoped>
.color {
  display: flex;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 2px;
  cursor: pointer;

  &__selected {
    flex: auto;
  }
}
</style>
