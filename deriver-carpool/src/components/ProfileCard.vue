<template>
  <div class="profile-card">
    <p><b>Name: </b>{{ firstName }} {{ lastName }}</p>
    <p><b>Email: </b>{{ email }}</p>
    <p><b>Phone: </b>{{ phone }}</p>
    <p><b>Rating: </b>{{ rating }}</p>
    <button @click="userSignOut" class="sign-out-button">Sign Out</button>
  </div>
</template>

<script>
import { useUserStore } from "@/stores/userStore";
import { mapActions } from "pinia";

export default {
  name: "ProfileCard",
  props: ["email", "firstName", "lastName", "phone", "rating"],
  methods: {
    ...mapActions(useUserStore, ["userSignOut"]),
  },
};
</script>

<style scoped>
.profile-card {
  background-color: #eaeaea;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
}

.profile-card p {
  margin: 10px 0;
  color: #231f20;
  font-size: 16px;
}

.sign-out-button {
  background-color: #ad974f;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.sign-out-button:hover {
  background-color: #231f20;
}
</style>
