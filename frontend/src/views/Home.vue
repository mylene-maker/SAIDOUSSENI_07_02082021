<template>
  <div class="">
    <form @submit.prevent="login">
      <div>
        <label for="email">Email:</label><br />
        <input id="email" type="email" v-model="dataLogin.email" required />
      </div>
      <div>
        <label for="password">password:</label><br />
        <input type="password" id="password" v-model="dataLogin.mot_de_passe" required />
      </div>
      <button class="" type="submit">Submit</button>
    </form>
    <div>
      <p>Pans encore de compte ? </p>
      <router-link to="/signin"> Inscivez-vous</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data: () => ({
    dataLogin: {
      email: null,
      mot_de_passe: null
    },
    messageErreur: "",
    token: null
  }),
  methods: {
    login() {
      axios
        .post("http://localhost:3000/api/users/login",
          this.dataLogin
        )
        .then(response => {
          console.log(response)
          let token = response.data.token
          if(!token){
            this.messageErreur = "Une erreur à été detecté !"
          }else {
            localStorage.setItem('user', JSON.stringify(response.data))
            this.$router.push('./profile')
          }
        })
        .catch(error => {
        this.response = 'error:' + error.response
      })
    },
  },
};
</script>