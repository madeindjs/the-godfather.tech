<template>
  <div>
    <select v-if="repositories.length > 0" @change="emitInput" v-model="repository">
      <option v-for="repo of repositories" :value="repo.html_url" :key="repo.url">
        {{ repo.name }}
      </option>
    </select>
    <input v-else type="url" @keyup="emitInput" v-model="repository" required />
    <p v-if="estimatedPrice">
      This repository can generate
      <mark>{{ formatMoney(estimatedPrice) }} per {{ nbViewsExamples }} views</mark>.<br />
      <i>Get more information about billing in <router-link to="/faq">FAQ page</router-link>.</i>
    </p>
  </div>
</template>
<script setup>
// @ts-check
import { ref, defineProps, defineEmits, computed } from "vue";
import { getUserRepositories } from "../utils/github";
import { calculatePrice } from "../utils/price";
import { formatMoney } from "../utils/formatter";

const props = defineProps({ value: String });
const emit = defineEmits(["input"]);

function emitInput() {
  emit("input", repository.value);
}

const repositories = ref([]);
const repository = ref(props.value ?? "");

const nbViewsExamples = 1000;

const estimatedPrice = computed(() => {
  if (!repository.value) {
    return undefined;
  }

  const info = repositories.value.find(({ html_url }) => html_url === repository.value);

  if (info === undefined) {
    return undefined;
  }

  return calculatePrice(info.stargazers_count, nbViewsExamples);
});

getUserRepositories().then((r) => {
  repositories.value = r;
  if (r.length > 0) {
    repository.value = r.sort((a, b) => b.forks_count - a.forks_count)[0].html_url;
    emitInput();
  }
});
</script>
