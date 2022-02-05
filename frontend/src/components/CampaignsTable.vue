<template>
  <table :aria-busy="String(loading)">
    <thead>
      <tr>
        <th>Content</th>
        <th>tags</th>
        <th>amountPerDay</th>
        <th>Bill</th>
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
        <td>
          {{ formatMoney(campaign.totalAmount) }}<br /><i>({{ campaign.viewsCount }} views)</i>
        </td>
        <td>
          <router-link role="button" :to="'/campaign/' + campaign.id">view</router-link>
          <CampaignButtonRemove :campaign="campaign" @change="reloadCampaign" />
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script setup>
// @ts-check
import { ref } from "vue";
import { getCampaigns } from "../utils/campaigns";
import { toastStore } from "../store/ToastStore";
import CampaignButtonRemove from "./CampaignButtonRemove.vue";

import { formatMoney } from "../utils/formatter";

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
