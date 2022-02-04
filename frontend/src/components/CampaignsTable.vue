<template>
  <table :aria-busy="String(loading)">
    <thead>
      <tr>
        <th>Content</th>
        <th>tags</th>
        <th>amountPerDay</th>
        <th>actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(campaign, index) of campaigns" :key="index">
        <td>{{ campaign.content }}</td>
        <td>
          <span v-for="tag of campaign.tags" :key="tag" class="tag">{{ tag }}</span>
        </td>
        <td>{{ campaign.amountPerDay }}</td>
        <td>
          <a href="#" @click.prevent="() => remove(campaign.id)" role="button" class="secondary outline">remove</a>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script setup>
// @ts-check
import { ref } from "vue";
import { getCampaigns, removeCampaign } from "../utils/campaigns";
import { toastStore } from "../store/ToastStore";

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
