<script>
export default { name: "Matriculas" }

</script>

<template>
    <div class="container my-4">
        <div class="row d-flex align-items-center mb-4">
            <div class="col">
                <router-link class="btn btn-danger shadow-sm" :to="{ name: 'MatriculasCreate' }">
                    <i class="fas fa-plus-square"></i> Crear Matricula
                </router-link>
            </div>
        </div>
        <div class="row my-5" v-if="matriculasLoading">
            <div class="col-12 text-center">
                <div class="text-primary h3">Loading...</div>
            </div>
        </div>
        <div class="row" v-else>
            <div class="col-12">
                <div class="card shadow-sm">
                    <div class="card-header  fs-5" style="font-weight: 500;">
                        Lista de matriculas
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover table-bordered" style="width: 100%;">
                                <thead>
                                    <tr>
                                        <th class="text-start">Estudiante</th>
                                        <th class="text-end">Creditos</th>
                                        <th class="text-end">Semestre</th>
                                        <th class="text-center">Asignaturas</th>
                                        <th class="text-center">Estado</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="matricula in matriculas" :key="matricula.id">
                                        <td class="text-start">{{
                                            matricula.estudiante.nombres + ' ' +
                                                matricula.estudiante.apellidos
                                        }}</td>
                                        <td class="text-end">{{ matricula.creditos }}</td>
                                        <td class="text-end">{{ matricula.semestre }}</td>
                                        <td class="text-center">
                                            <div
                                                :class="['badge', matricula.asignaturas == 1 ? 'bg-success' : 'bg-danger']">
                                                {{ matricula.asignaturas == 1 ? 'Completo' : 'Sin asignaturas' }}
                                            </div>
                                        </td>
                                        <td class="text-center">
                                            <div
                                                :class="['badge', matricula.estado == 1 ? 'bg-success' : 'bg-primary']">
                                                {{ matricula.estado == 1 ? 'En proceso' : 'Finalizado' }}
                                            </div>
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
const matriculas = computed(() => store.state.matriculas.data);
const matriculasLoading = computed(() =>
    store.state.matriculas.loading
)
store.dispatch('getMatriculas')

</script>


