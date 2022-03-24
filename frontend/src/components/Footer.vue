<template>
  <footer class="footer">
    <section class="details">
      <p>the-godfather.tech, {{ year }} - v{{ version }}</p>
      <p>
        This project is fully open source under the
        <a href="https://www.gnu.org/licenses/gpl-3.0.txt">GNU GPL3</a> license.
        <a href="https://github.com/madeindjs/the-godfather.tech">Fork me on Github</a>
      </p>
    </section>
    <section>
      <p>Site</p>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/campaigns">Campaigns</router-link></li>
        <li>
          <router-link to="/badges/new">Add image tag</router-link>
        </li>
      </ul>
    </section>
    <section>
      <p>Help</p>
      <ul>
        <li>
          <router-link to="/about">About</router-link>
        </li>
        <li>
          <router-link to="/faq">FAQ</router-link>
        </li>
      </ul>
    </section>
  </footer>
</template>

<script setup>
import { VERSION } from "../constants/project";

const year = new Date().getFullYear();

const version = VERSION;
</script>

<style scoped>
.footer {
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  row-gap: 2rem;
  justify-content: space-around;
  text-align: center;
}

.footer section {
  flex-basis: max(10rem, 25%);
  /* flex-grow: 1; */
  margin-bottom: 0;
}

.footer p {
  padding-bottom: 0rem;
  margin-bottom: 0.5rem;
}
.footer ul {
  padding-left: 0;
}

.footer ul li {
  list-style: none;
}

.footer a {
  font-weight: bold;
  color: #2c3e50;
}

.footer a.router-link-exact-active {
  color: #42b983;
}

.footer .details p {
  font-size: 0.8rem;
  text-align: justify;
}
</style>
