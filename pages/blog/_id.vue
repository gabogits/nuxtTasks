<template>
  <div class="container">
    <div class="card my-2">
      <div class="card-body">
        <h1>{{articulo.title}}</h1>
        <p class="small">{{articulo.id}} {{articulo.nombreAutor}}</p>
        <p>{{articulo.body}}</p>
        <nuxt-link :to="`/blog`" class="btn btn-primary">Atras</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script >
import axios from "axios";
export default {
  data() {
    return {
      //articulo: [],
      //user: []
    };
  },
  /*
  async created() {
    try {
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${this.$route.params.id}`
      );
      this.articulo = res.data;
      const resUser = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${res.data.id}`
      );

      this.user = resUser.data;
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  },
*/
  async asyncData({
    //se supone que esto hacia que no se pintara nada en la vista hasta que regresaran las consultas
    isDev,
    route,
    store,
    env,
    params,
    query,
    req,
    res,
    redirect,
    error
  }) {
    try {
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${params.id}`
      );
      const articulo = res.data;

      const resUser = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${res.data.id}`
      );

      articulo.nombreAutor = resUser.data.name;
      console.log({ articulo });
      return { articulo }; //retorma un objeto
    } catch (error) {}
  }
};
</script>