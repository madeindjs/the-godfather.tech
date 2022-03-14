<style scoped>
.header {
  display: flex;
}

.header h1 {
  flex-grow: 1;
}

.header__reload {
  cursor: pointer;
}
</style>
<template>
  <div class="campaign">
    <div class="header">
      <h1 v-if="!campaign">Campaign {{ props.id }}</h1>
      <h1 v-if="campaign">
        Campaign <i>"{{ campaign.content }}"</i>
      </h1>
      <span @click="fetchCampaign" class="header__reload" :aria-busy="isLoading">reload</span>
    </div>

    <div v-if="campaign" :aria-busy="String(isLoading)">
      <div v-if="!campaign.paidAt">
        <p>⚠️ This campaign is not paid. You must paid</p>
        <PayCampaign :campaign="campaign" />
      </div>

      <div v-else>
        <p>Criteria of this campaign</p>

        <ul>
          <li>
            <strong>topics:</strong>
            <ul v-if="campaign.topics.length">
              <li v-for="topic of campaign.topics" :key="topic">{{ topic }}</li>
            </ul>
            <span v-else> none</span>
          </li>
        </ul>

        <p>
          Since {{ formatDateTime(campaign.createdAt) }}, this campaign
          <strong
            >reach {{ formatMoney(campaign.currentPrice) }} over his budget of
            {{ formatMoney(campaign.totalPrice) }}</strong
          >
          (max {{ formatMoney(campaign.amountPerDay) }} per day).
        </p>

        <CampaignProgress :campaign="campaign" />

        <h2>Summary of views</h2>
        <h3>Per days</h3>
        <!-- <p>
          At this point, this campaign <strong>cost you {{ formatMoney(campaign.currentPrice) }}</strong> for
          <i>{{ campaign.viewsCount }} views</i>.
        </p> -->
        <table>
          <thead>
            <tr>
              <th>date</th>
              <th>number of views</th>
              <th>price</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="viewsSummary of campaign.viewsSummaries" :key="viewsSummary.date">
              <td>{{ formatDateTime(viewsSummary.date) }}</td>
              <td>{{ viewsSummary.totalViews }}</td>
              <td>{{ formatMoney(viewsSummary.totalPrice) }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th>TOTAL</th>
              <th>{{ campaign.viewsCount }}</th>
              <th>{{ formatMoney(campaign.currentPrice) }}</th>
            </tr>
          </tfoot>
        </table>

        <h3>Per repositories</h3>
        <ReposSummaries :reposSummaries="campaign.reposSummaries" />
      </div>

      <CampaignButtonRemove :campaign="campaign" @change="fetchCampaign" />
    </div>
  </div>
</template>

<script setup>
// @ts-check
import { defineProps } from "vue";
import { formatMoney, formatDateTime } from "../utils/formatter";
import { useCampaign } from "../composition/useCampaign";
import CampaignButtonRemove from "../components/CampaignButtonRemove.vue";
import CampaignProgress from "../components/CampaignProgress.vue";
import ReposSummaries from "../components/ReposSummaries.vue";
import PayCampaign from "../components/PayCampaign";
import { useStripeRedirect } from "../composition/useStripe";
const props = defineProps(["id"]);

useStripeRedirect();

const { campaign, isLoading, fetchCampaign } = useCampaign(props.id);
</script>
