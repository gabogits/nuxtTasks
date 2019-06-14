<template>
  <div class="container">
    <div>
      <logo/>
      <h1 class="title">nuxtProject</h1>
      <h2 class="subtitle">My majestic Nuxt.js project</h2>
      <div class="links">
        <a href="https://nuxtjs.org/" target="_blank" class="button--green">Documentation</a>
        <a href="https://github.com/nuxt/nuxt.js" target="_blank" class="button--grey">GitHub</a>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";

export default {
  components: {
    Logo
  },
  head: {
    title: "Esta es nuestra pagina de inicio",
    meta: [
      {
        hid: "description",
        name: "description",
        content: "Esta es la decripcion de mi pagina de inicio"
      }
    ]
  }
};
</script>
