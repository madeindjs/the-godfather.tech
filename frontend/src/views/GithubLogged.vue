<template>
  <div class="github-logged">
    <p>You have been logged with Github! Please wait...</p>
  </div>
</template>
<script scoped>
import axios from "axios";

import { PROJECT_API_URL } from "../constants/project";

axios.post(`${PROJECT_API_URL}/github/auth`, { code: window.location.search.replace("?code=", "") });
</script>
