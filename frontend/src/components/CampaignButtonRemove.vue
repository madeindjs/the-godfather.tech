<template>
  <div>
    <a
      v-if="props.campaign.viewsCount == 0"
      href="#"
      @click.prevent="() => remove()"
      role="button"
      class="secondary outline"
      >remove</a
    >
    <a
      v-if="props.campaign.viewsCount != 0 && !props.campaign.deactivateAt"
      href="#"
      @click.prevent="() => deactivate()"
      role="button"
      class="secondary outline"
      >deactivate</a
    >
    <a
      v-if="props.campaign.viewsCount != 0 && props.campaign.deactivateAt"
      href="#"
      @click.prevent="() => deactivate()"
      role="button"
      class="secondary outline"
      >activate</a
    >
  </div>
</template>
<script setup>
// @ts-check
import { defineProps, defineEmits } from "vue";
import { toastStore } from "../store/ToastStore";
import { removeCampaign, deactivateCampaign } from "../utils/campaigns";

const props = defineProps(["campaign"]);
const emit = defineEmits(["change"]);

// const campaign = props.campaign;

async function remove() {
  await removeCampaign(props.campaign.id);
  toastStore.display("Campaign removed", "success");
  emit("change");
}

async function deactivate() {
  try {
    await deactivateCampaign(props.campaign.id);

    const message = props.campaign.deactivateAt ? "Campaign activated" : "Campaign deactivated";

    toastStore.display(message, "success");
  } catch {
    toastStore.display("Cannot update campaign", "warn");
  }

  emit("change");
}
</script>
