<template>
  <div class="home">
    <h1>the-godfather.tech</h1>
    <p>
      Support Open Source projects using badge like this one: 👉️
      <img :src="badgeSrc" alt="Tag example" />
    </p>
    <div class="tag-example"></div>

    <p class="buttons">
      <a href="#how-to-developer" role="button" class="outline">👨‍💻️ I'm a developer</a>
      <a href="#how-to-daddy" role="button" class="outline">💰️ I want to support open source projects</a>
    </p>

    <article id="how-to-developer">
      <header>👨‍💻️ I'm a developer</header>

      <p>You simply need to add a badge on your repository:</p>

      <ol class="steps">
        <li>
          <router-link to="/badge/new">Create a badge</router-link> and put it into your <code>README.md</code> file on
          Github.
        </li>
        <li>
          Wait some visitors on your Github project. The badge will simply display sponsors name
          <i>(example: <img :src="badgeSrc" alt="Tag example" />)</i>
        </li>
        <li>
          Earn money per visits. The amount per visit is defined in our
          <router-link to="/faq#formula">simple formula</router-link>
        </li>
      </ol>
    </article>

    <article id="how-to-daddy">
      <header>💰️ I'm a sponsor</header>
      <ol class="steps">
        <li><SigninWithGithub /></li>
        <li>
          <router-link to="/campaigns/new">Create a campaign</router-link> with a fixed amount per day and criteria for
          open sources projects you want to support.
        </li>
        <li>Your brand will be displayed on some badge on different projects</li>
      </ol>
    </article>

    <h2>You already supported...</h2>

    <TotalReposSummaries :defaultSortByMoney="true" />
  </div>
</template>

<script setup>
import { computed } from "@vue/runtime-core";
import SigninWithGithub from "../components/SigninWithGithub.vue";
import TotalReposSummaries from "../components/TotalReposSummaries.vue";
import { PROJECT_API_URL } from "../constants/project";

const badgeSrc = computed(
  () => `${PROJECT_API_URL}/badge?repository=https%3A%2F%2Fgithub.com%2Fmadeindjs%2Fapi_on_rails&style=flat&version=1`
);
</script>

<style scoped>
h1 {
  display: none;
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
.tag-example {
  padding: 1rem;
  text-align: center;
  font-size: 3rem;
}
/* .steps li::marker {
  display: block;
} */
</style>
