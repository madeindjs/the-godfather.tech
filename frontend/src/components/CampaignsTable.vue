<template>
  <table :aria-busy="String(loading)">
    <thead>
      <tr>
        <th>Content</th>
        <th>tags</th>
        <th>amountPerDay</th>
        <th>viewsCount</th>
        <th>actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(campaign, index) of campaigns" :key="index">
        <td>{{ campaign.content }}</td>
        <td>
          <span v-for="tag of campaign.tags" :key="tag" class="tag">{{ tag }}</span>
        </td>
        <td>{{ formatMoney(campaign.amountPerDay) }}</td>
        <td>{{ campaign.viewsCount }}</td>
        <td>
          <a
            v-if="campaign.viewsCount == 0"
            href="#"
            @click.prevent="() => remove(campaign.id)"
            role="button"
            class="secondary outline"
            >remove</a
          >
          <a
            v-if="campaign.viewsCount != 0 && !campaign.deactivateAt"
            href="#"
            @click.prevent="() => deactivate(campaign)"
            role="button"
            class="secondary outline"
            >deactivate</a
          >
          <a
            v-if="campaign.viewsCount != 0 && campaign.deactivateAt"
            href="#"
            @click.prevent="() => deactivate(campaign)"
            role="button"
            class="secondary outline"
            >activate</a
          >
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script setup>
// @ts-check
import { ref } from "vue";
import { getCampaigns, removeCampaign, deactivateCampaign } from "../utils/campaigns";
import { toastStore } from "../store/ToastStore";

import { moneyFormatter } from "../utils/formatter";

const formatMoney = (value) => moneyFormatter.format(value);

const campaigns = ref([]);
const loading = ref(false);

const reloadCampaign = async () => {
  loading.value = true;
  try {
    campaigns.value = await getCampaigns();
  } catch {
    toastStore.display("Cannot load campaigns", "error");
  } finally {
    loading.value = false;
  }
};

async function remove(id) {
  await removeCampaign(id);
  toastStore.display("Campaign removed", "success");
  await reloadCampaign();
}

async function deactivate(campaign) {
  try {
    await deactivateCampaign(campaign.id);

    const message = campaign.deactivateAt ? "Campaign activated" : "Campaign deactivated";

    toastStore.display(message, "success");
  } catch {
    toastStore.display("Cannot update campaign", "warn");
  }

  await reloadCampaign();
}

reloadCampaign();
</script>

<style scoped>
.tag {
  padding: 0.4rem;
  border-radius: 5px;
  background-color: orangered;
  /* margin-left: 0.4rem; */
  margin-right: 0.4rem;
}
</style>
