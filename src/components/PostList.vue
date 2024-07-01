<script setup lang="ts">
import { reactive } from "vue";
import { defineProps, defineEmits } from "vue";
import { Post } from "../types/Post";

const props = defineProps<{ posts: Post[] }>();
const emits = defineEmits(["add-response", "delete-post", "like-post", "like-response", "delete-response"]);

const responseText = reactive<{ [key: string]: string }>({});

const onSubmitResponse = (postId: string) => {
  const response = responseText[postId];
  if (response && response.trim()) {
    emits("add-response", postId, response);
    responseText[postId] = "";
  } else {
    alert("返信内容を入力してください。");
  }
};

const onDeletePost = (postId: string) => {
  emits("delete-post", postId);
};

const onLikePost = (postId: string) => {
  emits("like-post", postId);
};

const onLikeResponse = (postId: string, responseId: string) => {
  emits("like-response", postId, responseId);
};

const onDeleteResponse = (postId: string, responseId: string) => {
  emits("delete-response", postId, responseId);
};
</script>

<template>
  <div class="post-list">
    <ul>
      <li v-for="post in props.posts" :key="post.id">
        <div v-html="post.text"></div>
        <div class="post-date">{{ post.date }}</div>
        <div class="button-group">
          <button @click="onLikePost(post.id)" class="like-button">
            <font-awesome-icon :icon="['fas', 'heart']" :class="{ liked: post.liked }" />
          </button>
          <button @click="onDeletePost(post.id)" class="delete-button">
            <font-awesome-icon :icon="['fas', 'trash']" />
          </button>
        </div>
        <div class="responses">
          <div v-for="response in post.responses" :key="response.id">
            <div v-html="response.text"></div>
            <div class="response-date">{{ response.date }}</div>
            <div class="button-group">
              <button @click="onLikeResponse(post.id, response.id)" class="like-button">
                <font-awesome-icon :icon="['fas', 'heart']" :class="{ liked: response.liked }" />
              </button>
              <button @click="onDeleteResponse(post.id, response.id)" class="delete-button">
                <font-awesome-icon :icon="['fas', 'trash']" />
              </button>
            </div>
          </div>
        </div>
        <form class="response-form" @submit.prevent="onSubmitResponse(post.id)">
          <textarea v-model="responseText[post.id]" placeholder="返信を入力"></textarea>
          <button type="submit">返信</button>
        </form>
      </li>
    </ul>
  </div>
</template>

<style scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.post-list li {
  padding: 1rem;
  border-bottom: 1px solid #ccc;
  font-size: 1.5rem;
}

.post-date, .response-date {
  font-size: 0.875rem;
  color: gray;
  margin-top: 0.5rem;
}

.responses {
  margin-top: 1rem;
  margin-left: 1rem;
}

.response-form {
  margin-top: 1rem;
}

.response-form textarea {
  width: 100%;
  height: 2em;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  padding: 0.5em;
  font-size: 1rem;
  background-color: white;
  color: black;
}

.response-form button {
  margin-top: 0.5rem;
  border-radius: 0.5em;
  background-color: rgb(34, 202, 110);
  color: white;
  width: 100px;
}

.button-group {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.like-button, .delete-button {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.like-button .fa-heart {
  font-size: 1.5rem;
  color: rgb(152, 152, 152);
  transition: color 0.3s ease;
}

.like-button .fa-heart.liked {
  color: red;
}

.delete-button .fa-trash {
  font-size: 1.5rem;
  color:rgb(152, 152, 152);
  transition: color 0.3s ease;
}

.delete-button:hover .fa-trash {
  color: red;
}

.dark-mode .response-form textarea {
  background-color: #333;
  color: white;
}

.dark-mode .post-list li {
  border-bottom: 1px solid #444;
}

.dark-mode .post-date, .dark-mode .response-date {
  color: #bbb;
}
</style>
