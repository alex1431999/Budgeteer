<template>
  <div class="navigation-drawer">
    <!-- Button to trigger drawer -->
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

    <!-- Drawer -->
    <v-navigation-drawer v-model="drawer" absolute temporary>

      <!-- Existing Sheets -->
      <v-list nav dense>
        <v-list-item-group
          v-model="budgetSheetSelected"
          active-class="light-blue--text text--accent-4"
        >
          <v-list-item
            v-for="budgetSheetDisplayed in budgetSheetsDisplayed"
            :key="budgetSheetDisplayed.data.name"
            @click="() => setBudgetSheetSelected(budgetSheetDisplayed)"
          >
            <!-- Edit sheet name button -->
            <v-list-item-icon>
              <v-btn
                x-small
                fab
                @click="budgetSheetDisplayed.isEditMode = true"
              >
                <v-icon color="blue">mdi-pencil</v-icon>
              </v-btn>
            </v-list-item-icon>

            <!-- Sheet name -->
            <v-list-item-title>
              <v-text-field
                dense
                hide-details
                v-model="budgetSheetDisplayed.nameEdited"
                :disabled="!budgetSheetDisplayed.isEditMode"
                @blur="() => onSheetNameEdit(budgetSheetDisplayed)"
                @keyup.enter="() => onSheetNameEdit(budgetSheetDisplayed)"
              />
            </v-list-item-title>

            <v-list-item-action>
              <!-- Delete sheet button -->
              <v-btn
                x-small
                fab
                :disabled="budgetSheetsInStore.length <= 1"
                @click="() => deleteSheet(budgetSheetDisplayed.data)"
              >
                <v-icon color="red">mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>

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
import { IBudgetSheet } from '../../types/Budget';

interface IBudgetSheetDisplayed {
  data: IBudgetSheet,
  isEditMode: boolean,
  nameEdited: string,
}

interface IData {
  budgetSheetsDisplayed: IBudgetSheetDisplayed[],
  drawer: boolean;
  budgetSheetSelected: IBudgetSheet | null;
}

export default Vue.extend({
  data(): IData {
    return {
      budgetSheetsDisplayed: [],
      drawer: false,
      budgetSheetSelected: null,
    };
  },
  computed: {
    budgetSheetsInStore(): IBudgetSheet[] {
      return this.$store.state.budgetStore.budgetSheets;
    },
  },
  watch: {
    budgetSheetsInStore: {
      handler() {
        this.syncBudgetSheets();
      },
      deep: true,
    },
  },
  mounted() {
    this.syncBudgetSheets();
  },
  methods: {
    addSheet(): void {
      const sheet: IBudgetSheet = {
        name: this.pickAvailableSheetName(),
        budgetGroups: [],
        income: null,
      };

      this.$store.dispatch('addBudgetSheet', sheet);
    },
    deleteSheet(budgetSheet: IBudgetSheet): void {
      this.$store.dispatch('deleteBudgetSheet', budgetSheet);
    },
    onSheetNameEdit(budgetSheetDisplayed: IBudgetSheetDisplayed) {
      // Disable edit mode
      const sheet = this.budgetSheetsDisplayed.find(
        ({ data }) => data.name === budgetSheetDisplayed.data.name,
      );

      if (sheet) {
        sheet.isEditMode = false;
      }

      // Save updated name to store
      const { data, nameEdited } = budgetSheetDisplayed;
      this.$store.dispatch('setBudgetSheetName', { budgetSheet: data, name: nameEdited });
    },
    setBudgetSheetSelected(budgetSheetDisplayed: IBudgetSheetDisplayed): boolean {
      if (budgetSheetDisplayed.isEditMode) {
        return false;
      }

      this.$store.dispatch('setBudgetSheetSelected', budgetSheetDisplayed.data);

      return true;
    },
    syncBudgetSheets() {
      this.budgetSheetsDisplayed = this.budgetSheetsInStore.map((budgetSheet: IBudgetSheet) => (
        { data: budgetSheet, isEditMode: false, nameEdited: budgetSheet.name }
      ));
    },
    pickAvailableSheetName() {
      const budgetSheetNames = this.budgetSheetsInStore.map(({ name }) => name);
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

<style lang="scss" scoped>
</style>
