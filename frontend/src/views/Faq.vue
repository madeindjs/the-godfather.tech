<template>
  <div class="">
    <h1>Frequently Asked Questions</h1>
    <details open>
      <summary>How views are billed?</summary>
      <p>The price of each views is <strong>0,001 cents per star and per view</strong>.</p>
      <p>Bellow some examples:</p>
      <table>
        <thead>
          <tr>
            <th>number of stars</th>
            <th>price per view</th>
            <th>price for 50 views</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="starsExample of starsExamples" :key="starsExample">
            <td>{{ starsExample }}</td>
            <td>{{ formatMoney(starsExample * 0.00001) }}</td>
            <td>
              {{ formatMoney(starsExample * 0.00001 * 50) }}<br /><small
                >(<abbr title="including">incl</abbr> tax {{ formatMoney(starsExample * 0.00001 * 50 * 0.15) }})</small
              >
            </td>
          </tr>
        </tbody>
      </table>
    </details>

    <details>
      <summary>Collapsible elements 2</summary>
      <ul>
        <li>…</li>
        <li>…</li>
      </ul>
    </details>
  </div>
</template>
<script setup>
import { formatMoney } from "../utils/formatter";

const starsExamples = [1000, 10000, 30000, 50000];
</script>
