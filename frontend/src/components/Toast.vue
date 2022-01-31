<template>
  <div :class="'toast toast-' + toast.level">{{ toast.message }}</div>
</template>

<script setup>
import { defineProps } from "vue";

const toast = defineProps({
  message: String,
  level: String,
  id: Number,
});
</script>

<style>
.toast {
  padding: 0.5rem;
  border-radius: 5px;
}
.toast-error {
  background-color: red;
}
.toast-success {
  background-color: green;
}
</style>
