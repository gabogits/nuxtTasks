<template>
<div class="container mb-5">
    <h2>Tarea nombre</h2>
    <form @submit.prevent="editarTarea(tarea)">
      
        {{tarea}}
        <input type="text" class="form-control mb-2"  v-model="tarea.nombre" />
        <b-button class="btn-warning" type="submit">Editar</b-button>
    </form>

    
   
</div>
</template>
<script >
import { db } from "@/plugins/firebase.js";
import { mapState, mapActions } from "vuex";
export default {
  
 fetch({ store, params }) { //fetch ya llama a la tienda y a los params como parametros desde un inicio
    return db.collection("tareas").doc(params.id).get().then(doc => {
        if(doc.exists){
            let tarea = doc.data(); 
            //el documento (doc) de la base de datos de firebase es un objeto con muchos objetos y propiedades dentro,
            //entre ellos nombre y fecha -que lo traemos con data()-, pero el id esta aparte, por eso hacemos el doc.id
            console.log(tarea)
            tarea.id = doc.id;
             console.log(tarea)
            return store.commit('setTareaIndividual', tarea)
        }
      })
      .catch(function(error) {
        console.log("Error getting documents:", error);
      });
  },
  computed: {

      //vamos a hacer un get y un setter  por que al relacionar con el input vamos estar cmbiando un valor de nuestra tienda
      //osea de tarea
      //cuando trabajamos con propiedades computadas directamente en nuestra tienda posiblemenete nos pedira el get
      //osea obtener todo ese objeto completo que queremos modificar
    tarea: {
        get(){
            return {
                nombre: this.$store.state.tarea.nombre,
                id: this.$store.state.tarea.id
            }
        },
        /*
        set(valor){
        return this.$store.commit('setNombreTarea', valor)
        podria llegar a ocuparse esto si hubiera errores
      }*/

        
    }
  },
  methods: {
      ...mapActions(['editarTarea']),
  }
 


};
</script>