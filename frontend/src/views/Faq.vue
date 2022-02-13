<template>
  <div class="">
    <h1>Frequently Asked Questions</h1>

    <h2>Global</h2>

    <details id="#formula" :open="isFormulaOpen">
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

    <h2>For supporter</h2>

    <details>
      <summary>What are criteria?</summary>
      <p></p>
      <ul>
        <li><a href="https://github.com/topics">Github Topics</a></li>
        <li>Number of stars</li>
      </ul>
    </details>
    <details>
      <summary>Can I suspend a campaign?</summary>
      <p>
        Yes, you can. You just need to hit "deactivate" on <router-link to="/campaigns">campaign list</router-link>.
      </p>
    </details>

    <h2>As a developer</h2>

    <details>
      <summary>How I receive my money?</summary>
      <p>TODO</p>
    </details>
    <details>
      <summary>How to include tag?</summary>
      <p>
        <router-link to="/badge/new">Create a badge</router-link> and put it into your <code>README.md</code> file on
        Github.
      </p>
    </details>
    <details>
      <summary>How to exclude some company to appear as sponsors?</summary>
      <p>You can't do it yet.</p>
    </details>

    <h2>Other</h2>

    <details>
      <summary>Who are you?</summary>
      <p>I'm <a href="https://rsseau.fr">Alexandre</a>. I'm a french software engineer passionate about Open-Source.</p>
    </details>
  </div>
</template>
<script setup>
import { formatMoney } from "../utils/formatter";
import { calculatePrice } from "../utils/price";
import { PRICE_PER_VIEW_PER_STAR } from "../constants/price";
import { computed } from "@vue/runtime-core";

const isFormulaOpen = computed(() => window.location.href.endsWith("formula"));

const starsExamples = [1000, 10000, 30000, 50000];
</script>
