<template>
    <div>
        <nav>
            <Menu/>
        </nav>
        <h1>Vous êtes connecté en tant que {{ nom }}</h1>
        <div>
            <p>Votre Nom : {{ nom }} {{ prenom }}</p>
            <p> Adresse mail :</p>
            <p>Administrateur réseau : </p>
        </div>
        <button>Supprimer mon compte</button>
        
    </div>
</template>

<script>
import Menu from '@/components/Menu.vue'

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
          Administrateur : ""
      }
  },

}
</script>
