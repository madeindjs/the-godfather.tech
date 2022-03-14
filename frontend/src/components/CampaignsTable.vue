<template>
  <div :aria-busy="String(loading)">
    <table v-if="haveCampaigns">
      <thead>
        <tr>
          <th>Content</th>
          <th>target</th>
          <th>actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(campaign, index) of campaigns" :key="index">
          <td>
            <router-link
              v-if="!campaign.paidAt"
              aria-label="This campaign was not paid yet."
              data-tooltip="This campaign was not paid yet."
              :to="'/campaign/' + campaign.id"
            >
              ⚠️
            </router-link>

            {{ campaign.content }}
          </td>
          <td>
            {{ formatMoney(campaign.currentPrice) }} / {{ formatMoney(campaign.totalPrice) }}
            <i>({{ campaign.viewsCount }} views)</i>
            <CampaignProgress :campaign="campaign" />
          </td>
          <td>
            <router-link :to="'/campaign/' + campaign.id">view</router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>You don't have campaigns yet.</p>
  </div>
</template>
<script setup>
// @ts-check
import { ref, computed } from "vue";
import { getCampaigns } from "../utils/campaigns";
import CampaignProgress from "./CampaignProgress.vue";
import { useToaster } from "../composition/useToaster";

import { formatMoney } from "../utils/formatter";

const campaigns = ref([]);
const loading = ref(false);

const { showError } = useToaster();

const haveCampaigns = computed(() => !!campaigns?.value?.length);

const reloadCampaign = async () => {
  loading.value = true;
  try {
    campaigns.value = await getCampaigns();
  } catch {
    showError("Cannot load campaigns");
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
