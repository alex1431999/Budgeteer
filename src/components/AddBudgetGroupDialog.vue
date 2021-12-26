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
            <v-btn small fab slot="append-outer">
              <v-icon color="blue">mdi-bank</v-icon>
            </v-btn>

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
interface IData {
  show: boolean,
}

export default {
  data(): IData {
    return {
      show: false,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
