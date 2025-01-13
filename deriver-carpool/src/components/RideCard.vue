<template>
  <div class="ride-card">
    <div class="card-info">
      <div class="pickup-dropoff">
        <p >{{ pickup }}</p>
        <img class="arrow" src="../assets/arrow.png" alt="arrow">
        <p class="destination">{{ destination }}</p>
      </div>
      <p>{{ formattedDateTime }}</p>
      <p>{{ passengers }} passengers</p>
      <p>Price per passenger: ${{ totalPrice }}</p>
    </div>
    <div class="card-button">
      <button @click="updateRide(documentId, this.rideCategory)">{{ buttonText }}</button>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/userStore';
import { documentId } from 'firebase/firestore';
import { mapActions } from 'pinia';

export default {
  name: "RideCard",
  props: ["pickup", "destination", "datetime", "passengers", "totalPrice", "rideCategory", "documentId"],
  computed: {
    formattedDateTime() {
      if (this.datetime && this.datetime.seconds) {
        const date = new Date(this.datetime.seconds * 1000);
        return date.toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          timeZoneName: "short",
        });
      }
      return this.datetime;
    },

    buttonText() {
      return this.rideCategory === "I'm giving a ride" ? "Request" : "Accept";
    }
  },
  methods: {
    ...mapActions(useUserStore, ['updateRide']),
  }
};
</script>

<style scoped>
.ride-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: center; /* Center content vertically */
  align-items: center; /* Center content horizontally */
  width: 35%;
}

.card-info {
  margin-bottom: 16px;
}

.pickup-dropoff {
  display: flex;
  flex-direction: row;
  margin-bottom: 8px;
}

.pickup-dropoff p {
  margin: 0;
  font-weight: bold;
}

.arrow {
  width: 24px;
  height: 24px;
  margin: 0 5px;
}

.card-button {
  margin-left: auto;
  margin-right: 1.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; /* Ensure the button container takes full height */
}

button {
  background-color: #231F20;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #AD974F;
}
</style>