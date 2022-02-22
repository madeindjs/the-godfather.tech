<template>
  <a :href="url" :role="props.role" :aria-busy="loading">Signin with Github</a>
</template>

<script setup>
import { defineProps, ref } from "@vue/runtime-core";
import { getOauthQueryParams } from "../constants/github-oauth";
const props = defineProps({ role: String });

const url = ref();
const loading = ref(true);

getOauthQueryParams().then((oauthQueryParams) => {
  url.value = `https://github.com/login/oauth/authorize?${oauthQueryParams.toString()}`;
  loading.value = false;
});
</script>
