<template>
  <article>
    <header>Image preview</header>
    <img :src="imageUrl" alt="" />
    <p>Include this badge in your repository</p>
    <figure>
      <pre>{{ markdownImage }}</pre>
    </figure>
    <button class="outline">Copy tag</button>
  </article>
</template>
<script setup>
import { computed, defineProps } from "vue";
import { PROJECT_API_URL } from "../constants/project";
// @ts-check
const props = defineProps({
  repository: String,
  style: String,
  pricePerView: Number,
});

const imageUrl = computed(() => {
  const params = new URLSearchParams();
  params.set("repository", props.repository);
  params.set("style", props.style);
  params.set("pricePerView", String(props.pricePerView));

  return `${PROJECT_API_URL}/badge?${params.toString()}`;
});

const markdownImage = computed(() => {
  return `![List of sponsors](${imageUrl.value})`;
});
</script>
