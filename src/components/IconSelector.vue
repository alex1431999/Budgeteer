<template>
  <div class="icon-selector">
     <v-menu
        v-model="show"
        :close-on-content-click="true"
        :nudge-width="200"
        offset-y
        top
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn small fab v-bind="attrs" v-on="on">
            <v-icon color="blue">{{ value }}</v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-btn
            @click="$emit('input', icon)"
            v-for="icon in icons"
            :key="icon"
            small
            fab
          >
            <v-icon color="blue">{{ icon }}</v-icon>
          </v-btn>
        </v-card>
      </v-menu>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

interface IData {
  show: boolean,
}

export default Vue.extend({
  data(): IData {
    return {
      show: false,
    };
  },
  props: {
    value: {
      type: String,
      default: 'mdi-bank',
    },
    icons: {
      type: Array as PropType<string[]>,
      default: (): string[] => [],
    },
  },
});
</script>

<style>

</style>
