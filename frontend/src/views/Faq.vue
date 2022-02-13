<template>
  <div class="">
    <h1>Frequently Asked Questions</h1>
    <details open id="#formula">
      <summary>How views are billed?</summary>
      <p>
        The price of each views is <strong>{{ PRICE_PER_VIEW_PER_STAR * 100 }} cents per star and per view</strong>.
      </p>
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
            <td>{{ formatMoney(calculatePrice(starsExample, 1)) }}</td>
            <td>
              {{ formatMoney(calculatePrice(starsExample, 50)) }}<br /><small
                >(<abbr title="including">incl</abbr> tax
                {{ formatMoney(calculatePrice(starsExample, 50) * 0.15) }})</small
              >
            </td>
          </tr>
        </tbody>
      </table>
    </details>

    <details>
      <summary>What are criteria?</summary>
      <p></p>
      <ul>
        <li><a href="https://github.com/topics">Github Topics</a></li>
        <li>Number of stars</li>
      </ul>
    </details>
  </div>
</template>
<script setup>
import { formatMoney } from "../utils/formatter";
import { calculatePrice } from "../utils/price";
import { PRICE_PER_VIEW_PER_STAR } from "../constants/price";

const starsExamples = [1000, 10000, 30000, 50000];
</script>
