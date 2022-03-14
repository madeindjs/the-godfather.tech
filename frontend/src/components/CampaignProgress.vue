<template>
  <progress min="0" :value="props.campaign.currentPrice" :max="props.campaign.totalPrice"></progress>
</template>
<script setup>
// @ts-check
import { defineProps } from "vue";

const props = defineProps({ campaign: { type: Object, required: true } });
</script>
