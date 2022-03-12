// @ts-check
import axios from "axios";
import { useRouter } from "vue-router";
import { toastStore } from "../store/ToastStore";
import { userStore } from "../store/UserStore";

axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    const res = error.response;

    if (res.status === 401 && res.data.error === "TokenExpiredError") {
      userStore.logout();
      toastStore.display("You have be logout", "warn");

      const router = useRouter();
      router.push({ name: "Home" });
    }

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
