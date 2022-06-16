<template>
  <div class="budget">
    <v-container>
      <v-row>

        <!-- Budget Name -->
        <v-col :cols="isMobile ? 12 : 7">
          <v-text-field
            placeholder="Name"
            hide-details
            outlined
            :value="name"
            @input="value => $emit('update:name', value || '')"
          >
          </v-text-field>
        </v-col>

        <!-- Budget Allocation -->
        <v-col :cols="isMobile ? 10 : 4">
          <v-text-field
            outlined
            hide-details
            type="number"
            :value="value"
            @input="value => $emit('input', parseInt(value) || 0)"
          >
            <v-icon slot="append" color="blue">mdi-currency-usd</v-icon>
          </v-text-field>
        </v-col>

        <!-- Delete Budget -->
        <v-col cols="1">
          <v-btn class="budget__delete-button" fab small @click="$emit('on-delete')">
            <v-icon color="red">mdi-delete</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <v-spacer />

    <!-- Create some margin to the bottom -->
    <span v-if="isMobile">
      <br />
      <br />
    </span>
  </div>
</template>

<script lang="ts">
import { isMobile } from '@/utils/mobile';
import Vue from 'vue';

export default Vue.extend({
  props: {
    value: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      default: '',
    },
  },
  computed: {
    isMobile(): boolean {
      return isMobile();
    },
  },
});
</script>

<style lang="scss" scoped>
.budget {
  &__delete-button {
    margin-top: 8px;
  }
}

</style>
