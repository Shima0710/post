<script setup lang="ts">
import { ref } from "vue";

const userName = ref("");

const emits = defineEmits(["submit"]);

const onSubmit = () => {
  emits("submit", userName.value);
};
</script>

<template>
  <div class="modal-mask">
    <div class="modal-container">
      <div class="modal-header">
        <slot name="header">設定</slot>
      </div>
      <div class="modal-body">
        <slot name="body">
          <span>ユーザー名を更新</span>
          <input v-model="userName" />
        </slot>
      </div>
      <div class="modal-footer">
        <slot name="footer">
          <button @click="onSubmit">OK</button>
        </slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.227);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-container {
  width: 300px;
  height: 400px;
  background-color: azure;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  font-size: 1.5rem;
  padding: 20px;
}

span {
  font-size: 0.75em;
}
</style>
