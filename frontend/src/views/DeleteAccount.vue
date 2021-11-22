<template>
  <div>
    <h3>Etes vous sûr de vouloir supprimer ce compte ?</h3>
    <button class="btn btn-danger" @click="deleteAccount">Oui Supprimer</button>
    <router-link to="/actuality"> Non revenir l'accueil </router-link>
  </div>
</template>
<script>
import axios from "axios";
export default {
  nom: "deleteAccount",
  methods: {
    deleteAccount() {
      // creer une variable qui contient l'id recuperer via l'Url
      let userId = this.$route.params.userId;
      console.log(userId);
      axios
        .delete(`http://localhost:3000/api/users/${userId}`)
        .then(() => console.log("utilisateur supprimé"))
        .catch((error) => console.log(error));
            this.$router.push("./admin");
        
    },
  },
};
</script>