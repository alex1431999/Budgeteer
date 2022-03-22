<template>
  <div class="signIn">
    <v-layout class="signIn__layout" justify-center align-center>
      <v-card rounded class="signIn__layout__card">
        <v-card-title class="signIn__layout__card__title">
          Sign In
        </v-card-title>
        <v-card-text>
          Sign in using your Google Account.
        </v-card-text>
        <v-card-actions>
           <google-sign-in-button />
        </v-card-actions>
      </v-card>
    </v-layout>
  </div>
</template>

<script>
import GoogleSignInButton from '@/components/GoogleSignInButton.vue';

export default {
  components: { GoogleSignInButton },
};
</script>

<style lang="scss" scoped>
.signIn {
  height: 100vh;

  &__layout {
    height: 100vh;

    &__card {
      padding-bottom: 20px;
      padding-left: 20px;
      padding-right: 20px;

      &__title {
        color: #2196F3;
      }
    }
  }
}

</style>
