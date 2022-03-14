<template>
  <ReposSummaries
    v-if="reposSummaries"
    :reposSummaries="reposSummaries"
    :defaultSortByMoney="props.defaultSortByMoney"
    :aria-busy="isLoading"
  />
</template>
<script setup>
// @ts-check
import { useReposSummary } from "../composition/useViews";
import ReposSummaries from "./ReposSummaries.vue";
import { defineProps } from "vue";

const props = defineProps({
  defaultSortByMoney: { type: Boolean, default: false },
});

const { isLoading, reposSummaries } = useReposSummary();
</script>
