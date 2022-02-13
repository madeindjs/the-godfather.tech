<template>
  <a :href="url" :role="props.role">Signin with Github</a>
</template>

<script setup>
import { computed, defineProps } from "@vue/runtime-core";
import { oauthQueryParams } from "../constants/github-oauth";
const props = defineProps({ role: String });

const url = computed(() => `https://github.com/login/oauth/authorize?${oauthQueryParams.toString()}`);
</script>
