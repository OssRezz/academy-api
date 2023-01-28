<script>
export default { name: "MatriculasView" }

</script>

<template>
    <div class="container my-4">
        <div class="row d-flex align-items-center mb-4">
            <div class="col">
                <router-link class="btn btn-danger shadow-sm" :to="{ name: 'Matriculas' }">
                    <i class="fas fa-plus-square"></i> Atras
                </router-link>
            </div>
        </div>
        <div class="row my-5" v-if="matriculaLoading">
            <div class="col-12  col-lg-7 text-center">
                <div class="text-primary h3">Loading...</div>
            </div>
        </div>
        <div class="row" v-else>
            <div class="col-12  col-lg-7">
                <div class="card shadow-sm">
                    <div class="card-header  fs-5" style="font-weight: 500;">
                        {{ route.params.id ? 'Actualizar' : 'Crear' }} matricula
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="saveMatricula">
                            <div class="row g-3">
                                <div class="col-12">
                                    <div class="form-floating">
                                        <select name="rol_id" class="form-select" placeholder="estudiante"
                                            v-model="model.estudiante_id">
                                            <option disabled selected>Selecciona un area</option>
                                            <option v-for="estudiante in estudiantes" :key="estudiante.id"
                                                :value="estudiante.id">
                                                {{ estudiante.nombres + ' ' + estudiante.apellidos }}
                                            </option>
                                        </select>
                                        <label for="" class="form-label">Estudiante <b class="text-danger">*</b></label>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="form-floating">
                                        <input type="number" class="form-control" placeholder="Nombres" name="nombres"
                                            v-model="model.semestre">
                                        <label for="" class="form-label"># Semestre <b class="text-danger">*</b></label>
                                    </div>
                                </div>




                                <div class="col-12">
                                    <div class="d-grid">
                                        <button class="btn btn-danger">
                                            {{ route.params.id ? 'Actualizar' : 'Crear' }} matricula
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
const matriculaLoading = computed(() =>
    store.state.currentMatricula.loading
)
store.dispatch('getEstudiantes')
const estudiantes = computed(() =>
    store.state.estudiantes.data
)

let model = ref({
    id: "",
    estudiante_id: "",
    semestre: "",
    estado: "1",
});


watch(
    () => store.state.currentMatricula.data,
    (newVal, oldVal) => {
        model.value = {
            ...JSON.parse(JSON.stringify(newVal)),
            status: newVal.status !== "draft"
        }
    }
);

if (route.params.id) {
    store.dispatch('getMatricula', route.params.id);
}


function saveMatricula() {
    store.dispatch("saveMatricula", model.value).then((res) => {
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
            name: "MatriculasView",
            params: { id: res.data.id }
        });
        return Swal.fire({
            title: res.message,
            text: `${res.data.estudiante.nombres} ${res.data.estudiante.apellidos}`,
            icon: 'success',
            confirmButtonColor: 'rgb(223, 71, 89)',
        });
    })
}
</script>

