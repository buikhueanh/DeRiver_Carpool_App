<template>
  <div class="search-view">
    <div class="search-title">
      <h2>Search your ride</h2>
    </div>
    <div class="search-bar-container">
      <SearchBar />
    </div>
    <div class="image-container">
      <img src="../assets/search-car.png" alt="search car">
    </div>
  </div>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue';
export default {
  name: "SearchView",
  components: {
    SearchBar,
  },
};
</script>

<style scoped>
.search-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin-top: 3em;
}

.search-title {
  font-size: 24px;
  font-weight: bold;
  color: #231F20;
  margin-bottom: 20px;
  text-align: center;
}

.image-container {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
}

.image-container img {
  width: 400px;
  height: auto;
}
</style>