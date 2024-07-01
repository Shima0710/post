<script setup lang="ts">
import { ref, computed } from "vue";
import PostForm from './components/PostForm.vue';
import PostList from './components/PostList.vue';
import { Post, Response } from "./types/Post";

const posts = ref<Post[]>([
  { id: "1", text: "Hello, Vue 3!", date: new Date().toLocaleString(), responses: [], liked: false },
  { id: "2", text: "Hello, Vite!", date: new Date().toLocaleString(), responses: [], liked: false },
  // 他の投稿を追加
]);

const onSubmitForm = (text: string) => {
  posts.value.unshift({ id: String(Math.random()), text, date: new Date().toLocaleString(), responses: [], liked: false });
};

const onAddResponse = (postId: string, response: string) => {
  const post = posts.value.find((p: Post) => p.id === postId);
  if (post) {
    post.responses.push({ id: String(Math.random()), text: response, date: new Date().toLocaleString(), liked: false });
  }
};

const onDeletePost = (postId: string) => {
  posts.value = posts.value.filter((p: Post) => p.id !== postId);
};

const onLikePost = (postId: string) => {
  const post = posts.value.find((p: Post) => p.id === postId);
  if (post) {
    post.liked = !post.liked;
  }
};

const onLikeResponse = (postId: string, responseId: string) => {
  const post = posts.value.find((p: Post) => p.id === postId);
  if (post) {
    const response = post.responses.find((r: Response) => r.id === responseId);
    if (response) {
      response.liked = !response.liked;
    }
  }
};

const onDeleteResponse = (postId: string, responseId: string) => {
  const post = posts.value.find((p: Post) => p.id === postId);
  if (post) {
    post.responses = post.responses.filter((r: Response) => r.id !== responseId);
  }
};

const isDarkMode = ref(false);

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
};

// Pagination logic
const currentPage = ref(1);
const postsPerPage = 5;

const totalPages = computed(() => Math.ceil(posts.value.length / postsPerPage));

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage;
  const end = start + postsPerPage;
  return posts.value.slice(start, end);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    scrollToTop();
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    scrollToTop();
  }
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>

<template>
  <div :class="{ 'dark-mode': isDarkMode }" class="container">
    <nav class="navbar">
      <h1>POST</h1>
      <div class="switch-container">
        <label class="switch">
          <input type="checkbox" @change="toggleDarkMode" :checked="isDarkMode">
          <span class="slider round"></span>
        </label>
      </div>
    </nav>
    <PostForm @submit="onSubmitForm" />
    <PostList
      :posts="paginatedPosts"
      @add-response="onAddResponse"
      @delete-post="onDeletePost"
      @like-post="onLikePost"
      @like-response="onLikeResponse"
      @delete-response="onDeleteResponse"
    />
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">前へ</button>
      <span>ページ {{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">次へ</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  background-color: white;
  color: black;
  min-height: 100vh;
  transition: background-color 0.3s ease, color 0.3s ease;
  position: relative;
  overflow: hidden;
}

.dark-mode {
  background-color: #121212;
  color: white;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #416994;
  color: white;
}

.navbar h1 {
  margin: 0;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.switch-container {
  margin-left: auto;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #1edd61;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
}

.pagination button {
  margin: 0 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination button:hover:not(:disabled) {
  background-color: #0056b3;
}

.background {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
}

.background::before {
  content: '';
  position: absolute;
  top: -10%;
  left: -10%;
  width: 120%;
  height: 120%;
  background: linear-gradient(135deg, #ff7e5f, #feb47b);
  transform: rotate(45deg);
  border-radius: 50%;
  transition: background 0.3s ease;
}

.dark-mode .background::before {
  background: linear-gradient(135deg, #434343, #000000);
}

.card {
  background-color: #f8f9fa;
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 1rem 0;
  padding: 1rem;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.dark-mode .card {
  background-color: #2c2c2c;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
}
</style>
