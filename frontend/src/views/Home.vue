<template>
  <div class="container">
    <h3>Bienvenue sur le réseau social de groupomania !</h3>

    <div class="container-form">
      <p>Connectez-vous pour acceder à toutes nos fonctionnalitées</p>
      <form @submit.prevent="login">
        <div>
          <label for="email">Email:</label><br />
          <input id="email" type="email" v-model="dataLogin.email" required />
        </div>
        <div>
          <label for="password">password:</label><br />
          <input
            type="password"
            id="password"
            v-model="dataLogin.mot_de_passe"
            required
          />
        </div>
        <button class="" type="submit">Submit</button>
      </form>
      <div>
        <p>Pans encore de compte ?</p>
        <router-link to="/signin"> Inscivez-vous</router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container-form {
  background-color: rgba(180, 155, 170, 0.561);
  max-width: 60%;
  margin: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 2px rgba(0, 0, 0, 0.39);
}

button {
  margin-top: 20px;
  padding: 10px;
  background-color: rgba(55, 53, 163, 0.699);
  color: white;
}
</style>
  
<script>
import axios from "axios";
export default {
  name: "Login",
  data: () => ({
    dataLogin: {
      email: null,
      mot_de_passe: null,
    },
    messageErreur: "",
    token: null,
  }),
  methods: {
    login() {
      axios
        .post("http://localhost:3000/api/users/login", this.dataLogin)
        .then((response) => {
          console.log(response);
          let token = response.data.token;
          if (!token) {
            this.messageErreur = "Une erreur à été detecté !";
          } else {
            localStorage.setItem("user", JSON.stringify(response.data));
            this.$router.push("./profile");
          }
        })
        .catch((error) => {
          this.response = "error:" + error.response;
        });
    },
  },
};
</script>