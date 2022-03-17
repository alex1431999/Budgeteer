import Vue from 'vue';
import Vuex from 'vuex';

// Stores
import * as budgetStore from './budgetsStore';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    budgetStore,
  },
});
