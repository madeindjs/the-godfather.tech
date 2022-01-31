<template>
  <div class="home">
    <h1>Daddy Open Source</h1>
    <p>Support Open Source projects</p>

    <SigninWithGithub />

    <h2>You are a project owner</h2>

    <p></p>

    <ol>
      <li>
        You <router-link to="/image/create">create an image tag</router-link> and put it into your
        <code>README.md</code> file on Github.
      </li>
      <li>a visitor load the <code>README.md</code></li>
      <li>we generate a badge with a sponsor who want to sponsorise a project corresponding to his criteria</li>
      <li>we give you the corresponding amount defined per visit</li>
    </ol>

    <p>That's it.</p>

    <h2>You are a supporter</h2>

    <ol>
      <li>You define a campaign</li>
      <li>TODO</li>
    </ol>
  </div>
</template>

<script setup>
import SigninWithGithub from "../components/SigninWithGithub.vue";
</script>
