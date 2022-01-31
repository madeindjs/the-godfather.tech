<template>
  <div class="toasts">
    <Toast v-for="toast of state.toasts" :key="toast.id" :message="toast.message" :level="toast.level" />
  </div>
</template>

<script setup>
import { toastStore } from "../store/ToastStore";
import Toast from "./Toast.vue";

const state = toastStore.getState();
</script>

<style>
.toasts {
  position: fixed;
  top: 2rem;
  right: 2rem;
  width: 10rem;
}
</style>
