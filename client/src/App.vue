<template>
  <v-app>
    <div id="app">

      <!-- Content -->
      <div v-if="isSignedIn" class="content">
      <div id="nav">
        <Header />
      </div>
      <router-view id="router-view"  />
      </div>

      <!-- Sign In mask -->
      <sign-in v-else />
    </div>
  </v-app>
</template>

<script>
import Vue from 'vue';
import Header from './components/Header.vue';
import SignIn from './views/SignIn.vue';

export default Vue.extend({
  components: { Header, SignIn },
  name: 'App',
  provide() {
    return {
      isDevelopmentMode: this.isDevelopmentMode,
    };
  },
  computed: {
    isSignedIn() {
      return this.$store.state.authStore.isSignedIn;
    },
    isDevelopmentMode() {
      return process.env.NODE_ENV === 'development';
    },
  },
  mounted() {
    if (this.isDevelopmentMode) {
      this.$store.commit('setIsSignedIn', true);
    }
  },
});

</script>

<style lang="scss">
:root {
  --primary-color: #2196F3;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 20px;
}

#router-view {
  margin-top: 90px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
