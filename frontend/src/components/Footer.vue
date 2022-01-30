<template>
  <footer class="footer">
    <ul class="footer__links">
      <li>
        <router-link to="/about">About</router-link>
      </li>
    </ul>
  </footer>
</template>

<style>
.footer {
  margin-top: 1rem;
}

.footer__links {
  list-style: none;
  padding-left: 0;
  margin-top: 0;
  margin-bottom: 0;
  display: flex;
  justify-content: space-between;
}

.footer__links li {
  display: inline;
}

.footer a {
  font-weight: bold;
  color: #2c3e50;
}

.footer a.router-link-exact-active {
  color: #42b983;
}
</style>
