<template>
  <form @submit.prevent="submit">
    <div class="grid">
      <label for="content"
        >Tags

        <input type="text" name="content" v-model="content" />
      </label>
      <label for="tags"
        >Tags

        <input type="text" name="tags" v-model="tags" />
      </label>

      <label for="amountPerDay"
        >Price per view

        <input type="number" name="amountPerDay" v-model="amountPerDay" required min="0" max="1" step="0.01" />
      </label>

      <input type="submit" :aria-busy="String(loading)" />
    </div>
  </form>
</template>

<script setup>
// @ts-check
import { ref, defineEmits } from "vue";
import { toastStore } from "../store/ToastStore";
import { createCampaign } from "../utils/campaigns";

const emit = defineEmits(["created"]);

const tags = ref("");
const content = ref("ACME corp");
const amountPerDay = ref(0.01);
const loading = ref(false);

async function submit() {
  loading.value = true;
  const tagsArray = tags.value === "" ? [] : tags.value.split(" ");

  try {
    await createCampaign({ tags: tagsArray, amountPerDay: amountPerDay.value, content: content.value });
    toastStore.display("Campaign created", "success");
    emit("created");
  } catch (e) {
    toastStore.display("Cannot create campaign", "error");
    console.error(e);
  } finally {
    loading.value = false;
  }
}
</script>
