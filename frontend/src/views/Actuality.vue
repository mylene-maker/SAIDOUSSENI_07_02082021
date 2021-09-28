<template>
  <div id="app">
    <nav>
      <!-- Inmportation du composant menu -->
      <Menu />
    </nav>
    <!-- Publication d'un post -->
    <div class="addPost">
      <form action="" @submit.prevent="submitForm">
        <label for="message">Exprimez-Vous... </label>
        <input
          type="text"
          id="message"
          v-model="message"
          placeholder="Exprimez-vous..."
        />
        <div class="options">
          <label for="image"></label>
          <input
            @change="addImage"
            type="file"
            id="image"
            name="image"
            accept="image/*"
          />
        </div>
        <button class="btn btn-dark">Publier</button>
      </form>
    </div>
    <!-- affichage des posts -->
    <div class="postContainer card" v-for="post in info" :key="post.id">
      <div class="post">
        <div>
          <p>{{ post.message }}</p>
          <img v-bind:src="post.image" alt="" />
        </div>
        <div>
          <router-link :to="{name: 'AddComment', params: {postId: post.id},}">|||</router-link>
        </div>
      </div>
      <!-- affichage des commentaires -->
      <div
        v-for="comment in infoComment"
        class="commentaire"
        :key="comment.id"
      >
        <div>
          <p class="textComment" >{{ comment.commentaire }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Menu from "@/components/Menu.vue";

export default {
  name: "Actuality",
  components: { Menu },
  data() {
    return {
      info: "",
      infoComment: "",
      token: null,
      userId: null,
      message: "",
      lien: "",
      image: "",
      commentaire: "",
    };
  },

  methods: {
    submitForm() {
      let user = localStorage.getItem("user");
      let token = JSON.parse(user).token; // recupere le token contenue dans le stockage locale
      let userId = JSON.parse(user).userId; // recupere l'Id de l'utilisateur' contenue dans le stockage locale
      console.log(token);
      console.log(userId);
      // envoi des données du formulaire addPost
      let formData = new FormData();
      let post = {
        message: this.message,
        lien: this.lien,
        image: this.image,
        userId: userId,
      };
      formData.append("content", JSON.stringify(post));
      console.log(post);
      if (this.image) {
        formData.append("image", this.image);
      }
      axios.post("http://localhost:3000/api/posts/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
      });
    },

    addImage(event) {
      this.image = event.target.files[0];
      console.log(this.image);
    },
  },

  mounted() {
    axios
      .get("http://localhost:3000/api/posts/")
      .then((response) => (this.info = response.data))
      .catch((error) => console.log(error));
    axios
      .get("http://localhost:3000/api/comments/")
      .then((response) => (this.infoComment = response.data))
      .catch((error) => console.log(error));
  },
};
</script>

<style lang="scss" scoped>
.addPost {
  background-color: #c1b6b5;
  box-shadow: 1px 2px #745b4dab;
  padding: 10px;
  width: 90%;
  margin: auto;

  label {
    display: none;
  }
  input {
    width: 100%;
    margin-bottom: 5px;
  }
}

.postContainer {
  width: 90%;
  border: 1px solid #7b6277;
  margin: auto;
  margin-top: 40px;
  margin-bottom: 20px;
}
.post {
  background-color: white;
  margin-bottom: 60px;
  display: flex;
  justify-content: space-between;
  padding: 10px;
}
.textComment{
  border-top: 1px solid #C1B6B5;
  background-color: #745b4d4d;
  margin-top: -10px;
}
</style>