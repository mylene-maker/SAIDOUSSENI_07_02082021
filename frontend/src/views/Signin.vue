<template>
  <div id="app">
    <div class="container">
      <form @submit.prevent="submitForm">
        <h3>Inscription</h3>

        <div>
          <label for="name">Nom:</label><br />
          <input id="name" type="text" v-model="nom" required />
        </div>
        <div>
          <label for="prenom">Prenom:</label><br />
          <input id="prenom" type="text" v-model="prenom" required />
        </div>
        <div>
          <label for="username">Pseudo:</label><br />
          <input id="username" v-model="pseudo" required />
        </div>
        <div>
          <label for="email">Email:</label><br />
          <input id="email" type="email" v-model="email" required />
        </div>
        <div>
          <label for="password">password:</label><br />
          <input id="password" v-model="mot_de_passe" required />
        </div>
        <button class="" type="submit">S'inscrire</button>
        <div>
          <p v-if="success">{{ success }}</p>
          <p v-else>{{ response }}</p>
        </div>
      </form>

      <p>Vous avez déjà un compte ?</p>
      <router-link to="/"> Connectez-vous</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Signup",
  data() {
    return {
      nom: "",
      prenom: "",
      email: "",
      mot_de_passe: "",
      pseudo: "",
      success: "",
      response: "",
    };
  },
  methods: {
    submitForm() {
      axios
        .post("http://localhost:3000/api/users/signup", {
          nom: this.nom,
          prenom: this.prenom,
          email: this.email,
          mot_de_passe: this.mot_de_passe,
          pseudo: this.pseudo,
        })
        .then((response) => {
          console.log(response);
          this.success = "Votre compte à été crée avec succès ! Vous pouvez vous connecter :-)";
          
        })
        .catch((error) => {
          this.response = "error:" + error.response.statusText;
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  background-color: rgba(180, 155, 170, 0.561);
  max-width: 60%;
  margin: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 2px rgba(0, 0, 0, 0.39);

  button {
    margin-top: 50px;
    padding: 10px;
    background-color: rgba(55, 53, 163, 0.699);
    color: white;
  }
}
</style>