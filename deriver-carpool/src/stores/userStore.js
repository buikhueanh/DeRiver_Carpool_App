import { defineStore } from "pinia";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "@/firebase/init.js";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  increment,
} from "firebase/firestore";
import router from "@/router";

export const useUserStore = defineStore("user-store", {
  state: () => {
    return {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      rating: 0,
      rideOffered: [],
      rideRequested: [],

      // Sign In/ Sign Up Handlings
      signUpSuccess: false,
      signUpError: "",
      signInSuccess: false,
      signInError: "",
      showSignInForm: true,
    };
  },

  getters: {
    // User's Information Handlings
    getUserEmail: (state) => state.email,
    getFirstName: (state) => state.firstName,
    getLastName: (state) => state.lastName,
    getPhone: (state) => state.phone,
    getRating: (state) => state.rating,
    getRideOffered: (state) => state.rideOffered,
    getRideRequested: (state) => state.rideRequested,

    // Sign In/ Sign Up Handlings
    getSignUpSuccess: (state) => state.signUpSuccess,
    getSignUpError: (state) => state.signUpError,
    getSignInSuccess: (state) => state.signInSuccess,
    getSignInError: (state) => state.signInError,
    getShowSignInForm: (state) => state.showSignInForm,
    getShowRequest: (state) => state.showRequest,
  },

  actions: {
    async userSignUp(signUpObj) {
      // Check if the email ends with @depauw.edu
      if (!signUpObj.email.endsWith("@depauw.edu")) {
        this.signUpError = "Please use a DePauw email address";
        alert(this.signUpError);
        return;
      }

      createUserWithEmailAndPassword(auth, signUpObj.email, signUpObj.password)
        .then(async (userCredential) => {
          this.email = userCredential.user.email;
          this.firstName = signUpObj.firstName;
          this.lastName = signUpObj.lastName;
          this.phone = signUpObj.phone;
          this.rating = 0;
          this.rideOffered = [];
          this.rideRequested = [];
          this.signUpSuccess = true;
          this.signUpError = "";

          // Add user to the database
          await setDoc(doc(db, "users", userCredential.user.uid), {
            email: signUpObj.email,
            firstName: signUpObj.firstName,
            lastName: signUpObj.lastName,
            phone: signUpObj.phone,
            postIds: [],
            rating: 0,
            rideOffered: [],
            rideRequested: [],
          });

          alert(`Sign up successful for ${this.email}`);
        })
        .catch((error) => {
          this.userName = "";
          this.signUpError = error.message;
          this.signUpSuccess = false;
        });
    },

    async userSignIn(signInObj) {
      signInWithEmailAndPassword(auth, signInObj.email, signInObj.password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          this.signInSuccess = true;
          this.signInError = "";
          alert(`Sign in successful for ${user.email}`);

          // Fetch user data from the Firestore
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            this.email = userData.email;
            this.firstName = userData.firstName;
            this.lastName = userData.lastName;
            this.phone = userData.phone;
            this.rating = userData.rating;
            this.rideOffered = userData.rideOffered;
            this.rideRequested = userData.rideRequested;
          }

          await this.fetchUserRidesDetails();
        })
        .catch((error) => {
          this.signInError = error.message;
          this.signInSuccess = false;
          console.log(
            `Error code: ${error.code}, Error message: ${error.message}`
          );
        });
    },

    async userSignOut() {
      auth
        .signOut()
        .then(() => {
          alert("Sign out successful");
          this.email = null;
          this.firstName;
          this.lastName = "";
          this.phone = "";
          this.rating = 0;
          this.signInSuccess = false;
          this.signUpSuccess = false;
          this.rideOffered = [];
          this.rideRequested = [];
          router.push("/profile"); // Navigate to the profile view
        })
        .catch((error) => {
          console.log(`Error signing out: ${error}`);
        });
    },

    toggleForm() {
      this.showSignInForm = !this.showSignInForm;
    },

    async updateRide(rideId, rideCategory) {
      // Check if the user is signed in/sign up
      if (!this.signUpSuccess && !this.signInSuccess) {
        alert("Please sign in to update the ride");
        router.push("/profile");
      } else {
        console.log(`Ride: ${rideId}, ${rideCategory}`);

        // Get the current user and the ride reference
        const user = auth.currentUser;
        const userRef = doc(db, "users", user.uid);
        const rideRef = doc(db, "rides", rideId);

        try {
          const rideSnapshot = await getDoc(rideRef);
          if (!rideSnapshot.exists()) {
            throw new Error("Ride does not exist");
          }

          const rideData = rideSnapshot.data();
          console.log(`Passengers: ${rideData.passengers}`);

          if (rideCategory === "I'm giving a ride") {
            console.log("I'm giving a ride");

            // Check if the ride already exists in the user's rideRequested list
            const rideExists = this.rideRequested.some(
              (ride) => ride.id === rideId
            );
            if (!rideExists && rideData.passengers > 0) {
              // Add the ride to the user's rideRequested list
              await updateDoc(userRef, {
                rideRequested: arrayUnion(rideRef),
              });
              this.rideRequested.push(rideRef);

              // Reduce the number of available passenger seats

              await updateDoc(rideRef, {
                passengers: increment(-1),
              });
              alert("Your request has been received");
            } else if (rideData.passengers == 0) {
              alert("There's no available seat.");
            } else {
              alert(
                "This ride is already in your list or There's no available seat."
              );
            }
          } else if (rideCategory === "I need a ride") {
            console.log("I need a ride");

            // Check if the ride already exists in the user's rideOffered list
            const rideExists = this.rideOffered.some(
              (ride) => ride.id === rideId
            );
            if (!rideExists) {
              // Add the ride to the user's rideOffered list
              await updateDoc(userRef, {
                rideOffered: arrayUnion(rideRef),
              });
              this.rideOffered.push(rideRef);
              alert("Your request has been received");
            } else {
              alert("This ride is already in your offered rides list.");
            }
          }

          // Fetch updated ride details
          await this.fetchUserRidesDetails();
        } catch (error) {
          console.log(`Error updating the ride: ${error}`);
        }
      }
    },

    async fetchUserRidesDetails() {
      let rideIDsOffered = [];
      let rideIDsRequested = [];
      let fetchedRideOffered = [];
      let fetchedRideRequested = [];

      console.log("Fetching user ride details method");

      // Extract ride IDs from rideOffered and rideRequested
      this.rideOffered.forEach((rideRef) => rideIDsOffered.push(rideRef.id));
      this.rideRequested.forEach((rideRef) =>
        rideIDsRequested.push(rideRef.id)
      );

      console.log("Offered IDs:", rideIDsOffered);
      console.log("Requested IDs:", rideIDsRequested);

      // Fetch ride details for offered rides
      for (let i = 0; i < rideIDsOffered.length; i++) {
        const rideOfferedQuery = doc(db, "rides", rideIDsOffered[i]);
        const offeredRidesSnapshot = await getDoc(rideOfferedQuery);
        if (offeredRidesSnapshot.exists()) {
          fetchedRideOffered.push({
            id: rideIDsOffered[i],
            ...offeredRidesSnapshot.data(),
          });
        }
      }

      // Fetch ride details for requested rides
      for (let i = 0; i < rideIDsRequested.length; i++) {
        const rideRequestedQuery = doc(db, "rides", rideIDsRequested[i]);
        const requestedRidesSnapshot = await getDoc(rideRequestedQuery);
        if (requestedRidesSnapshot.exists()) {
          fetchedRideRequested.push({
            id: rideIDsRequested[i],
            ...requestedRidesSnapshot.data(),
          });
        }
      }

      // Update the store with fetched ride details
      this.rideOffered = fetchedRideOffered;
      this.rideRequested = fetchedRideRequested;
    },
  },
});
