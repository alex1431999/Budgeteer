<template>
  <div class="bank-account">
    <v-text-field
      ref="nameInput"
      placeholder="Name"
      hide-details
      solo
      :value="name"
      :background-color="backgroundColor"
      @change="$emit('name-updated', $event)">
    </v-text-field>
    <ColorSelector
      class="bank-account__color-selector"
      :value="color"
      @input="$emit('color-updated', $event)"
    />
    <v-menu class="bank-account__menu" bottom offset-y>
      <template v-slot:activator="{ on, attrs  }">
        <v-btn
          x-small
          fab
          v-bind="attrs"
          v-on="on"
          class="bank-account__menu__trigger"
        >
          <v-icon color="blue">mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item @click="remove">
          Delete
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ColorSelector from '@/components/ColorSelector.vue';
import { applyOpacity } from '@/utils/color';

export default Vue.extend({
  name: 'BankAccount',
  components: { ColorSelector },
  props: {
    name: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: 'primary',
    },
  },
  computed: {
    backgroundColor() {
      return applyOpacity(this.color, 40);
    },
  },
  methods: {
    remove() : void {
      this.$emit('remove');
    },
  },
});
</script>

<style scoped lang="scss">
.bank-account {
  display: flex;
  align-items: center;

  &__color-selector {
    margin-left: 20px;
  }

  &__menu__trigger {
    margin-left: 20px;
  }
}
</style>
