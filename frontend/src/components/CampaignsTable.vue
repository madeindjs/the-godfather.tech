<template>
  <div :aria-busy="String(loading)">
    <table v-if="haveCampaigns">
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
            <span v-for="tag of campaign.topics" :key="tag" class="tag">{{ tag }}</span>
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
    <p v-else>You don't have campaigns yet.</p>
  </div>
</template>
<script setup>
// @ts-check
import { ref, computed } from "vue";
import { getCampaigns } from "../utils/campaigns";
import CampaignButtonRemove from "./CampaignButtonRemove.vue";
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
