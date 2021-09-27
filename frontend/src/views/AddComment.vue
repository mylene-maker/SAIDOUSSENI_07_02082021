<template>
  <div>
    <form action="" @submit.prevent="submitComment">
      <label for="commentaire"></label>
      <input type="text" placeholder="Ecrire un commentaire" id="commentaire" v-model="commentaire" @click="getPostId">
      <button class="">publier</button>
    </form>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name: "AddComment",
  data() {
    return {
      commentaire: "",
      userId: null,
      postId: null
    };
  },
  methods: {
    
    submitComment(){
      let user = localStorage.getItem("user");
      let userId = JSON.parse(user).userId; // recupere l'Id de l'utilisateur' contenue dans le stockage locale
      console.log(userId);
      let token = JSON.parse(user).token; // recupere le token contenue dans le stockage locale
      console.log(token);
      let postId = 3;
      let formData = new FormData();

      let comment = {
        commentaire: this.commentaire,
        userId: userId,
        postId: postId
      }
       formData.append("content", JSON.stringify(comment));
      console.log(comment);

      axios.post("http://localhost:3000/api/comments/comment", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
      });
        console.log(comment)

    },
  getPostId(){
    
  }
  },
};
</script>
<style lang="scss" scoped>
form{
  display: flex;

  input{
  width: 100%;
  }
}
</style>