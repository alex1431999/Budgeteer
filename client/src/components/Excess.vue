<template>
  <div class="excess">
    <v-text-field :value="value" label="Excess" disabled outlined>
      <v-icon slot="append" :color="iconColor">mdi-cash</v-icon>
    </v-text-field>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    value: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    iconColor(): string {
      return this.value >= 0 ? 'green' : 'red';
    },
  },
});
</script>

<style>

</style>
