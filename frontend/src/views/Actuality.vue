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
      <div class="option">
        <p>{{ post.user.pseudo }}</p>
        <div class="router-option">
          <router-link :to="{ name: 'AddComment', params: { postId: post.id } }"
            ><i class="far fa-comment"></i
          ></router-link>
          |
          <router-link
            :to="{ name: 'UpdateComment', params: { postId: post.id } }"
            ><i class="fas fa-mouse-pointer"></i
          ></router-link>
          |
          <router-link
            :to="{ name: 'DeleteComment', params: { postId: post.id } }"
            ><i class="fas fa-trash-alt"></i
          ></router-link>
        </div>
      </div>
      <div class="post">
        <div>
          <p>{{ post.message }}</p>
          <img v-bind:src="post.image" alt="" />
        </div>
      </div>
      <!-- affichage des commentaires -->
      <div v-for="comment in infoComment" class="commentaire" :key="comment.id">
        <div v-if="comment.postId === post.id" class="textComment">
          <div v-for="user in infoUser" :key="user.id">
            <p v-if="user.id == comment.userId">{{ user.pseudo }} : {{ comment.commentaire }} </p>
          </div>
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
      infoUser: "",
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
      .then((response) => (this.infoComment = response.data.comments))
      .catch((error) => console.log(error));

    axios
      .get("http://localhost:3000/api/users/")
      .then((response) => (this.infoUser = response.data));

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
.option {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}
.router-option i {
  color: black;
  font-size: 0.9rem;
}
.post {
  background-color: white;
}
.textComment {
  border-top: 1px solid #c1b6b5;
  background-color: #745b4d4d;
  padding: 5px;
  text-align: left;
}
</style>