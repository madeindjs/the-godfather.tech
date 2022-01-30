<template>
  <a :href="url">Signin with Github</a>
</template>

<script setup>
import { computed } from "@vue/runtime-core";
import { oauthQueryParams } from "../constants/github-oauth";

const url = computed(() => `https://github.com/login/oauth/authorize?${oauthQueryParams.toString()}`);
</script>
