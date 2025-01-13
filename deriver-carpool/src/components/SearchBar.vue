<template>
  <div class="search-bar">
    <div class="search-form">
      <!-- Filter Pickup Spot -->
      <div class="form-group">
        <label for="pickup">Leaving from...</label>
        <select v-model="selectedPickup" class="form-control">
          <option v-for="spot in getPickupSpot" :key="spot" :value="spot">
            {{ spot }}
          </option>
        </select>
      </div>

      <!-- Filter Destination Spot -->
      <div class="form-group">
        <label for="destination">Going to...</label>
        <select v-model="selectedDestination" class="form-control">
          <option v-for="spot in getDestinationSpot" :key="spot" :value="spot">
            {{ spot }}
          </option>
        </select>
      </div>

      <!-- Filter Date -->
      <div class="form-group">
        <label for="date">Date</label>
        <input
          type="datetime-local"
          v-model="selectedDate"
          class="form-control"
          required
        />
      </div>

      <!-- Filter Passengers -->
      <div class="form-group">
        <label for="passengers">Number of Passengers:</label>
        <input
          type="number"
          min="0"
          v-model="selectedPassengers"
          class="form-control"
          required
        />
      </div>

      <!-- Filter Ride Category -->
      <div class="form-group">
        <label for="rideCategory">What is your purpose?</label>
        <select v-model="selectedRideCategory" class="form-control">
          <option
            v-for="category in getRideCategory"
            :key="category"
            :value="category"
          >
            {{ category }}
          </option>
        </select>
      </div>

      <button
        @click="
          queryByAllCategories(
            selectedPickup,
            selectedDestination,
            selectedDate,
            selectedPassengers,
            selectedRideCategory
          )
        "
        class="search-button"
      >
        Search
      </button>
    </div>
  </div>
  <div class="result">
    <div v-if="getQueryList.length">
      <p>Exact date matches are provided, but time matches may vary.</p>
      <div v-for="ride in getQueryList" :key="ride.id">
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
import RideCard from "@/components/RideCard.vue";
import { useRideStore } from "@/stores/rideStore";
import { mapState, mapActions } from "pinia";

export default {
  name: "SearchBar",
  components: {
    RideCard,
  },
  data() {
    return {
      selectedPickup: "",
      selectedDestination: "",
      selectedDate: null,
      selectedPassengers: null,
      selectedRideCategory: "",
    };
  },
  computed: {
    ...mapState(useRideStore, [
      "getPickupSpot",
      "getDestinationSpot",
      "getRideCategory",
      "getQueryList",
    ]),
  },
  methods: {
    ...mapActions(useRideStore, [
      "getAllRidesFromDB",
      "queryByAllCategories",
      "clearQueryList",
    ]),
  },
  mounted() {
    this.clearQueryList();
  },
};
</script>

<style scoped>
.search-bar {
  background-color: #eaeaea;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
}

.search-form {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
  justify-content: space-around;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
  color: #231f20;
}

.form-control {
  padding: 10px;
  border: 1px solid black;
  border-radius: 4px;
  background-color: #fff;
  color: #231f20;
  font-size: 16px;
  width: 200px;
}

.search-button {
  margin-left: 30px;
  background-color: #ad974f;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.search-button:hover {
  background-color: #231f20;
}
</style>
