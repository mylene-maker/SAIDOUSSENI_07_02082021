<template>
  <div>
    <form action="" @submit.prevent="submitForm">
      <label for="commentaire">Ecrivez votre commentaire</label>
      <input type="text" id="commentaire" v-model="commenatire" />
      <button>Envoyer</button>
    </form>
  </div>
</template>

<script>
//import axios from "axios";
export default {
  name: "AddComment",
  components: {},
  data() {
    return {
      messageErreur: "",
      
        commentaire: "",
        userId: "",
        postId: "",
      
    };
  },
  methods: {
    submitForm() {
      
    },
  },
};
</script>
