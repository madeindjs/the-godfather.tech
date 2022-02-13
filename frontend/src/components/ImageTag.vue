<template>
  <article>
    <header>Image preview</header>
    <div v-if="canShow">
      <img :src="imageUrl" alt="" />
      <p>Include this badge in your repository</p>
      <input id="md-tag" type="text" :value="markdownImage" readonly />
      <button class="outline" @click="copy">Copy tag</button>
    </div>
    <div v-else>Complete form to display tag</div>
  </article>
</template>
<script setup>
// @ts-check
import { computed, defineProps } from "vue";
import { PROJECT_API_URL } from "../constants/project";
import { toastStore } from "../store/ToastStore";
const props = defineProps({
  repository: String,
  style: String,
});

// @ts-ignore
const canShow = computed(() => !!props.repository);

const imageUrl = computed(() => {
  const params = new URLSearchParams();
  params.set("repository", props.repository);
  params.set("style", props.style);
  params.set("version", "1");

  return `${PROJECT_API_URL}/badge?${params.toString()}`;
});

// @ts-ignore
function copy() {
  /** @type {HTMLInputElement} */
  // @ts-ignore
  const mdTagElement = document.getElementById("md-tag");
  mdTagElement.select();
  mdTagElement.setSelectionRange(0, 9999);
  document.execCommand("copy");
  toastStore.display("Tag copied in clipboard", "success");
}

// @ts-ignore
const markdownImage = computed(() => {
  return `![List of sponsors](${imageUrl.value})`;
});
</script>
