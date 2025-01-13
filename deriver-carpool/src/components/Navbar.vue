<template>
  <header>
    <div class="navbar-wrapper">
      <nav>
        <div class="navbar">
          <div class="icon-homepage">
            <div class="logo">
              <RouterLink to="/"
                ><img src="../assets/logo.png" alt="Logo" />
              </RouterLink>
            </div>
            <div class="app-name">
              <RouterLink to="/">DeRiver</RouterLink>
            </div>
          </div>
          <RouterLink to="/search" class="search-link">
            <div class="small-search-bar">
              <img src="../assets/search-icon.png" alt="Search Icon" />
              <p>Search</p>
            </div>
          </RouterLink>

          <div class="new-post">
            <RouterLink to="/request-new-ride">Create New Post</RouterLink>
          </div>
          <div class="profile-icon">
            <RouterLink to="/profile">
              <img src="../assets/profile.png" alt="Profile" />
            </RouterLink>
          </div>
        </div>
      </nav>
    </div>
  </header>
  <RouterView />
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style scoped>
.navbar-wrapper {
  position: fixed;
  background-color: white;
  top: 0;
  width: 95%;
  padding: 10px 20px;
  z-index: 1000; /* Ensure the navbar is above other content */
}

.app-name {
  font-size: 24px;
  font-weight: bold;
  color: #231f20;
}

.navbar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.icon-homepage {
  display: flex;
  flex-direction: row;
  font-size: 24px;
  font-weight: bold;
  color: #eaeaea;
  margin-right: 20px; /* Add margin to separate from search bar */
}

.logo img {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}

.search-link {
  margin-left: 20px; /* Add margin to separate from logo */
  width: 50%;
}

.small-search-bar {
  display: flex;
  align-items: center;
  padding: 5px 10px;
  border-radius: 4px;
  border: 1px solid #eaeaea;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
}

.small-search-bar img {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}

.small-search-bar:hover {
  border: 1px solid #8e793e;
}

.new-post {
  font-size: 16px;
  margin-left: auto; /* Push to the right */
  margin-right: 20px; /* Add margin to separate from profile icon */
  padding: 10px 20px;
  border-radius: 5%;
}

.profile-icon {
  margin-left: 20px; /* Add margin to separate from create new post */
}

.profile-icon img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.profile-icon img:hover {
  background-color: #ad974f;
}

a {
  text-decoration: none;
  color: inherit;
}

a:hover {
  color: #8e793e;
}

/* Style for active navigation link */
.router-link-active {
  font-weight: bold;
  color: #ad974f;
}

/* Specific style for active profile icon and search */
.profile-icon .router-link-active img {
  background-color: #ad974f;
  border-radius: 50%;
  padding: 5px;
}

.small-search-bar .router-link-active {
  border: 1px solid #8e793e;
}

</style>
