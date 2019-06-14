<template>
  <div class="container">
    <form @submit.prevent="agregarTarea(tarea)">
      <input type="text" class="form-control mb-2" v-model="tarea" />
      <button type="submit">Agregar</button>
    </form>
    <ul>
      <li v-for="(item, index) in tareas" :key="index">
        {{item.id}} - {{item.nombre}}
        <b-button class="btn-sm btn-warning"  :to="`/vuex/${item.id}`">Editar</b-button>
        <b-button class="btn-sm btn-danger" @click="eliminarTarea(item)">Eliminar</b-button>
        <hr>
      </li>
    </ul>
  </div>
</template>

<script>
import { db } from "@/plugins/firebase.js";
import { mapState, mapActions } from "vuex";

export default {
  data () {
    return {
      tarea: '',
    }
  },
  computed: {
    ...mapState(["tareas"])
  },
  methods: {
     ...mapActions(['agregarTarea', 'eliminarTarea'])
  },
  //fetch({ store }) {
  //  //este fetch se va cargar antes que todo nuestro template
  //  return db
  //    .collection("tareas")
  //    .get()
  //    .then(query => {
  //      const tareas = [];
  //      query.forEach(element => {
  //        tareas.push(element.data());
  //      });
  //      return store.commit("setTareas", tareas); //tenemos que retornar la accion del commit para que efectivamente se
  //    })
  //    .catch(function(error) {
  //      console.log("Error getting documents:", error);
  //    });
  //}
};
</script>

