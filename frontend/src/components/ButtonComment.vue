<template>
  <div>
    <router-link to="/addComment" @click="getPostId">Commenter</router-link>
  </div>
</template>
<script>
export default {
  name: "ButtonComment",
  data() {
    return {};
  },
  methods: {
    // getPostId() {
    //    let postId = "";
    //    let apiUrl = "http://localhost:3000/api/comments/comment/?id" + postId;
   

    // },
  },
};
</script>