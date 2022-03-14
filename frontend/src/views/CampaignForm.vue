<template>
  <div>
    <h1>Create a campaign</h1>

    <p>
      A campaign represent a amount of money spend to display your brand on Open Source projects. You can give what you
      want and add criteria to support kind of Open Source projects you love.
    </p>

    <form @submit.prevent="submit">
      <div class="grid">
        <label for="content"
          >Content
          <input type="text" name="content" v-model="content" required />
          <small>This is the text who will appear on badge</small>
        </label>
        <label for="totalPrice"
          >Total price
          <input type="number" name="totalPrice" v-model="totalPrice" required min="0" step="1" />
          <small>Bellow this value, the campaign will be stopped.</small>
        </label>
        <label for="amountPerDay"
          >Amount per day (in €)
          <input
            type="number"
            name="amountPerDay"
            v-model="amountPerDay"
            required
            min="0"
            :max="totalPrice"
            step="0.5"
          />
        </label>
      </div>

      <fieldset>
        <legend data-tooltip="Filter repositories you want to support">Criteria</legend>
        <p>Enter criteria to target which repositories you want to support. Leave input empty if not apply.</p>

        <label for="tags"
          >Topics
          <input type="text" name="tags" v-model="tags" />
          <small>Separate topic by spaces</small>
        </label>
        <div class="grid">
          <label for="minStars"
            >Number of minimum stars
            <input type="number" name="minStars" v-model="minStars" min="1" :max="maxStars ?? null" />
          </label>
          <label for="minStars"
            >Number of maximum stars
            <input type="number" name="minStars" v-model="maxStars" :min="minStars ?? null" />
          </label>
        </div>
      </fieldset>

      <input type="submit" :aria-busy="String(loading)" value="Create campaign" />
      <small>You will asked to pay after the creation.</small>
    </form>
  </div>
</template>

<script setup>
// @ts-check
import { ref } from "vue";
import { createCampaign } from "../utils/campaigns";
import { useRouter } from "vue-router";
import { useToaster } from "../composition/useToaster";

const { showError, showSuccess } = useToaster();

const router = useRouter();

const tags = ref("");
const content = ref("ACME corp");
const amountPerDay = ref(1.0);
const minStars = ref(undefined);
const maxStars = ref(undefined);
const totalPrice = ref(10);
const loading = ref(false);

async function submit() {
  loading.value = true;
  const tagsArray = tags.value === "" ? [] : tags.value.split(" ");

  try {
    const { id } = await createCampaign({
      tags: tagsArray,
      amountPerDay: amountPerDay.value,
      content: content.value,
      totalPrice: totalPrice.value,
      minStars: minStars.value,
      maxStars: maxStars.value,
    });
    showSuccess("Campaign created");
    router.push({ name: "Campaign", params: { id } });
  } catch (e) {
    showError("Cannot create campaign");
    console.error(e);
  } finally {
    loading.value = false;
  }
}
</script>
