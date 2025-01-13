<template>
  <div class="profile-view">
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
      <h1>Your Profile</h1>
      <div>
        <ProfileCard
          :email="getUserEmail"
          :firstName="getFirstName"
          :lastName="getLastName"
          :phone="getPhone"
          :rating="getRating"
        />
      </div>

      <div class="filter-section">
        <div class="buttons">
          <button
            @click="
              setActiveButton('requested');
              showRequestedRides();
            "
            :class="{ 'active-button': activeButton === 'requested' }"
          >
            Current Requested Rides
          </button>
          <button
            @click="
              setActiveButton('offered');
              showOfferedRides();
            "
            :class="{ 'active-button': activeButton === 'offered' }"
          >
            Current Offered Rides
          </button>
        </div>
      </div>
      <div class="ride-display-section">
        <div v-if="showRequest">
          <div class="ride-card-wrapper">
            <RideCard
              v-for="ride in getRideRequested"
              :key="ride.id"
              :documentId="ride.id"
              :pickup="ride.pickup"
              :destination="ride.destination"
              :datetime="ride.datetime"
              :passengers="ride.passengers"
              :totalPrice="ride.totalPrice"
              :rideCategory="ride.rideCategory"
            />
          </div>
        </div>

        <div v-else>
          <div class="ride-card-wrapper">
            <RideCard
              v-for="ride in getRideOffered"
              :key="ride.id"
              :documentId="ride.id"
              :pickup="ride.pickup"
              :destination="ride.destination"
              :datetime="ride.datetime"
              :passengers="ride.passengers"
              :totalPrice="ride.totalPrice"
              :rideCategory="ride.rideCategory"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ProfileCard from "@/components/ProfileCard.vue";
import RideCard from "@/components/RideCard.vue";
import SignInForm from "@/components/SignInForm.vue";
import SignUpForm from "@/components/SignUpForm.vue";
import { useUserStore } from "@/stores/userStore";
import { mapActions, mapState } from "pinia";

export default {
  name: "ProfileView",
  components: {
    SignUpForm,
    SignInForm,
    ProfileCard,
    RideCard,
  },

  data() {
    return {
      showRequest: true,
      activeButton: "requested",
    };
  },

  computed: {
    ...mapState(useUserStore, [
      "getUserEmail",
      "getFirstName",
      "getLastName",
      "getPhone",
      "getRating",
      "getRideRequested",
      "getRideOffered",
      "getSignUpSuccess",
      "getSignUpError",
      "getSignInSuccess",
      "getSignInError",
      "getShowSignInForm",
    ]),
  },

  methods: {
    ...mapActions(useUserStore, [
      "userSignUp",
      "userSignIn",
      "toggleForm",
      "fetchUserRidesDetails",
    ]),

    setActiveButton(button) {
      this.activeButton = button;
    },

    showRequestedRides() {
      this.showRequest = true;
    },
    showOfferedRides() {
      this.showRequest = false;
    },
  },
};
</script>

<style scoped>
.profile-view {
  margin-top: 6em;
}

h1 {
  text-align: center;
}
.centered-text {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.filter-section {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.buttons {
  margin-top: 20px;
}

button {
  background-color: #eaeaea ;
  color: #231F20;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  margin: 0 10px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #8e793e;
}

.active-button {
  background-color: #ad974f;
  border: #231F20 solid 1px;
}

.ride-card-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
</style>
