<style scoped>
label {
  text-align: right;
}
</style>
<template>
  <div>
    <label for="switch">
      sort by {{ sortByMoney ? "views" : "money" }}
      <input type="checkbox" id="switch" name="switch" role="switch" v-model="sortByMoney" />
    </label>
    <table>
      <thead>
        <tr>
          <th>repository</th>
          <th>number of {{ unit }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="repoSummary of sortedReposSummaries" :key="repoSummary.repository">
          <td>
            <a :href="repoSummary.repository" rel="noreferrer noopener">{{ formatGhName(repoSummary.repository) }}</a>
          </td>
          <td>
            <progress min="0" :max="max" :value="getValue(repoSummary)"></progress>
            <span v-if="sortByMoney">{{ formatMoney(repoSummary.totalPrice) }}</span>
            <span v-else>{{ repoSummary.totalViews }} views</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { defineProps, computed, ref } from "vue";
import { formatGhName, formatMoney } from "../utils/formatter";

const props = defineProps({
  reposSummaries: { type: Array, required: true },
  defaultSortByMoney: { type: Boolean, default: false },
});

const sortByMoney = ref(!!props.defaultSortByMoney);

function getValue(repoSummary) {
  return sortByMoney.value ? repoSummary.totalPrice : repoSummary.totalViews;
}

const max = computed(() => Math.max(...props.reposSummaries.map(getValue)));
const sortedReposSummaries = computed(() => [...props.reposSummaries].sort((a, b) => getValue(a) - getValue(b)));
const unit = computed(() => (sortByMoney.value ? "money" : "views"));
</script>
