<template>
  <div class="home-page">
    <div class="title-search">
      <h1>Homepage</h1>
      <RouterLink to="/search">
        <div class="small-search-bar">
          <img src="../assets/search-icon.png" alt="Search Icon" />
          <p>Search Your Ride...</p>
        </div>
      </RouterLink>
    </div>
    <RideList />
  </div>
</template>

<script>
import RideList from '@/components/RideList.vue';
import SearchBar from '@/components/SearchBar.vue';

export default {
  name: 'HomeView',
  components: {
    RideList,
    SearchBar
  },
}
</script>

<style scoped>
.homepage {
  margin-top: 6em;
}

.title-search {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 170px 20px; /* Increase padding to make the background image higher */
  background-image: url('../assets/homepage.png');
  background-position: 10% 50%;
  background-repeat: no-repeat;
  background-size: cover;
  margin-bottom: 30px;
}

h1 {
  color: #d6c691;
  margin-bottom: 20px;
  text-align: center;
  font-size: 36px;
text-shadow: black 5px 5px 30px;
}

.small-search-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start; /* Align items to the left */
  padding: 10px;
  border: 1px solid #EAEAEA; /* Make border less thick */
  border-radius: 8px;
  background-color: white;
  margin-bottom: 20px;
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Add box shadow */
  width: 90%; /* Make the search bar wider */
  max-width: 800px; /* Set a maximum width for the search bar */
  margin-left: auto;
  margin-right: auto;
}

.small-search-bar img {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}

.small-search-bar p {
  margin: 0;
  color: #231F20;
  font-size: 16px;
  text-align: left; /* Align text to the left */
}

.small-search-bar:hover {
  background-color: #EAEAEA;
  border-color: #AD974F;
}

a {
  text-decoration: none;
  color: inherit;
}
</style>