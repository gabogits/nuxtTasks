import { db } from "@/plugins/firebase.js";

export const state = () => ({
    tareas: '',
    tarea: ''
})

export const mutations = {
    setTareas(state, payload) {
        state.tareas = payload;
    },
    setTarea(state, payload) {
        state.tareas.push(payload);
        console.log(state.tareas);
    },
    deleteTarea(state, payload) {
        const index = state.tareas.findIndex(item => item.id === payload.id);
        state.tareas.splice(index, 1); //va eliminar ese objeto cuyo propiedad id coincida con la del payload
    },
    updateTarea(state, payload) {
        const index = state.tareas.findIndex(item => item.id === payload.id);
        state.tareas[index].nombre = payload.nombre;
    },
    setTareaIndividual(state, payload) {
        state.tarea = payload;
    },
    /*
    setNombreTarea(state, payload){
      state.tarea.nombre = payload
    }
    podria llegar a ocuparse esto si hubiera errores
  }*/
}

export const actions = {
    nuxtServerInit({ commit }, { req }) { //de igual manera como el fetch tenemos el tema de los return
        //esta accion se ejecuta cuando iniciemos nuestra app
        return db.collection("tareas")
            .get()
            .then(query => {
                const tareas = [];
                query.forEach(element => {
                    let tarea = element.data();
                    tarea.id = element.id;
                    tareas.push(tarea);
                });
                return commit("setTareas", tareas); //tenemos que retornar la accion del commit para que efectivamente se
            })
            .catch(function(error) {
                console.log("Error getting documents:", error);
            });
    },
    async agregarTarea({ commit }, payload) {
        try {
            const doc = await db.collection('tareas').add({
                nombre: payload,
                fecha: new Date()
            })

            commit('setTarea', { nombre: payload, id: doc.id })
        } catch (error) {
            console.log(error)
        }
    },
    eliminarTarea({ commit }, payload) {
        db.collection("tareas").doc(payload.id).delete().then(function() {
            console.log("Document successfully deleted!");
            commit('deleteTarea', payload);
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    },
    editarTarea({ commit }, payload) {
        db.collection('tareas').doc(payload.id).update({
            nombre: payload.nombre
        }).then(() => {
            console.log("tarea editada");
            commit('updateTarea', payload);
            this.app.router.push('/vuex')
        }).catch(e => {
            console.log(e)
        })
    },

}