<template>
  <div class="new-ride-form">
    <h2>Post Your New Ride Offer or Request</h2>

    <div class="form-group">
      <label for="pickup">Pick Up Destination:</label>
      <select v-model="newPost.pickup" class="form-control">
        <option v-for="spot in getPickupSpot" :key="spot" :value="spot">
          {{ spot }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label for="destination">Destination:</label>
      <select v-model="newPost.destination" class="form-control">
        <option v-for="spot in getDestinationSpot" :key="spot" :value="spot">
          {{ spot }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label for="datetime">Date and Time:</label>
      <input
        type="datetime-local"
        :min="minDateTime"
        v-model="newPost.datetime"
        required
        class="form-control"
      />
    </div>

    <div class="form-group">
      <label for="passengers">Number of Passengers:</label>
      <input
        type="number"
        min="0"
        v-model="newPost.passengers"
        required
        class="form-control"
      />
    </div>

    <div class="form-group">
      <label for="totalPrice">Price per Passenger:</label>
      <input
        type="number"
        min="0"
        v-model="newPost.totalPrice"
        required
        class="form-control"
      />
    </div>

    <div class="form-group">
      <label for="rideCategory">Ride Category:</label>
      <select v-model="newPost.rideCategory" class="form-control">
        <option
          v-for="category in getRideCategory"
          :key="category"
          :value="category"
        >
          {{ category }}
        </option>
      </select>
    </div>

    <button @click="addNewRide" class="submit-button">Post</button>
  </div>
</template>

<script>
import { useRideStore } from "@/stores/rideStore";
import { mapActions, mapState } from "pinia";
import { Timestamp } from "firebase/firestore"; // To convert the datatype to Firestore Timestamp

export default {
  name: "NewPostForm",
  data() {
    return {
      newPost: {
        pickup: "",
        destination: "",
        datetime: null,
        passengers: null,
        totalPrice: null,
        rideCategory: "",
        rideId: "",
        postId: "",
      },
    };
  },

  computed: {
    ...mapState(useRideStore, [
      "getPickupSpot",
      "getDestinationSpot",
      "getRideCategory",
    ]),

    minDateTime() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    },
  },

  methods: {
    ...mapActions(useRideStore, ["addRideToDB", "generateRandomId"]),
    async addNewRide() {
      // Generate unique IDs for the ride and post
      this.newPost.rideId = this.generateRandomId();
      this.newPost.postId = this.generateRandomId();

      // Convert datetime to Firestore Timestamp
      const date = new Date(this.newPost.datetime);
      this.newPost.datetime = Timestamp.fromDate(date);

      // Add the NewRide to the DB
      await this.addRideToDB(this.newPost);
      this.$router.push("/");
      this.resetNewRidePost();
    },

    resetNewRidePost() {
      this.newPost = {
        pickup: "",
        destination: "",
        datetime: null,
        passengers: null,
        totalPrice: null,
        rideCategory: "",
        rideId: "",
        postId: "",
      };
    },
  },
};
</script>

<style scoped>
.new-ride-form {
  background-color: #EAEAEA;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

h2 {
  color: #231F20;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
  color: #231F20;
}

.form-control {
  width: 97%;
  padding: 10px;
  border: 1px solid #231F20;
  border-radius: 4px;
  background-color: #fff;
  color: #231F20;
  font-size: 16px;
}

.submit-button {
  background-color: #231F20;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #AD974F;
}
</style>