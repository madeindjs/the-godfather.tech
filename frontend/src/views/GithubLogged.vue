<template>
  <div class="github-logged">
    <p>You have been logged with Github! Please wait...</p>
  </div>
</template>

<script>
import axios from "axios";
import { PROJECT_API_URL } from "../constants/project";
import { useRoute } from "vue-router";
export default {
  setup() {
    const route = useRoute();

    axios.post(`${PROJECT_API_URL}/github/auth`, { code: route.query.code });
    // TODO
  },
};
</script>
