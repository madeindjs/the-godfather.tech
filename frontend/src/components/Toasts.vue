<template>
  <div class="toasts">
    <Toast v-for="toast of state.toasts" :key="toast.id" :message="toast.message" :level="toast.level" :id="toast.id" />
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
  width: 12rem;
}
</style>
