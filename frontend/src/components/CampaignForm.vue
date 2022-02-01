<template>
  <div class="campaign-form">
    <form class="campaign-form__form" @submit.prevent="submit">
      <label for="tags">Tags</label>
      <input type="text" name="tags" v-model="tags" />

      <label for="amountPerDay">Price per view</label>
      <input type="number" name="amountPerDay" v-model="amountPerDay" required min="0" max="1" step="0.01" />

      <input type="submit" />
    </form>
  </div>
</template>

<script setup>
// @ts-check
import { ref, defineEmits } from "vue";
import { toastStore } from "../store/ToastStore";
import { createCampaign } from "../utils/campaigns";

const emit = defineEmits(["created"]);

const tags = ref("tags");
const amountPerDay = ref(0.01);

async function submit() {
  try {
    await createCampaign({ tags: tags.value.split(" "), amountPerDay: amountPerDay.value });
    toastStore.display("Campaign created", "success");
    emit("created");
  } catch (e) {
    toastStore.display("Cannot create campaign", "error");
    console.error(e);
  }
}
</script>

<style scoped>
.campaign-form__form {
  display: grid;
  grid-template-columns: 200px 1fr;

  row-gap: 1rem;
}

.campaign-form__form__repository {
  grid-column: 1/-1;
}

.form-control label {
  display: block;
}
.form-control input,
.form-control select {
  display: block;
  width: 100%;
}
</style>
