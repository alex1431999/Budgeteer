<template>
  <div class="sign-in">
    <v-layout class="sign-in__layout" justify-center align-center column>
      <v-icon class="sign-in__layout__icon" color="blue" x-large>mdi-account</v-icon>
      <h1 class="sign-in__layout__header">
          Sign into your account
      </h1>
      <v-card rounded class="sign-in__layout__card">
        <google-sign-in-button />
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
.sign-in {
  height: 100vh;

  &__layout {
    height: 100vh;

    &__header {
      color: #2196F3;
      margin-bottom: 20px;
    }

    &__icon {
      margin-bottom: 20px;
    }

    &__card {
      padding: 20px;
    }
  }
}

</style>
