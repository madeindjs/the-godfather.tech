<template>
  <div class="campaign">
    <h1 v-if="!campaign">Campaign {{ props.id }}</h1>
    <h1 v-if="campaign">
      Campaign <i>"{{ campaign.content }}"</i>
    </h1>
    <div :aria-busy="String(loading)">
      <p>
        This campaign have a budget of <strong>{{ formatMoney(campaign.amountPerDay) }} per day</strong> and this
        campaign is <strong>{{ activeText }}</strong
        >.
      </p>

      <h2>Summary of views</h2>
      <p>
        At this point, this campaign <strong>cost you {{ formatMoney(campaign.totalAmount) }}</strong> for
        <i>{{ campaign.viewsCount }} views</i> since {{ campaign.createdAt }}.
      </p>
      <table>
        <thead>
          <tr>
            <th>date</th>
            <th>views</th>
            <th>price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="viewsSummary of campaign.viewsSummary" :key="viewsSummary.date">
            <td>{{ viewsSummary.date }}</td>
            <td>{{ viewsSummary.totalViews }}</td>
            <td>{{ formatMoney(viewsSummary.totalAmount) }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th>TOTAL</th>
            <th>{{ campaign.viewsCount }}</th>
            <th>{{ formatMoney(campaign.totalAmount) }}</th>
          </tr>
        </tfoot>
      </table>
      <CampaignButtonRemove :campaign="campaign" @change="fetchCampaign" />
      <button @click="fetchCampaign" class="secondary outline">reload</button>
    </div>
  </div>
</template>

<script setup>
// @ts-check
import { computed, defineProps, ref } from "vue";
import { getCampaign } from "../utils/campaigns";
import { formatMoney } from "../utils/formatter";
import CampaignButtonRemove from "../components/CampaignButtonRemove.vue";
const props = defineProps(["id"]);

const campaign = ref(undefined);
const loading = ref(false);

const activeText = computed(() => {
  if (!campaign.value) {
    return "?";
  }
  if (campaign.value.deactivateAt) {
    return "not active";
  }
  return "active";
});

async function fetchCampaign() {
  loading.value = true;
  campaign.value = await getCampaign(props.id);
  loading.value = false;
}

fetchCampaign();
</script>
