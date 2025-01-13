import { defineStore } from "pinia";
import {
  addDoc,
  collection,
  query,
  getDocs,
  where,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/firebase/init.js";
import { v4 as uuidv4 } from "uuid"; // For generating unique IDs

export const useRideStore = defineStore("ride-store", {
  state: () => {
    return {
      pickupSpot: [
        "Union Building",
        "Peeler Art Center",
        "Harrison Hall",
        "Bloomington Street Hall",
        "Longden Hall",
        "Jordan Hall",
        "Pulliam Center",
        "Prindle - DePauw Nature Park",
        "Roy O. West Library",
        "Walmart",
        "Kroger",
      ],

      destinationSpot: [
        "Union Building",
        "Peeler Art Center",
        "Harrison Hall",
        "Bloomington Street Hall",
        "Longden Hall",
        "Jordan Hall",
        "Pulliam Center",
        "Prindle - DePauw Nature Park",
        "Roy O. West Library",
        "Walmart",
        "Kroger",
        "Indianapolis International Airport",
        "Indianapolis Greyhound Station",
        "Indianapolis Amtrak Station",
        "IU Bloomington",
        "DePauw Nature Park",
      ],

      rideCategory: ["I'm giving a ride", "I need a ride"],

      rideList: [],
      queryList: [],
    };
  },

  getters: {
    getPickupSpot: (state) => state.pickupSpot,
    getDestinationSpot: (state) => state.destinationSpot,
    getRideCategory: (state) => state.rideCategory,
    getAllRides: (state) => state.rideList,
    getQueryList: (state) => state.queryList,
  },

  actions: {
    async addRideToDB(rideToAdd) {
      try {
        await addDoc(collection(db, "rides"), rideToAdd);
      } catch (error) {
        console.log(`Error adding ride to DB: ${error}`);
      }
    },

    async getAllRidesFromDB() {
      const querySnapshot = await getDocs(collection(db, "rides"));
      querySnapshot.forEach((doc) => {
        this.queryList.push(doc.data());
      });
    },

    // Query SELECTED RIDES by ALL CATEGORIES
    async queryByAllCategories(
      selectedPickup,
      selectedDestination,
      selectedDate,
      selectedPassengers,
      selectedRideCategory
    ) {
      this.queryList = [];

      const invertedRideCategory =
        selectedRideCategory === "I'm giving a ride"
          ? "I need a ride"
          : "I'm giving a ride"; // This is to query the opposite ride category

      const date = new Date(selectedDate);
      date.setHours(0, 0, 0, 0);
      const selectedDateTimestamp = Timestamp.fromDate(date);

      const afterDate = new Date(selectedDate);
      afterDate.setDate(afterDate.getDate() + 1);
      afterDate.setHours(0, 0, 0, 0);
      const afterDateTimestamp = Timestamp.fromDate(afterDate);

      const q = query(
        collection(db, "rides"),
        where("pickup", "==", selectedPickup),
        where("destination", "==", selectedDestination),
        where("datetime", ">=", selectedDateTimestamp),
        where("datetime", "<", afterDateTimestamp),
        where("passengers", ">=", selectedPassengers),
        where("rideCategory", "==", invertedRideCategory)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        this.queryList.push({
          id: doc.id,
          ...doc.data(),
        });
      });
    },

    // Query ALL rides that are offered
    async queryByIsGivingRide() {
      this.queryList = [];
      const q = query(
        collection(db, "rides"),
        where("rideCategory", "==", "I'm giving a ride")
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        this.queryList.push({
          id: doc.id,
          ...doc.data(),
        });
      });
    },

    // Query ALL rides that are requested
    async queryByIsReceivingRide() {
      this.queryList = [];
      const q = query(
        collection(db, "rides"),
        where("rideCategory", "==", "I need a ride")
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        this.queryList.push({
          id: doc.id,
          ...doc.data(),
        });
      });
    },

    // Just show the available rides from TODAY and in FUTURE
    async showAvailableRides() {
      await this.queryByIsGivingRide();
      const now = new Date();
      this.queryList = this.queryList.filter((ride) => {
        const rideDate = ride.datetime.toDate
          ? ride.datetime.toDate()
          : new Date(ride.datetime.seconds * 1000);
        return rideDate >= now;
      });
    },

    async showRequestedRides() {
      await this.queryByIsReceivingRide();
      const now = new Date();
      this.queryList = this.queryList.filter((ride) => {
        const rideDate = ride.datetime.toDate
          ? ride.datetime.toDate()
          : new Date(ride.datetime.seconds * 1000);
        return rideDate >= now;
      });
    },

    clearQueryList() {
      this.queryList = [];
    },

    generateRandomId() {
      return uuidv4();
    },
  },
});
