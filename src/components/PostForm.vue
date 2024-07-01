<script setup lang="ts">
import { ref } from 'vue';

const text = ref("");
const emits = defineEmits(["submit"]);

const onSubmit = () => {
  if (text.value.trim()) {
    emits("submit", text.value);
    text.value = "";
  } else {
    alert("内容を入力してください。");
  }
};
</script>

<template>
  <div>
    <form class="post-form" @submit.prevent="onSubmit">
      <textarea placeholder="" v-model="text"></textarea>
      <button type="submit">Post</button>
    </form>
  </div>
</template>

<style scoped>
.post-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
}

.post-form textarea {
  height: 5em;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  padding: 0.5em;
  font-size: 1.5rem;
}

.post-form button {
  margin-top: 20px;
  border-radius: 0.5em;
  background-color: rgb(34, 202, 110);
  color: white;
  width: 200px;
}
</style>
