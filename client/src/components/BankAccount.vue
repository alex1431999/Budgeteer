<template>
  <div class="bank-account">
    <v-text-field
      ref="nameInput"
      :value="name"
      @change="$emit('name-updated', $event)"
      hide-details
      :readonly="!editMode"
      :solo="!editMode"
      @keyup.enter="editMode = false"
      placeholder="Name">
    </v-text-field>
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
        <v-list-item @click="rename">
          Rename
        </v-list-item>
        <v-list-item @click="remove">
          Delete
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

interface IData {
  editMode: boolean
}

export default Vue.extend({
  name: 'BankAccount',
  data(): IData {
    return {
      editMode: false,
    };
  },
  props: {
    name: {
      type: String,
      default: '',
    },
  },
  methods: {
    rename(): void {
      this.editMode = true;

      const nameInputRef = this.$refs.nameInput as any;
      nameInputRef.$refs.input.focus();
    },
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

  &__menu__trigger {
    margin-left: 20px;
  }
}
</style>
