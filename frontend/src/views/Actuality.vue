<template>
  <div id="app">
    <nav>
      <p>navigation du site ...</p>
    </nav>
    <div class="addPost">
      <form action="" @submit.prevent="submitForm">
        <label for="message">Quoi de neuf ?</label>
        <input type="text" id="message" v-model="formData.message" />
        <label for="lien">Joindre un lien</label>
        <input type="text" id="lien" v-model="formData.lien" />
        <label for="image">joindre une image</label>
        <input type="file" name="image" id="image" />
        <button>Publier</button>
      </form>
    </div>
    <div v-for="post in info" class="post" :key="post.id">
      <p>{{ post.message }}</p>
      <p>{{ post.image }}</p>
      <p>{{ post.lien }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Actuality",
  components: {},
  data() {
    return {
      info: "",
      token: null,
      formData: {
        userId: null,
        message: "",
        lien: "",
        image: "",
      },
    };
  },

  methods: {
    submitForm() {
      let user = localStorage.getItem("user");
      let token = JSON.parse(user).token; // recupere le token contenue dans le stockage locale
      let userId = JSON.parse(user).userId; // recupere l'Id de l'utilisateur' contenue dans le stockage locale
      console.log(token);
      console.log(userId);
      let formData = new FormData();
      let post = {
        text: content,
        userid: userId,
      };
      formData.append('content', JSON.stringify(post));

      axios.post("http://localhost:3000/api/posts/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });
    },
    getAllPost() {
      axios.post("http://localhost:3000/api/post");
    },
  },

  mounted() {
    axios
      .get("http://localhost:3000/api/posts/")
      .then((response) => (this.info = response.data))
      .catch((error) => console.log(error));
  },
};
</script>

<style lang="scss" scoped>
.addPost {
  margin-bottom: 20px;
}
.post {
  border: 1px solid rgb(194, 181, 181);
  margin-bottom: 20px;
}
</style>