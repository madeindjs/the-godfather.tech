<template>
  <footer class="footer">
    <section>
      <p>Site</p>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/campaigns">Campaigns</router-link></li>
        <li>
          <router-link to="/badge/new">Add image tag</router-link>
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

<style scoped>
.footer {
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  text-align: center;
}

.footer section {
  flex-basis: 10rem;
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
</style>
