<template>
  <div class="signin">
    <h1>Signin</h1>
    <SigninWithGithub />
    <SigninForm v-if="loginWithForm" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import SigninForm from "../components/SigninForm.vue";
import SigninWithGithub from "../components/SigninWithGithub.vue";

const loginWithForm = ref(false);
</script>
