<template>
  <div class="header">
    <navigation-drawer class="header__navigation-drawer" />
    <google-sign-in-button v-if="!isDevelopmentMode" class="header__google-sign-in-button" />
  </div>
</template>

<script>
import GoogleSignInButton from './GoogleSignInButton.vue';
import NavigationDrawer from './NavigationDrawer.vue';

export default {
  components: { GoogleSignInButton, NavigationDrawer },
  name: 'Header',
  inject: ['isDevelopmentMode'],
};
</script>

<style lang="scss" scoped>
.header {
  &__navigation-drawer {
    float: left;
  }

  &__google-sign-in-button {
    float: right;
  }
}
</style>
