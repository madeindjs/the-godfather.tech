<template>
  <div class="github-logged">
    <p>You have been logged with Github! Please wait...</p>
  </div>
</template>

<script>
// @ts-check
import axios from "axios";
import { PROJECT_API_URL } from "../constants/project";
import { toastStore } from "../store/ToastStore";

import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { userStore } from "../store/UserStore";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();

    async function authenticate() {
      try {
        const response = await axios.post(`${PROJECT_API_URL}/github/auth`, { code: route.query.code });
        const data = response.data;
        toastStore.display("Welcome", "success");
        userStore.login({
          email: data.user.email,
          id: data.user.id,
          token: data.token,
          githubInformation: data.user.githubInformation,
        });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toastStore.display("Error during authentification", "error");
        } else {
          console.error(error);
        }
      } finally {
        router.push({ name: "Home" });
      }
    }

    authenticate();
  },
};
</script>
