<template>
  <div class="budget-sheet-menu">
    <v-row>
      <!-- Spacer to center content -->
      <v-col cols="3" />

      <!-- Sheet selector -->
      <v-col cols="5">
        <v-select outlined hide-details color="blue" label="Budget Sheet" />
      </v-col>

      <!-- Add sheet button -->
      <v-col cols="1">
        <v-btn fab>
          <v-icon color="blue">mdi-plus</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'BudgetSheetMenu',
};
</script>

<style>

</style>
