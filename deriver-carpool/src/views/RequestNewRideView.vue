<template>
  <div class="request-new-view">
    <!-- First display the Sign Up Form -->
    <div v-if="!getSignInSuccess && !getSignUpSuccess">
      <div v-if="getShowSignInForm">
        <SignInForm @SignIn="userSignIn" />
        <p v-if="getSignInError" class="error">{{ getSignInError }}</p>
        <p class="centered-text">
          Don't have an account?
          <a href="#" @click.prevent="toggleForm"> Sign Up</a>
        </p>
      </div>
      <div v-else>
        <SignUpForm @SignUp="userSignUp" />
        <p v-if="getSignUpError" class="error">{{ getSignUpError }}</p>
        <p class="centered-text">
          Already have an account?
          <a href="#" @click.prevent="toggleForm"> Sign In</a>
        </p>
      </div>
    </div>

    <div v-else>
      <NewPostForm />
    </div>
  </div>
</template>

<script>
import NewPostForm from "@/components/NewPostForm.vue";
import SignInForm from "@/components/SignInForm.vue";
import SignUpForm from "@/components/SignUpForm.vue";
import { useUserStore } from "@/stores/userStore";
import { mapActions, mapState } from "pinia";

export default {
  name: "RequestNewRideView",
  components: {
    SignUpForm,
    SignInForm,
    NewPostForm,
  },

  computed: {
    ...mapState(useUserStore, [
      "getUserEmail",
      "getSignUpSuccess",
      "getSignUpError",
      "getSignInSuccess",
      "getSignInError",
      "getShowSignInForm",
    ]),
  },

  methods: {
    ...mapActions(useUserStore, ["userSignUp", "userSignIn", "toggleForm"]),
  },
};
</script>

<style scoped>
.request-new-view {
  margin-top: 6em;
}

.centered-text {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>