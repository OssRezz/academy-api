<script>
export default { name: "ClasesView" }

</script>

<template>
    <div class="container my-4">
        <div class="row d-flex align-items-center mb-4">
            <div class="col">
                <router-link class="btn btn-danger shadow-sm" :to="{ name: 'Clases' }">
                    <i class="fas fa-plus-square"></i> Atras
                </router-link>
            </div>
        </div>
        <div class="row my-5" v-if="claseLoading">
            <div class="col-12  col-lg-7 text-center">
                <div class="text-primary h3">Loading...</div>
            </div>
        </div>
        <div class="row" v-else>
            <div class="col-12  col-lg-7">
                <div class="card shadow-sm">
                    <div class="card-header  fs-5" style="font-weight: 500;">
                        {{ route.params.id ? 'Actualizar' : 'Crear' }} clase
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="saveClase">
                            <div class="row g-3">
                                <div class="col-12">
                                    <div class="form-floating">
                                        <select name="rol_id" class="form-select" placeholder="estudiante"
                                            v-model="model.profesor_id">
                                            <option disabled selected>Selecciona un area</option>
                                            <option v-for="profesor in profesores" :key="profesor.id"
                                                :value="profesor.id">
                                                {{ profesor.nombres + ' ' + profesor.apellidos }}
                                            </option>
                                        </select>
                                        <label for="" class="form-label">Profesor <b class="text-danger">*</b></label>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="form-floating">
                                        <select name="rol_id" class="form-select" placeholder="estudiante"
                                            v-model="model.asignatura_id">
                                            <option disabled selected>Selecciona un area</option>
                                            <option v-for="asignatura in asignaturas" :key="asignatura.id"
                                                :value="asignatura.id">
                                                {{ asignatura.nombre }}
                                            </option>
                                        </select>
                                        <label for="" class="form-label">Asignatura <b class="text-danger">*</b></label>
                                    </div>
                                </div>
                                <div class="col-12 col-lg-6">
                                    <div class="form-floating">
                                        <input type="time" class="form-control" placeholder="Nombres" name="nombres"
                                            v-model="model.hora_inicio">
                                        <label for="" class="form-label">Hora inciio <b
                                                class="text-danger">*</b></label>
                                    </div>
                                </div>
                                <div class="col-12 col-lg-6">
                                    <div class="form-floating">
                                        <input type="time" class="form-control" placeholder="Nombres" name="nombres"
                                            v-model="model.hora_fin">
                                        <label for="" class="form-label">Hora fin <b class="text-danger">*</b></label>
                                    </div>
                                </div>



                                <div class="col-12">
                                    <div class="d-grid">
                                        <button class="btn btn-danger">
                                            {{ route.params.id ? 'Actualizar' : 'Crear' }} clase
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import store from '../../store';
import { ref, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Swal from 'sweetalert2'

const route = useRoute();
const router = useRouter();
const claseLoading = computed(() =>
    store.state.currentClase.loading
)
store.dispatch('getProfesores')
store.dispatch('getAsignaturas')
const profesores = computed(() =>
    store.state.profesores.data
)
const asignaturas = computed(() =>
    store.state.asignaturas.data
)
let model = ref({
    id: "",
    asignatura_id: "",
    profesor_id: "",
    hora_inicio: "",
    hora_fin: "",
    estado: "1",
});


watch(
    () => store.state.currentClase.data,
    (newVal, oldVal) => {
        model.value = {
            ...JSON.parse(JSON.stringify(newVal)),
            status: newVal.status !== "draft"
        }
    }
);

if (route.params.id) {
    store.dispatch('getClase', route.params.id);
}


function saveClase() {
    store.dispatch("saveClase", model.value).then((res) => {
        console.log(res)
        if (res.status !== 200 || res.status === undefined) {
            let html = "";
            Object.values(res.data).forEach(error => {
                html += `<li class="list-group-item"><small>${error}</small></li>`;

            });
            html = res.status === 204 ? '' : html;
            return Swal.fire({
                title: res.message,
                html: `<ul class="list-group list-group-flush">${html}</ul>`,
                icon: 'warning',
                confirmButtonColor: 'rgb(223, 71, 89)',
            });
        }
        router.push({
            name: "ClasesView",
            params: { id: res.data.id }
        });
        return Swal.fire({
            title: res.message,
            text: `${res.data.asignatura.nombre}, de: ${res.data.hora_inicio}, hasta: ${res.data.hora_fin}`,
            icon: 'success',
            confirmButtonColor: 'rgb(223, 71, 89)',
        });
    })
}
</script>

