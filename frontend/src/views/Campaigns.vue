<template>
  <div class="campaign">
    <h1>My campaigns</h1>
    <p>Here you can find a list of all your campaigns to support specifics Open-Source projects:</p>
    <CampaignsTable />
    <p class="buttons">
      <router-link to="/campaigns/new" role="button">Create a campaign</router-link>
    </p>
  </div>
</template>

<script setup>
import CampaignsTable from "../components/CampaignsTable.vue";
</script>

<style scoped>
.buttons {
  text-align: center;
}
</style>
