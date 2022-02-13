<template>
  <div>
    <div v-if="!userState.email">
      <label for="pseudo">Pseudo Github</label>
      <input type="text" v-model="pseudo" @change="loadUserRepositories" />
    </div>
    <label v-if="repositories.length > 0" for="repository"
      >Repository
      <select @change="emitInput" v-model="repository" name="repository">
        <option v-for="repo of repositories" :value="repo.html_url" :key="repo.url">
          {{ repo.name }}
        </option>
      </select>
      <small v-if="estimatedPrice">
        This repository can generate
        <mark>{{ formatMoney(estimatedPrice) }} per {{ nbViewsExamples }} views</mark>.<br />
        <i>Get more information about billing in <router-link to="/faq">FAQ page</router-link>.</i>
      </small>
    </label>
  </div>
</template>
<script setup>
// @ts-check
import { ref, defineProps, defineEmits, computed } from "vue";
import { getUserRepositories } from "../utils/github";
import { calculatePrice } from "../utils/price";
import { formatMoney } from "../utils/formatter";
import { userStore } from "../store/UserStore";
import { toastStore } from "../store/ToastStore";

const userState = userStore.getState();

const props = defineProps({ value: String });
const emit = defineEmits(["input"]);

function emitInput() {
  emit("input", repository.value);
}

const pseudo = ref("");
const repositories = ref([]);
const repository = ref(props.value ?? "");

const nbViewsExamples = 1000;

const estimatedPrice = computed(() => {
  if (!repository.value) {
    return undefined;
  }

  if (repositories.value.length) {
    const info = repositories.value.find(({ html_url }) => html_url === repository.value);

    if (info === undefined) {
      return undefined;
    }
    return calculatePrice(info.stargazers_count, nbViewsExamples);
  } else {
    return undefined;
  }
});

function loadUserRepositories() {
  getUserRepositories(pseudo.value)
    .then((r) => {
      repositories.value = r;
      if (r.length > 0) {
        repository.value = r.sort((a, b) => b.forks_count - a.forks_count)[0].html_url;
        emitInput();
      }
    })
    .catch(() => toastStore.display(`Cannot load repositories for ${userState.email ?? pseudo.value}`, "error"));
}

if (userState.email) {
  loadUserRepositories();
}
</script>
