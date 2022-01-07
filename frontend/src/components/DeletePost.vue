<template>
  <div>
    <button class="btn btn-danger" @click="deletePost">
      Supprimer le post
    </button>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "deletePost",
  data() {
    return {};
  },
  methods: {
    deletePost() {
      let user = localStorage.getItem("user");
      let userId = JSON.parse(user).userId; // recupere l'Id de l'utilisateur' contenue dans le stockage locale
      console.log(userId);
      let token = JSON.parse(user).token; // recupere le token contenue dans le stockage locale
      console.log(token);
      //  variable contenant le PostId recuperer dans l'url
      let postId = this.$route.params.postId;
      console.log(postId);
      axios
        .delete(`http://localhost:3000/api/posts/${postId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        })
        .then(() => console.log("Ce post est supprimé"))
        .catch((error) => console.log(error));
    },
  },
};
</script>