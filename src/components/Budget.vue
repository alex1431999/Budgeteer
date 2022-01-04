<template>
  <div class="budget">
    <v-container>
      <v-row>

        <!-- Budget Name -->
        <v-col>
          <v-text-field
            placeholder="Name"
            outlined
            :value="name"
            @input="value => $emit('update:name', value || '')"
          >
          </v-text-field>
        </v-col>

        <!-- Budget Allocation -->
        <v-col>
          <v-text-field
            outlined
            type="number"
            :value="value"
            @input="value => $emit('input', parseInt(value) || 0)"
          >
            <v-icon slot="append" color="blue">{{icon}}</v-icon>
          </v-text-field>
        </v-col>
      </v-row>
    </v-container>

    <v-spacer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    value: {
      type: Number,
      required: true,
    },
    icon: {
      type: String,
    },
    name: {
      type: String,
      default: '',
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
});
</script>

<style>

</style>
