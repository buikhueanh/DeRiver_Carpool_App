<template>
  <div class="sign-in-form">
    <h2>Sign In</h2>
    <div class="sign-in-group">
      <!-- Email -->
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" v-model="signInEmail" required class="form-control">
      </div>

      <!-- Password -->
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" v-model="signInPassword" required class="form-control">
      </div>

      <button @click="signIn" :disabled="!signInStatus" class="sign-in-button">Sign In</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignInForm",
  emits: ["SignIn"],
  data() {
    return {
      signInEmail: "",
      signInPassword: "",
    };
  },
  computed: {
    signInStatus() {
      return this.signInEmail !== "" && this.signInPassword !== "";
    },
  },
  methods: {
    signIn() {
      if (this.signInStatus) {
        this.$emit("SignIn", {
          email: this.signInEmail,
          password: this.signInPassword,
        });
      }
    },
  },
};
</script>

<style scoped>
.sign-in-form {
  background-color: #EAEAEA;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 0 auto;
  margin-top: 50px;
}

h2 {
  text-align: center;
  color: #231F20;
}

.sign-in-group {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
  color: #231F20;
}

.form-control {
  padding: 10px;
  border: 1px solid #231F20;
  border-radius: 4px;
  background-color: #fff;
  color: #231F20;
  font-size: 16px;
}

.sign-in-button {
  background-color: #AD974F;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.sign-in-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.sign-in-button:hover:enabled {
  background-color: #231F20;
}
</style>