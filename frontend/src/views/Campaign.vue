<template>
  <div class="campaign">
    <h1 v-if="!campaign">Campaign {{ props.id }}</h1>
    <h1 v-if="campaign">
      Campaign <i>"{{ campaign.content }}"</i>
    </h1>
    <div v-if="campaign" :aria-busy="String(isLoading)">
      <p>
        This campaign have a budget of <strong>{{ formatMoney(campaign.amountPerDay) }} per day</strong> and this
        campaign is <strong>{{ activeText }}</strong
        >.
      </p>

      <div v-if="!campaign.paidAt">
        <p>⚠️ This campaign is not paid. You must paid</p>
        <PayCampaign :campaign="campaign" />
      </div>

      <div v-else>
        <h2>Summary of views</h2>
        <p>
          At this point, this campaign <strong>cost you {{ formatMoney(campaign.currentPrice) }}</strong> for
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
              <td>{{ formatMoney(viewsSummary.totalPrice) }}</td>
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
      </div>

      <CampaignButtonRemove :campaign="campaign" @change="fetchCampaign" />
      <button @click="fetchCampaign" class="secondary outline">reload</button>
    </div>
  </div>
</template>

<script setup>
// @ts-check
import { defineProps } from "vue";
import { formatMoney } from "../utils/formatter";
import { useCampaign } from "../composition/useCampaign";
import CampaignButtonRemove from "../components/CampaignButtonRemove.vue";
import PayCampaign from "../components/PayCampaign";
import { useStripeRedirect } from "../composition/useStripe";
const props = defineProps(["id"]);

useStripeRedirect();

const { campaign, isLoading, activeText, fetchCampaign } = useCampaign(props.id);
</script>
