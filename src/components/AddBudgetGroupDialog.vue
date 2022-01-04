<template>
  <div class="add-budget-group-dialog">
    <v-dialog v-model="show" width="500">
      <!-- Add button -->
      <template v-slot:activator="{ on, attrs }">
        <v-btn fab v-bind="attrs" v-on="on">
          <v-icon color="blue">mdi-plus</v-icon>
        </v-btn>
      </template>

      <!-- Dialog -->
        <v-card>
          <v-card-title>
            Add Bugdet Group
          </v-card-title>

          <v-card-text>
            <!-- Name -->
            <v-text-field label="Name" v-model="budgetGroupData.name">
              <!-- Icon -->
              <icon-selector
                slot="append-outer"
                v-model="budgetGroupData.icon"
                :icons="ICON_SELECTION_BUDGET_GROUPS"
              />
            </v-text-field>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="submit"
            >
              Add
            </v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import IconSelector from './IconSelector.vue';
import { ICON_SELECTION_BUDGET_GROUPS } from '@/config/iconSelection';
import { IBudgetGroup } from '@/types/Budget';

interface IData {
  ICON_SELECTION_BUDGET_GROUPS: string[],
  show: boolean,
  budgetGroupData: IBudgetGroup,
}

export default Vue.extend({
  components: { IconSelector },
  data(): IData {
    return {
      ICON_SELECTION_BUDGET_GROUPS,
      show: false,
      budgetGroupData: {
        name: '',
        icon: ICON_SELECTION_BUDGET_GROUPS[0],
        budgets: [{ name: '', value: 0, icon: 'mdi-bank' }],
      },
    };
  },
  methods: {
    submit(): void {
      this.show = false;

      // Take a copy
      const budgetGroup = JSON.parse(JSON.stringify(this.budgetGroupData));

      this.$emit('on-submit', budgetGroup);
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
