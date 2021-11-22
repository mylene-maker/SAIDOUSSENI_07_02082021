<template>
  <nav>
    <div class="menu">
      <router-link to="/profile" class="item1"><i class="fas fa-user"></i></router-link>
      <router-link to="/admin" class="item1"><i class="fas fa-lock"></i></router-link>
      <router-link to="/actuality" class="item1"><i class="fas fa-stream"></i></router-link>
      <router-link to="/" @click="logout" class="item1"><i class="fas fa-sign-out-alt"></i></router-link>
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
  }
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
  .item1{
    background-color: #C1B6B5;
    box-shadow: 1px 2px #745b4da9;
    width: 40%;
    text-decoration: none;
    color: black;
    padding: 20px;
    margin-bottom: 40px;
  }
  .item1:hover{
    border-top: 2px solid #745B4D;
    background-color: #C1B6B5;
    color: white;
  }
}
</style>