<template>
  <div class="wrapper">
    <!-- Sidebar -->
    <nav id="sidebar">
      <div class="sidebar-header">
        <h3>Bootstrap Sidebar</h3>
      </div>

      <ul class="list-unstyled components">
        <div class="sidebar">
          <router-link
            class="sidebar-link"
            v-for="(item, index) in items"
            :key="index"
            :to="item.path"
          >
            {{ item.title }}
          </router-link>
        </div>
      </ul>
      <div class="logout">
        <button @click="logOut">Log out</button>
      </div>
    </nav>
  </div>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Array,
  },
});
const logOut = () => {
  localStorage.removeItem("token");
  location.reload();
};
</script>

<style lang="scss" scoped>
/*
    ADDITIONAL DEMO STYLE, NOT IMPORTANT TO MAKE THINGS WORK BUT TO MAKE IT A BIT NICER :)
*/
@import "https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700";

body {
  font-family: "Poppins", sans-serif;
  background: #fafafa;
}

p {
  font-family: "Poppins", sans-serif;
  font-size: 1.1em;
  font-weight: 300;
  line-height: 1.7em;
  color: #999;
}

a,
a:hover,
a:focus {
  color: inherit;
  text-decoration: none;
  transition: all 0.3s;
}

#sidebar {
  /* don't forget to add all the previously mentioned styles here too */
  background: #7386d5;
  color: #fff;
  transition: all 0.3s;
}

#sidebar .sidebar-header {
  padding: 30px;
  background: #6d7fcc;
}

.sidebar ul.components {
  padding: 20px;
  border-bottom: 1px solid #47748b;
}
.sidebar ul.components:hover {
  padding: 20px;
  border-bottom: 1px solid #47748b;
  background-color: rebeccapurple;
}

.wrapper {
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: stretch;
}
button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 98%;
  height: 50px;
  background: #7386d5;
  border-radius: 10px;
  border: 2px solid white;
  color: white;
}
button:hover {
  background: rebeccapurple;
}
</style>
