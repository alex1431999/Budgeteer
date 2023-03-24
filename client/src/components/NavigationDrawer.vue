<template>
  <div class="navigation-drawer">
    <!-- Button to trigger drawer -->
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

    <!-- Drawer -->
    <v-navigation-drawer v-model="drawer" absolute temporary :width="navigatorWidth">

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

            <!-- Sheet name -->
            <v-list-item-title>
              <v-text-field
                class="navigation-drawer__sheet-name"
                dense
                hide-details
                v-model="budgetSheetDisplayed.nameEdited"
                :disabled="!budgetSheetDisplayed.isEditMode"
                @blur="() => onSheetNameEdit(budgetSheetDisplayed)"
                @keyup.enter="() => onSheetNameEdit(budgetSheetDisplayed)"
              />
            </v-list-item-title>

            <v-list-item-action>
              <!-- Options menu -->
              <v-menu bottom offset-y>
                <template v-slot:activator="{ on, attrs  }">
                  <v-btn
                    class="navigation-drawer__menu-button"
                    x-small
                    fab
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon color="blue">mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>

                <v-list>
                  <!-- Edit sheet button -->
                  <v-list-item
                    @click="budgetSheetDisplayed.isEditMode = true"
                  >
                    Rename
                  </v-list-item>

                  <!-- Delete sheet button -->
                  <v-list-item
                    :disabled="budgetSheetsInStore.length <= 1"
                    @click="() => deleteSheet(budgetSheetDisplayed.data)"
                  >
                    Delete
                  </v-list-item>

                  <!-- Copy sheet button -->
                  <v-list-item
                    :disabled="budgetSheetsInStore.length <= 1"
                    @click="() => copySheet(budgetSheetDisplayed.data)"
                  >
                    Copy
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-list-item-action>

          </v-list-item>
        </v-list-item-group>
      </v-list>

      <!-- Add new sheet -->
        <v-btn
          small
          fab
          @click="addSheet('New Sheet')"
        >
          <v-icon color="blue">mdi-plus</v-icon>
        </v-btn>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { IBudgetSheet } from '@/types/Budget';
import { isMobile } from '@/utils/mobile';

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
    navigatorWidth(): number {
      return isMobile() ? 250 : 350;
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
    addSheet(name = 'New Sheet'): void {
      const sheet: IBudgetSheet = {
        name: this.pickAvailableSheetName(name),
        budgetGroups: [],
        income: null,
      };

      this.$store.dispatch('addBudgetSheet', sheet);
    },
    deleteSheet(budgetSheet: IBudgetSheet): void {
      this.$store.dispatch('deleteBudgetSheet', budgetSheet);
    },
    copySheet(budgetSheet: IBudgetSheet): void {
      const budgetSheetCopy: IBudgetSheet = {
        ...budgetSheet,
        name: this.pickAvailableSheetName(budgetSheet.name),
      };
      this.$store.dispatch('addBudgetSheet', budgetSheetCopy);
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
    pickAvailableSheetName(sheetName = 'New Sheet') {
      const budgetSheetNames = this.budgetSheetsInStore.map(({ name }) => name);
      let name = null;
      let counter = 1;
      while (name === null) {
        const potentialName = `${sheetName} (${counter})`;

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
.navigation-drawer {
  &__sheet-name {
    ::v-deep input {
      text-overflow: ellipsis;
      text-align: center;
    }
  }

  &__menu-button {
    margin-right: 10px;
  }
}
</style>
