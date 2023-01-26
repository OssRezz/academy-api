
<script>
export default { name: "Estudiantes" }

</script>

<template>
    <div class="container my-4">
        <div class="row d-flex align-items-center mb-4">
            <div class="col">
                <router-link class="btn btn-danger shadow-sm" :to="{ name: 'EstudiantesCreate' }">
                    <i class="fas fa-plus-square"></i> Crear estudiante
                </router-link>
            </div>
        </div>
        <div class="row my-5" v-if="estudiantesLoading">
            <div class="col-12 text-center">
                <div class="text-primary h3">Loading...</div>
            </div>
        </div>
        <div class="row" v-else>
            <div class="col-12">
                <div class="card shadow-sm">
                    <div class="card-header  fs-5" style="font-weight: 500;">
                        Lista de estudiantes
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover table-bordered" style="width: 100%;">
                                <thead>
                                    <tr>
                                        <th class="text-start">Documento</th>
                                        <th class="text-start">Nombres</th>
                                        <th class="text-end">Telefono</th>
                                        <th class="text-start">Email</th>
                                        <th class="text-start">Direccion</th>
                                        <th class="text-start">Ciudad</th>
                                        <th class="text-center">Accion</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="estudiante in estudiantes" :key="estudiante.id">
                                        <td class="text-start">
                                            {{ estudiante.documento }}
                                        </td>
                                        <td class="text-start">
                                            {{ estudiante.nombres + ' ' + estudiante.apellidos }}
                                        </td>
                                        <td class="text-end">
                                            {{ estudiante.telefono }}
                                        </td>
                                        <td class="text-start">
                                            {{ estudiante.email }}
                                        </td>
                                        <td class="text-start">
                                            {{ estudiante.direccion }}
                                        </td>
                                        <td class="text-start">
                                            {{ estudiante.departamento + ' ' + estudiante.ciudad }}
                                        </td>
                                        <td class="text-center">
                                            <router-link class=" btn btn-danger btn-sm"
                                                :to="{ name: 'EstudiantesUpdate', params: { id: estudiante.id } }">Editar
                                            </router-link>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import store from '../../store';
import { computed } from 'vue';

// const estudiantes = [];
const estudiantes = computed(() => store.state.estudiantes.data);
const estudiantesLoading = computed(() =>
    store.state.estudiantes.loading
)

store.dispatch('getEstudiantes')

</script>



