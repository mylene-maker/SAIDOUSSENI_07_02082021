<template>
  <nav>
    <div class="menu">
      <router-link to="/profile" class="item1">Profile</router-link>
      <router-link to="/actuality" class="item2">Fil d'actualité</router-link>
      <router-link to="/" @click="logout" class="item3">Déconnexion</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Menu",

  methods: {
    logout() {
      localStorage.removeItem("user");
      this.$router.push("./");
    },
  },
};
</script>
<style lang="scss">
nav {
  display: flex;
  justify-content: center;
  width: 100%;

  .menu {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .item1, .item2, .item3{
    background-color: rgba(99, 99, 91, 0.575);
    width: 40%;
    text-decoration: none;
    color: black;
    padding: 20px;
  margin-bottom: 40px;
  }
  .item1:hover, .item2:hover, .item3:hover{
    border-top: 2px solid rgb(19, 18, 18);
    background-color: rgba(26, 24, 24, 0.425);
    color: white;
  }
}
</style>