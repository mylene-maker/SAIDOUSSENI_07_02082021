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
    <div v-for="post in info" class="post" :key="post.id">
      <p>{{ post.message }}</p>
      <!-- <p>{{ post.image }}</p> -->
      <img v-bind:src="post.image" alt="" />
      <p>{{ post.lien }}</p>
      <div v-for="comment in infoComment" class="commentaire" :key="comment.id">
        <p>{{ comment.commentaire}}</p>
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
      infoComment:"",
      token: null,
      userId: null,
      message: "",
      lien: "",
      image: "",
      commentaire:""
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
    
    axios.get("http://localhost:3000/api/comments/")
      .then((response) => (this.infoComment = response.data))
      .catch((error) => console.log(error));
  },
};
</script>

<style lang="scss" scoped>
// form {
//   margin: auto;
//   background-color: rgba(180, 155, 170, 0.561);
//   padding: 10px;
//   display: flex;
//   justify-content: space-between;
//   // flex-direction: column;
//   align-items: center;
//   width: 80%;
//   label{
//     display: none;
//   }
//   button {
//     padding: 10px;
//   }
// }
// // input[id="message"] {
// //   width: 100%;
// //   height: 50px;
// //   margin-bottom: 20px;
// //   margin-top: 10px;
// // }
// // label{
// //   font-weight: bold;
// // }
// // .options {
// //   display: flex;
// //   flex-direction: column;
// //   margin-bottom: 20px;
// //   label {
// //     display: none;
// //   }
// //   input {
// //     width: 100%;
// //     border: none;
// //   }
// // }
.addPost {
  margin-bottom: 20px;
}
.post {
  border: 1px solid rgb(194, 181, 181);
  margin-bottom: 20px;
}
</style>