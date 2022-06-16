<template>
  <div class="budget-group">
    <v-expansion-panels accordion v-model="showPanelModel">
      <v-expansion-panel>
        <v-expansion-panel-header disable-icon-rotate>
          <v-container>
            <v-row>

              <!-- Budget name -->
              <v-col cols="3">
                <span class="budget-group__header">
                  <v-text-field
                    solo
                    hide-details
                    v-model="nameEdited"
                    @blur="budgetGroup.name = nameEdited"
                  >
                  </v-text-field>
                </span>

              </v-col>

              <!-- Budgets Allocated -->
              <v-col>
                <v-slider
                  readonly
                  thumb-label="always"
                  thumb-size="30"
                  :key="budgetAllocated + income"
                  :value="budgetAllocated"
                  :max="income"
                >
                  <icon-selector
                      slot="append"
                      v-model="budgetGroup.icon"
                      :icons="ICON_SELECTION_BUDGET_GROUPS"
                    />
                </v-slider>
              </v-col>
            </v-row>
          </v-container>

          <!-- This is only to make `disable-icon-rotate` work -->
          <template v-slot:actions>
            <span></span>
          </template>
        </v-expansion-panel-header>

        <!-- Budgets -->
        <v-expansion-panel-content>
          <div v-for="(budget, i) in budgets" :key="i">
            <Budget
              class="budget-group__budget"
              v-model="budget.value"
              :name.sync="budget.name"
              @on-delete="deleteBudget(i)"
            />
          </div>
        </v-expansion-panel-content>

        <!-- Add Budget button -->
        <v-btn
          class="budget-group__add-budget-button"
          small
          fab
          v-if="showPanel"
          @click="addBudget"
        >
          <v-icon color="blue">mdi-plus</v-icon>
        </v-btn>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import Budget from '@/components/Budget.vue';
import { ICON_SELECTION_BUDGET_GROUPS } from '@/config/iconSelection';
import { IBudget, IBudgetGroup } from '@/types/Budget';
import IconSelector from './IconSelector.vue';

interface IData {
  showPanelModel: number,
  ICON_SELECTION_BUDGET_GROUPS: string[],
  nameEdited: string,
}

export default Vue.extend({
  components: { Budget, IconSelector },
  props: {
    budgetGroup: {
      type: Object as PropType<IBudgetGroup>,
    },
    income: {
      type: Number,
      required: true,
    },
  },
  data(): IData {
    return {
      ICON_SELECTION_BUDGET_GROUPS,
      showPanelModel: 1,
      nameEdited: this.budgetGroup.name,
    };
  },
  computed: {
    budgets(): IBudget[] {
      return this.budgetGroup.budgets || [];
    },
    budgetAllocated(): number {
      return this.budgets.reduce((sum: number, budget: IBudget) => sum + budget.value, 0);
    },
    showPanel(): boolean {
      return this.showPanelModel === 0;
    },
  },
  methods: {
    addBudget(): void {
      const budget: IBudget = {
        name: '',
        value: 0,
      };
      this.budgetGroup.budgets.push(budget);
    },
    deleteBudget(index: number): void {
      this.budgetGroup.budgets.splice(index, 1);

      /* If no budgets are remaining the whole group gets deleted */
      if (this.budgetGroup.budgets.length === 0) {
        this.$emit('on-delete');
      }
    },
  },
});
</script>

<style lang="scss" scoped>
::v-deep .v-input__append-outer {
  margin-top: 0 !important;
  margin-top: 0 !important;
}

@keyframes slidein {
  from {
    margin-left: 40%;
    opacity: 0;
  }

  to {
    margin-left: 0%;
    opacity: 1;
  }
}

.budget-group {
  &__header {
    color: rgb(242,242,242);
    font-size: 20px;
    font-weight: bolder;
  }

  &__budget {
    animation-duration: 0.5s;
    animation-name: slidein;
  }

  &__add-budget-button {
    margin-bottom: 20px;
  }
}
</style>
