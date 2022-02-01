<template>
  <div :class="'toast toast-' + toast.level" @click="remove">{{ toast.message }}</div>
</template>

<script setup>
import { defineProps } from "vue";
import { toastStore } from "../store/ToastStore";

const toast = defineProps({
  message: String,
  level: String,
  id: Number,
});

function remove() {
  toastStore.remove(toast.id);
}

setTimeout(remove, 7000);
</script>

<style>
.toast {
  padding: 0.5rem;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 1rem;
}
.toast-error {
  background-color: red;
}
.toast-success {
  background-color: green;
}
.toast-warn {
  background-color: orange;
}
</style>
