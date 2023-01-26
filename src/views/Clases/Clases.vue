<script>
export default { name: "Clases" }

</script>

<template>
    <div class="container my-4">
        <div class="row my-5" v-if="clasesLoading">
            <div class="col-12 text-center">
                <div class="text-primary h3">Loading...</div>
            </div>
        </div>
        <div class="row" v-else>
            <div class="col-12">
                <div class="card shadow-sm">
                    <div class="card-header  fs-5" style="font-weight: 500;">
                        Lista de clases
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover table-bordered" style="width: 100%;">
                                <thead>
                                    <tr>
                                        <th class="text-start">Profesor</th>
                                        <th class="text-start">Asignatura</th>
                                        <th class="text-end">Créditos</th>
                                        <th class="text-center">Hora Inicio</th>
                                        <th class="text-center">Hora Fin</th>
                                        <th class="text-center">Tipo Asignatura</th>
                                        <th class="text-center">Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="clase in clases" :key="clase.id">
                                        <td class="text-start">{{
                                            clase.profesor.nombres + ' ' +
                                                clase.profesor.apellidos
                                        }}</td>
                                        <td class="text-start">{{ clase.asignatura.nombre }}</td>
                                        <td class="text-end">{{ clase.asignatura.creditos }}</td>
                                        <td class="text-center">{{ clase.hora_inicio }}</td>
                                        <td class="text-center">{{ clase.hora_fin }}</td>
                                        <td class="text-center">
                                            <div
                                                :class="['badge', clase.asignaturas == 1 ? 'bg-success' : 'bg-danger']">
                                                {{ clase.asignaturas == 1 ? 'Completo' : 'Sin asignaturas' }}
                                            </div>
                                        </td>
                                        <td class="text-center">
                                            <div
                                                :class="['badge', clase.estado == 1 ? 'bg-success' : 'bg-primary']">
                                                {{ clase.estado == 1 ? 'En proceso' : 'Finalizado' }}
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
const clases = computed(() => store.state.clases.data);
const clasesLoading = computed(() =>
    store.state.clases.loading
)
store.dispatch('getClases')

</script>


