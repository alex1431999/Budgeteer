<template>
  <div class="google-sign-in-button">
    <div v-show="!isSignedIn" id="sign-in-button"></div>
    <v-btn color="blue" v-show="isSignedIn" @click="signOut">Sign out</v-btn>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

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
    onSignIn(googleUser: string): void {
      this.isSignedIn = true;
      console.log(googleUser.getBasicProfile());
    },
    async signOut() {
      await window.gapi.auth2.getAuthInstance().signOut();
      this.isSignedIn = false;
      this.renderButton();
    },
    renderButton() {
      window.gapi.signin2.render('sign-in-button', {
        scope: 'profile email',
        longtitle: false,
        theme: 'dark',
        onsuccess: this.onSignIn,
      });
    },
  },
});
</script>
