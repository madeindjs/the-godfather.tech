<template>
  <div class="image-builder">
    <form class="image-builder__form">
      <label for="repository">Repository URL</label>

      <select v-model="repository">
        <option v-for="repo of repositories" :value="repo.html_url" :key="repo.url">{{ repo.name }}</option>
      </select>

      <label for="numberOfSponsors">Number of sponsors</label>
      <input type="number" name="numberOfSponsors" v-model="numberOfSponsors" required min="1" max="10" />

      <label for="numberOfSponsors">Theme</label>
      <select v-model="theme">
        <option :value="theme" v-for="theme of THEMES" :key="theme">{{ theme }}</option>
      </select>

      <label for="numberOfSponsors">Price per view</label>
      <input type="number" name="pricePerView" v-model="pricePerView" required min="0" max="1" step="0.01" />

      <input type="submit" value="Create button" @submit.prevent="" />
    </form>

    <hr />

    <section>
      <div class="form-control">
        <label for="resultUrl">Badge URL</label>
        <input type="url" name="resultUrl" :value="imageUrl" readonly />
      </div>

      <div class="form-control">
        <label for="resultUrl">Markdown Badge</label>
        <input type="text" name="markdownImage" :value="markdownImage" readonly />
      </div>
    </section>
  </div>
</template>

<script setup>
// @ts-check
import { ref, computed } from "vue";
import { THEMES } from "../constants/theme";
import { getUserRepositories } from "../utils/github";

const repository = ref("");
const numberOfSponsors = ref(3);
const theme = ref("classic");
const pricePerView = ref(0.01);

const repositories = ref([]);

const imageUrl = computed(() => {
  const params = new URLSearchParams();
  params.set("repository", repository.value);
  params.set("numberOfSponsors", numberOfSponsors.value.toString());
  params.set("theme", theme.value);
  params.set("pricePerView", pricePerView.value.toString());
  params.set("version", "1");
  return `http://lvh.me/v1/badge?${params.toString()}`;
});

const markdownImage = computed(() => {
  return `![List of sponsors](${imageUrl.value})`;
});

getUserRepositories().then((r) => {
  repositories.value = r;
  if (r.length > 0) {
    repository.value = r.sort((a, b) => b.forks_count - a.forks_count)[0].html_url;
  }
});

// return { repository, imageUrl, markdownImage };
</script>

<style scoped>
.image-builder__form {
  display: grid;
  grid-template-columns: 200px 1fr;

  row-gap: 1rem;
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
