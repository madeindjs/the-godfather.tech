<template>
  <div>
    <select v-if="repositories.length > 0" @change="emitInput" v-model="repository">
      <option v-for="repo of repositories" :value="repo.html_url" :key="repo.url">
        {{ repo.name }}
      </option>
    </select>
    <input v-else type="url" @keyup="emitInput" v-model="repository" required />
  </div>
</template>
<script setup>
// @ts-check
import { ref, defineProps, defineEmits } from "vue";
import { getUserRepositories } from "../utils/github";

const props = defineProps({ value: String });

const emit = defineEmits(["input"]);

function emitInput() {
  emit("input", repository.value);
}

const repositories = ref([]);
const repository = ref(props.value ?? "");

getUserRepositories().then((r) => {
  repositories.value = r;
  if (r.length > 0) {
    repository.value = r.sort((a, b) => b.forks_count - a.forks_count)[0].html_url;
    emitInput();
  }
});
</script>
