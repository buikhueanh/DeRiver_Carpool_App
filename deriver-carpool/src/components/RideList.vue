<template>
  <div class="ride-list">
    <div class="filter-section">
      <button 
        @click="setActiveButton('available'); showAvailableRides()" 
        :class="{'active-button': activeButton === 'available'}"
      >
        Current Available Ride
      </button>
      <button 
        @click="setActiveButton('request'); showRequestedRides()" 
        :class="{'active-button': activeButton === 'request'}"
      >
        Current Request
      </button>
    </div>
    <div class="ride-display-section">
      <div v-for="ride in getQueryList" :key="ride.id" class="ride-item">
        <RideCard
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
</template>

<script>
import RideCard from "./RideCard.vue";
import { useRideStore } from "@/stores/rideStore";
import { mapActions, mapState } from "pinia";

export default {
  name: "RideList",
  components: {
    RideCard,
  },
  data() {
    return {
      activeButton: 'available', // Default active button
    };
  },
  computed: {
    ...mapState(useRideStore, ["getQueryList"]),
  },
  methods: {
    ...mapActions(useRideStore, ["showAvailableRides", "showRequestedRides"]),
    setActiveButton(button) {
      this.activeButton = button;
    },
  },
  mounted() {
    this.showAvailableRides();
  },
};
</script>

<style scoped>
.filter-section {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

button {
  background-color: #eaeaea;
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
  background-color: #8E793E;
}

.active-button {
  background-color: #AD974F;
  border: #231F20 solid 1px;
}

.ride-display-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.ride-item {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
</style>