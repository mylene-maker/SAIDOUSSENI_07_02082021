<template>
  <div>
    <nav>
      <Menu />
    </nav>
    <h3>Vous êtes connecté en tant que {{ info.prenom }}</h3>
    <ul class="infoUser">
      <li><strong>VOTRE NOM</strong> : {{ info.nom }}</li>
      <li><strong>VOTRE PRENOM</strong> : {{ info.prenom }}</li>
      <li><strong>VOTRE EMAIL</strong> : {{ info.email }}</li>
      <li><strong>ACCES ADMINISTRATEUR</strong> : {{ info.admin }}</li>
    </ul>
    <!--<router-link :to="{ name: 'Admin', params: { admin: info.admin } }"
      >acceder à l'espace administrateur</router-link
    >-->
    <button class="btn btn-danger">
      supprimer mon compte et me déconnecter
    </button>
  </div>
</template>

<script>
import Menu from "@/components/Menu.vue";
import axios from "axios";
export default {
  name: "Profile",
  components: {
    Menu,
  },
  data() {
    return {
      nom: "",
      prenom: "",
      pseudo: "",
      email: "",
      Mot_de_passe: "",
      Admin: "1",
      info: "",
    };
  },
  methods: {
  
  },
  mounted() {
    let user = localStorage.getItem("user");
    let userId = JSON.parse(user).userId;
    console.log(userId);
    axios
      .get(`http://localhost:3000/api/users/${userId}`)
      .then((response) => (this.info = response.data));
  },
};
</script>
<style lang="scss" scoped>
.infoUser {
  margin-top: 40px;
  margin-bottom: 40px;
  border: 1px solid #745b4d4d;
  padding: 10px;
}
.infoUser li {
  list-style-type: none;
  text-align: left;
}
</style>