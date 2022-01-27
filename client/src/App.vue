<template>
  <v-app>
    <div id="app">
      <div id="nav">
        <Header />
      </div>
      <router-view/>
    </div>
  </v-app>
</template>

<script>
import Vue from 'vue';
import Header from './components/Header.vue';

export default Vue.extend({
  components: { Header },
  name: 'App',
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
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
