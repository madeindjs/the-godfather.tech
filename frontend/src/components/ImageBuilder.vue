<template>
  <div>
    <form>
      <div class="grid">
        <label for="repository"
          >Repository

          <GithubRepositorySelector @input="updateRepository" />
        </label>

        <label for="numberOfSponsors"
          >Number of sponsors

          <input type="number" name="numberOfSponsors" v-model="numberOfSponsors" required min="1" max="10" />
        </label>

        <label for="numberOfSponsors"
          >Theme

          <select v-model="theme">
            <option :value="theme" v-for="theme of THEMES" :key="theme">{{ theme }}</option>
          </select>
        </label>

        <label for="pricePerView"
          >Price per view

          <input type="number" name="pricePerView" v-model="pricePerView" required min="0" max="1" step="0.01" />
        </label>
      </div>
    </form>

    <ImageTag
      :repository="repository"
      :numberOfSponsors="numberOfSponsors"
      :theme="theme"
      :pricePerView="pricePerView"
    />
  </div>
</template>

<script setup>
// @ts-check
import { ref } from "vue";
import { THEMES } from "../constants/theme";
import GithubRepositorySelector from "./GithubRepositorySelector.vue";
import ImageTag from "./ImageTag.vue";

const repository = ref("");
const numberOfSponsors = ref(3);
const theme = ref("classic");
const pricePerView = ref(0.01);
</script>

<style scoped>
.image-builder__form {
  display: grid;
  grid-template-columns: 200px 1fr;

  row-gap: 1rem;
}

.image-builder__form__repository {
  grid-column: 1/-1;
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
