<template>
  <div class="navigation-drawer">
    <!-- Button to trigger drawer -->
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

    <!-- Drawer -->
    <v-navigation-drawer v-model="drawer" absolute bottom temporary>

      <!-- Existing Sheets -->
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

      <!-- Add new sheet -->
        <v-btn
          small
          fab
          @click="addSheet"
        >
          <v-icon color="blue">mdi-plus</v-icon>
        </v-btn>
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
  methods: {
    addSheet(): void {
      const sheet: IBudgetSheet = {
        name: this.pickAvailableSheetName(),
        budgetGroups: [],
      };

      this.$store.dispatch('addBudgetSheet', sheet);
    },
    pickAvailableSheetName() {
      const budgetSheetNames = this.budgetSheets.map(({ name }) => name);
      let name = null;
      let counter = 1;
      while (name === null) {
        const potentialName = `New Sheet (${counter})`;

        if (!budgetSheetNames.includes(potentialName)) {
          name = potentialName;
        } else {
          counter += 1;
        }
      }

      return name;
    },
  },
});
</script>

<style>
</style>
