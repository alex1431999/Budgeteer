<template>
  <div class="google-sign-in-button">
    <div v-show="!isSignedIn" id="sign-in-button"></div>
    <v-btn color="blue" v-show="isSignedIn" @click="signOut">Sign out</v-btn>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { signIn } from '@/api/auth';

export default Vue.extend({
  name: 'GoogleSignInButton',
  data() {
    return {
      isSignedIn: false,
    };
  },
  mounted() {
    this.onGapiLoaded(this.renderButton);
  },
  methods: {
    onGapiLoaded(callback: () => any): void {
      const interval = setInterval(() => {
        if (window.gapi) {
          clearInterval(interval);
          callback();
        }
      }, 200);
    },
    onSignIn(googleUser: any): void {
      this.isSignedIn = true;

      const token = googleUser.getAuthResponse().id_token;
      signIn(token).then(() => this.$store.commit('setIsSignedIn', true)).catch(this.signOut);
    },
    async signOut() {
      await window.gapi.auth2.getAuthInstance().signOut();
      this.isSignedIn = false;
      this.$store.commit('setIsSignedIn', false);
      this.renderButton();
    },
    renderButton() {
      window.gapi.signin2.render('sign-in-button', {
        scope: 'profile email',
        longtitle: true,
        theme: 'dark',
        onsuccess: this.onSignIn,
      });
    },
  },
});
</script>
