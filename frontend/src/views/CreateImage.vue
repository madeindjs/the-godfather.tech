<template>
  <div class="create-image">
    <h1>Generate a badge</h1>
    <ImageBuilder />
  </div>
</template>

<script>
import ImageBuilder from "../components/ImageBuilder.vue";

export default {
  name: "CreateImage",
  components: { ImageBuilder },
  setup() {},
};
</script>
