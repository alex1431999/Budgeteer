<template>
  <div class="add-budget-group-dialog">
    <v-dialog v-model="show" width="500">
      <!-- Add button -->
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          :class="{ 'add-budget-group-dialog--button-pulse': noGroupsYet }"
          fab
          v-bind="attrs"
          v-on="on"
        >
          <v-icon color="blue">mdi-plus</v-icon>
        </v-btn>
      </template>

      <!-- Dialog -->
        <v-card>
          <v-card-title>
            Add Budget Group
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
import { ICON_SELECTION_BUDGET_GROUPS } from '@/config/iconSelection';
import { IBudgetGroup } from '@/types/Budget';
import IconSelector from './IconSelector.vue';

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
        budgets: [{ name: '', value: 0 }],
      },
    };
  },
  props: {
    noGroupsYet: {
      type: Boolean,
      default: false,
    },
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
.add-budget-group-dialog {
  &--button-pulse {
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
    transform: scale(1);
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
    }

    70% {
      transform: scale(1);
      box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
    }

    100% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    }
  }
}
</style>
