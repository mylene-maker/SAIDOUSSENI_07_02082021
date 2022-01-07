<template>
  <div id="app">
    <nav>
      <!-- Inmportation du composant menu -->
      <Menu />
    </nav>
    <!-- Publication d'un post -->
    <div class="addPost">
      <form action="" @submit.prevent="updatePost">
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
        <button class="btn btn-dark">Mettre à jour</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "updatePost",
  data() {
    return {
      message: "",
      lien: "",
      image: "",
      userId: ""
    };
  },
  methods: {
    updatePost() {
      let user = localStorage.getItem("user");
      let userId = JSON.parse(user).userId; // recupere l'Id de l'utilisateur' contenue dans le stockage locale
      console.log(userId);
      let token = JSON.parse(user).token; // recupere le token contenue dans le stockage locale
      console.log(token);
      //  variable contenant le PostId recuperer dans l'url
      let postId = this.$route.params.postId;
      console.log(postId);

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

      axios
        .put(`http://localhost:3000/api/posts/${postId}`, formData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        })
        .then(() => console.log("Ce post est mis à jour!"))
        .catch((error) => console.log(error));
    },
  },
};
</script>