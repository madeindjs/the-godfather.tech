<template>
  <article class="image-tag">
    <header>Image preview</header>
    <!-- <img :src="imageUrl" alt="" /> -->
    <p>Include this badge in your repository</p>
    <pre class="image-tag__md">{{ markdownImage }}</pre>
    <button class="outline">Copy tag</button>
  </article>
</template>
<script setup>
import { computed, defineProps } from "vue";
// @ts-check
const props = defineProps({
  repository: String,
  numberOfSponsors: Number,
  theme: String,
  pricePerView: Number,
});

const imageUrl = computed(() => {
  const params = new URLSearchParams();
  params.set("repository", props.repository);
  params.set("numberOfSponsors", String(props.numberOfSponsors));
  params.set("theme", props.theme);
  params.set("pricePerView", String(props.pricePerView));
  params.set("version", "1");
  return `http://lvh.me/v1/badge?${params.toString()}`;
});

const markdownImage = computed(() => {
  return `![List of sponsors](${imageUrl.value})`;
});
</script>

<style scoped>
.image-tag__md {
  overflow-x: scroll;
}
</style>
