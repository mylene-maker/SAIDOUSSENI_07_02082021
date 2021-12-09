<template>
  <div>
    <form action="" @submit.prevent="submitComment">
      <label for="commentaire"></label>
      <input
        type="text"
        placeholder="Modifier mon commentaire"
        id="commentaire"
        v-model="commentaire"
      />
      <button class="">publier</button>
    </form>
  </div>
</template>

<script>

</script>