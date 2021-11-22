<template>
  <div>
    <Menu />
    <div v-if=" admin > 0 ">

      <div class="user" v-for="user in users" :key="user.id">
        <p><strong>UTILISATEUR </strong> : {{ user.nom }} {{ user.prenom }}</p>
        <p><strong>PSEUDONYME </strong> : {{ user.pseudo }}</p>
        <p><strong>ADRESSE E-MAIL </strong>: {{ user.email }}</p>
        <router-link
          :to="{ name: 'DeleteAccount', params: { userId: user.id } }"
          >Supprimer le compte</router-link
        >
      </div>
    </div>
    <div v-else>
      <i class="far fa-window-close"></i>
      <h1>vous n'etes pas autorisés à accéder à ses données</h1>
    </div>
    <button @click="getAdmin">click</button>
  </div>
</template>

<script>
import axios from "axios";
import Menu from "@/components/Menu.vue";
export default {
  name: "Admin",
  components: { Menu },
  data() {
    return {
      admin: "",
      users: "",
      info: ""
    };
  },
  methods: {
    getAdmin(){
      let user = localStorage.getItem('user');
      this.admin = JSON.parse(user).admin; 
      alert(this.admin)
    }
  },

  mounted() {
    axios
      .get("http://localhost:3000/api/users/")
      .then((response) => (this.users = response.data));
  },
  
};
</script>
<style lang="scss" scoped>
.user {
  border: 1px solid #745b4dab;
  margin-bottom: 10px;
  padding: 20px;
  text-align: left;
}
</style>
