<template>
  <div class="signup-form">
    <form class="signup-form__form" @submit.prevent="submit">
      <label for="email">Email</label>
      <input type="email" name="email" v-model="email" @keyup="cleanErrors" required />

      <label for="password">Password</label>
      <input type="password" name="password" v-model="password" @keyup="cleanErrors" required />

      <p class="signup-form__error" v-for="error of errors" :key="error">{{ error }}</p>

      <input type="submit" value="" />
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { PROJECT_API_URL } from "../constants/project";

const email = ref(`test@test-${new Date().getTime()}.fr`);
const password = ref("123456");
const errors = ref([]);

function cleanErrors() {
  errors.value = [];
}

async function submit() {
  try {
    await axios.post(`${PROJECT_API_URL}/users`, { email: email.value, password: password.value });
  } catch (error) {
    errors.value = error.response.data.message;
  }
}
</script>

<style scoped>
.signup-form__form {
  display: grid;
  grid-template-columns: 200px 1fr;
  row-gap: 1rem;
}

.signup-form__error {
  color: red;
  grid-column: 1 / -1;
}

.form-control label {
  display: block;
}
.form-control input,
.form-control select {
  display: block;
  width: 100%;
}
</style>
