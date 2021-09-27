<template>
    <div>
        <nav>
            <Menu/>
        </nav>
        <h1>Vous êtes connecté en tant que {{ }}</h1>
        <div v-for=" user in info" :key="user.id">
            <p>Votre Nom : {{ user.nom }} {{ user.prenom }}</p>
            <p> Adresse mail : {{ user.email }}</p>
            <p>Administrateur réseau : {{ user.admin }}</p>
        </div>
        <button>Supprimer mon compte</button>
    </div>
</template>

<script>
import Menu from '@/components/Menu.vue';
import axios from 'axios';
export default {
  name: 'Profile',
  components: {
      Menu
  },
  data(){
      return {
          nom: "",
          prenom: "",
          pseudo: "",
          email: "", 
          Mot_de_passe : "",
          Administrateur : "",
          info: ""
      }
  },
  mounted() {
    axios
      .get('http://localhost:3000/api/users/')
      .then(response => (this.info = response.data))
  },

}
</script>
