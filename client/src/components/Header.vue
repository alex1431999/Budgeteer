<template>
  <div class="header">
    <google-sign-in-button />
  </div>
</template>

<script>
import GoogleSignInButton from './GoogleSignInButton.vue';

export default {
  components: { GoogleSignInButton },
  name: 'Header',
};
</script>

<style lang="scss" scoped>
.header {
  float: right;
}
</style>
