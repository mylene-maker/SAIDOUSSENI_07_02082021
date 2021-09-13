<template>
  <div id="app">
    <nav>
      <Menu />
    </nav>
    <div class="addPost">
      <form action="" @submit.prevent="submitForm">
        <label for="message">Exprimez-Vous... </label>
        <input type="text" id="message" v-model="message" />
        <div class="options">
          <!-- <label for="lien">Joindre un lien</label>
          <input
            type="text"
            id="lien"
            v-model="lien"
            placeholder="Joindre un lien"
          /> -->
          <label for="image"></label>
          <input
            @change="addImage"
            type="file"
            id="image"
            name="image"
            accept="image/*"
          />
        </div>

        <button>Publier</button>
      </form>
    </div>
    <!-- affichage des posts -->
    <div class="postContainer" v-for="post in info" :key="post.id">
      <div class="post">
        <p>{{ post.message }}</p>
        <!-- <p>{{ post.image }}</p> -->
        <img v-bind:src="post.image" alt="" />
        <p>{{ post.lien }}</p>
        <ButtonComment />
      </div>
      <div v-for="comment in infoComment" class="commentaire" :key="comment.id">
        <img src="http://via.placeholder.com/40x40" alt="" >
        <p>{{ comment.commentaire }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Menu from "@/components/Menu.vue";
import ButtonComment from "@/components/ButtonComment.vue";

export default {
  name: "Actuality",
  components: { Menu, ButtonComment },
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
      let formData = new FormData();
      let post = {
        message: this.message,
        lien: this.lien,
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

.postContainer {
  width: 100%;
  margin-top: 40px;
  border: 1px solid rgba(14, 13, 13, 0.377);
}
.post {
  background-color: white;
  margin-bottom: 60px;
}
.commentaire {
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.082);
  background-color: rgba(188, 143, 143, 0.473);
  margin-top: -50px;
  padding-top: 1px;
  display: flex;
  img{
    margin-right: 20px;
  }
}
</style>