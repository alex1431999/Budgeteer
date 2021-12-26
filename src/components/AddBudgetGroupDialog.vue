<template>
  <div class="add-budget-group-dialog">
    <v-dialog v-model="show" width="500">
      <!-- Add button -->
      <template v-slot:activator="{ on, attrs }">
        <v-btn small fab v-bind="attrs" v-on="on">
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
            <v-text-field label="Name">
              <!-- Icon -->
              <icon-selector slot="append-outer" :icons="ICON_SELECTION_BUDGET_GROUPS" />
            </v-text-field>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="show = false"
            >
              Add
            </v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import IconSelector from './IconSelector.vue';
import { ICON_SELECTION_BUDGET_GROUPS } from '@/config/iconSelection';

interface IData {
  ICON_SELECTION_BUDGET_GROUPS: string[],
  show: boolean,
}

export default {
  components: { IconSelector },
  data(): IData {
    return {
      ICON_SELECTION_BUDGET_GROUPS,
      show: false,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
