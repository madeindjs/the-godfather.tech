<template>
  <div class="image-builder">
    <form>
      <div class="form-control">
        <label for="repository">Repository URL</label>
        <input type="url" name="repository" v-model="repository" required />
      </div>

      <div class="form-control">
        <label for="numberOfSponsors">Number of sponsors</label>
        <input type="number" name="numberOfSponsors" v-model="numberOfSponsors" required min="1" max="10" />
      </div>
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
import { ref, computed } from "vue";

const repository = ref("https://github.com/madeindjs/dcim_orgnzr/");
const numberOfSponsors = ref(3);

const imageUrl = computed(() => {
  const params = new URLSearchParams();
  params.set("repository", repository.value);
  return `http://lvh.me/badge?${params.toString()}`;
});

const markdownImage = computed(() => {
  const params = new URLSearchParams();
  params.set("repository", repository.value);
  params.set("numberOfSponsors", numberOfSponsors.value);
  return `![List of sponsors](${imageUrl.value})`;
});

// return { repository, imageUrl, markdownImage };
</script>

<style scoped>
.form-control label {
  display: block;
}
.form-control input {
  display: block;
  width: 100%;
}
</style>
