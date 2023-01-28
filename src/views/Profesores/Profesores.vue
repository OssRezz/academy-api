
<script>
export default { name: "Profesores" }

</script>

<template>
    <div class="container my-4">
        <div class="row d-flex align-items-center mb-4">
            <div class="col">
                <router-link class="btn btn-danger shadow-sm" :to="{ name: 'ProfesoresCreate' }">
                    <i class="fas fa-plus-square"></i> Crear profesor
                </router-link>
            </div>
        </div>
        <div class="row my-5" v-if="profesoresLoading">
            <div class="col-12 text-center">
                <div class="text-primary h3">Loading...</div>
            </div>
        </div>
        <div class="row" v-else>
            <div class="col-12">
                <div class="card shadow-sm">
                    <div class="card-header  fs-5" style="font-weight: 500;">
                        Lista de profesores
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
                                    <tr v-for="profesor in profesores" :key="profesor.id">
                                        <td class="text-start">
                                            {{ profesor.documento }}
                                        </td>
                                        <td class="text-start">
                                            {{ profesor.nombres + ' ' + profesor.apellidos }}
                                        </td>
                                        <td class="text-end">
                                            {{ profesor.telefono }}
                                        </td>
                                        <td class="text-start">
                                            {{ profesor.email }}
                                        </td>
                                        <td class="text-start">
                                            {{ profesor.direccion }}
                                        </td>
                                        <td class="text-start">
                                            {{ profesor.departamento + ' ' + profesor.ciudad }}
                                        </td>
                                        <td class="text-center">
                                            <router-link class="btn btn-outline-danger border-0 btn-sm"
                                                :to="{ name: 'ProfesoresUpdate', params: { id: profesor.id } }">Editar
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


const profesores = computed(() => store.state.profesores.data);
const profesoresLoading = computed(() =>
    store.state.profesores.loading
)
store.dispatch('getProfesores')

</script>



