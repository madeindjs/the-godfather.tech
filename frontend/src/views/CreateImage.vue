<template>
  <div class="create-image">
    <h1>Add an image to your repository</h1>
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
