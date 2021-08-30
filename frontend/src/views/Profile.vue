<template>
    <div>
        <nav>
            <p>navigation du site ...</p>
        </nav>
        <h1>Vous êtes connecté en tant que {{ nom }}</h1>
        <div>
            <p>Votre Nom : {{ nom }} {{ prenom }}</p>
            <p> Adresse mail :</p>
            <p>Administrateur réseau : </p>
        </div>
        <button>Supprimer mon compte</button>
        <div>
            {{ info }}
        </div>
    </div>
</template>

<script>

export default {
  name: 'Profile',
  components: {
      
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
