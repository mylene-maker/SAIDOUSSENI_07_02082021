<template>
    <nav>
        <router-link to="/profile">Profile</router-link> |
        <router-link to="/actuality">Fil d'actualité</router-link> |
        <router-link to="/" @click="logout">Déconnexion</router-link>
    </nav>
</template>

<script>
export default {
  name: 'Menu',
  
  methods: {
    logout() {
      localStorage.removeItem("user");
      this.$router.push("./");
    },
  }
}
</script>
<style lang="scss">
  nav{
    background-color: rgba(15, 15, 15, 0.247);
    padding: 5px;
    display: flex;
    justify-content: space-around;
    width: 100%;
  }
</style>