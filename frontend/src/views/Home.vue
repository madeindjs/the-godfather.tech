<template>
  <div class="home">
    <h1>the-godfather.tech</h1>

    <div class="cover">
      <p>Support Open Source projects using badge.</p>
      <div>
        <img :src="badgeSrc" alt="Badge example" />
      </div>
    </div>

    <h2>How it works</h2>

    <div class="grid">
      <article id="how-to-developer">
        <header>👨‍💻️ I'm a developer</header>

        <ol class="steps">
          <li>
            <router-link to="/badges/new">Create a badge</router-link> and put it into your <code>README.md</code> on
            Github.
          </li>
          <li>Wait some visitors on your Github project. The badge will display sponsors name</li>
          <li>Earn money per visits.</li>
        </ol>
      </article>

      <article id="how-to-daddy">
        <header>💰️ I'm a sponsor</header>
        <ol class="steps">
          <li><SigninWithGithub /></li>
          <li>
            <router-link to="/campaigns/new">Create a campaign</router-link> with a fixed amount per day and criteria
            for open sources projects you want to support.
          </li>
          <li>Your brand will be displayed on some badge on different projects</li>
        </ol>
      </article>
    </div>

    <h2>Pricing</h2>

    <p>
      The amount per visit is defined in our <router-link to="/faq#formula">simple formula</router-link>. Try it
      yourself:
    </p>
    <EstimatePrice />

    <h2>You already supported...</h2>

    <TotalReposSummaries :defaultSortByMoney="true" />
  </div>
</template>

<script setup>
import { computed } from "@vue/runtime-core";
import SigninWithGithub from "../components/SigninWithGithub.vue";
import TotalReposSummaries from "../components/TotalReposSummaries.vue";
import EstimatePrice from "../components/EstimatePrice.vue";
import { PROJECT_API_URL } from "../constants/project";

const badgeSrc = computed(
  () => `${PROJECT_API_URL}/badge?repository=https%3A%2F%2Fgithub.com%2Fmadeindjs%2Fapi_on_rails&style=flat&version=1`
);
</script>

<style scoped>
h1 {
  display: none;
}
h2 {
  margin-bottom: 1rem;
  text-align: center;
}

.cover {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 50vh;
}
.cover p {
  font-size: 2rem;
  text-align: center;
}
.cover img {
  height: 2rem;
}

.badge-container {
  text-align: center;
}
.badge-example {
  height: 2rem;
}

.steps ol {
  /* padding-left: 2rem; */
  /* display: flex; */
  counter-reset: steps;
  display: grid;
  grid-column: 1fr;
}
.steps li {
  counter-increment: steps;
  list-style: none;
  text-align: center;
  /* display: block; */
}
.steps li::before {
  content: "Step " counter(steps);
  list-style-position: inside;
  font-size: 1.2rem;
  font-weight: 700;
  display: block;
  color: lightblue;
}
.buttons {
  display: flex;
  column-gap: 1rem;
  justify-content: center;
}
/* .steps li::marker {
  display: block;
} */
</style>
