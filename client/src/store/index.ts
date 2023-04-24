import Vue from 'vue';
import Vuex from 'vuex';

// Stores
import * as authStore from './authStore';
import * as budgetStore from './budgetsStore';
import * as bankAccountsStore from './bankAccountsStore';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    authStore,
    budgetStore,
    bankAccountsStore,
  },
});
