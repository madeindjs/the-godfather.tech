<template>
  <div class="campaign">
    <h1>My campaigns</h1>
    <p>Here you can find a list of all your campaigns to support specifics Open-Source projects:</p>
    <CampaignsTable />

    <h2>Create a new campaign</h2>
    <CampaignForm />
  </div>
</template>

<script setup>
import CampaignsTable from "../components/CampaignsTable.vue";
import CampaignForm from "../components/CampaignForm.vue";
</script>
