<template>
  <div class="navigation-drawer">
    <!-- Button to trigger drawer -->
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

    <!-- Drawer -->
    <v-navigation-drawer v-model="drawer" absolute bottom temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="budgetSheetSelected"
          active-class="light-blue--text text--accent-4"
        >
          <v-list-item
            v-for="budgetSheet in budgetSheets"
            :key="budgetSheet.name"
          >
            <v-list-item-title>{{ budgetSheet.name }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { IBudgetSheet } from '../../../types/Budget';

interface IData {
  drawer: boolean;
  budgetSheetSelected: IBudgetSheet | null;
}

export default Vue.extend({
  data(): IData {
    return {
      drawer: false,
      budgetSheetSelected: null,
    };
  },
  computed: {
    budgetSheets(): IBudgetSheet[] {
      return this.$store.state.budgetStore.budgetSheets;
    },
  },
});
</script>

<style>
</style>
