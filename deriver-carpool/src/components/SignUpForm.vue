<template>
  <div class="sign-up-form">
    <h2>Sign Up</h2>
    <div class="sign-up-group">
      <!-- First Name -->
      <div class="form-group">
        <label for="firstName">First Name:</label>
        <input type="text" v-model="signUpFirstName" required class="form-control">
      </div>

      <!-- Last Name -->
      <div class="form-group">
        <label for="lastName">Last Name:</label>
        <input type="text" v-model="signUpLastName" required class="form-control">
      </div>

      <!-- Email -->
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" v-model="signUpEmail" required class="form-control">
      </div>

      <!-- Phone -->
      <div class="form-group">
        <label for="phone">Phone:</label>
        <input type="tel" v-model="signUpPhone" required class="form-control">
      </div>

      <!-- Password -->
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" v-model="signUpPassword" required class="form-control">
      </div>

      <button @click="signUp" :disabled="!signUpStatus" class="sign-up-button">Sign Up</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignUpForm",
  emits: ["SignUp"],
  data() {
    return {
      signUpFirstName: "",
      signUpLastName: "",
      signUpEmail: "",
      signUpPhone: "",
      signUpPassword: "",
    };
  },
  computed: {
    signUpStatus() {
      return (
        this.signUpFirstName !== "" &&
        this.signUpLastName !== "" &&
        this.signUpEmail !== "" &&
        this.signUpPhone !== "" &&
        this.signUpPassword !== ""
      );
    },
  },
  methods: {
    signUp() {
      if (this.signUpStatus) {
        this.$emit("SignUp", {
          email: this.signUpEmail,
          password: this.signUpPassword,
          firstName: this.signUpFirstName,
          lastName: this.signUpLastName,
          phone: this.signUpPhone,
        });
      } else {
        alert("Please fill out all fields.");
      }
    },
  },
};
</script>

<style scoped>
.sign-up-form {
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

.sign-up-group {
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

.sign-up-button {
  background-color: #AD974F;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.sign-up-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.sign-up-button:hover:enabled {
  background-color: #231F20;
}
</style>