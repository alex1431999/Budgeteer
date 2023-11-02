<template>
  <div>
    <v-menu
      v-model="show"
      offset-y
      top
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn x-small fab v-bind="attrs" v-on="on">
          <v-icon color="blue">mdi-brush</v-icon>
        </v-btn>
      </template>

      <v-card>
        <ColorGrid
          :colors="colors"
          :color-selected="value"
          @selected="$emit('input', $event)"/>
      </v-card>
    </v-menu>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ColorGrid from '@/components/ColorGrid.vue';

interface IData {
  show: boolean,
}

export default Vue.extend({
  components: { ColorGrid },
  data(): IData {
    return {
      show: false,
    };
  },
  props: {
    value: {
      type: String,
      default: null,
    },
  },
  computed: {
    colors() {
      return [
        '#008080', // Teal
        '#FF6B6B', // Coral
        '#708090', // Slate Gray
        '#98FB98', // Mint Green
        '#E6E6FA', // Lavender
        '#FFD700', // Mustard Yellow
        '#4169E1', // Royal Blue
        '#E2725B', // Terracotta
      ];
    },
  },
});
</script>
