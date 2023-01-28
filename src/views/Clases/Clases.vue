<script>
export default { name: "Clases" }

</script>

<template>
    <div class="container my-4">
        <div class="row d-flex align-items-center mb-4">
            <div class="col">
                <router-link class="btn btn-danger shadow-sm" :to="{ name: 'ClasesCreate' }">
                    <i class="fas fa-plus-square"></i> Crear clase
                </router-link>
            </div>
        </div>
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
                                        <th class="text-center">Accion</th>
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
                                                :class="['badge', clase.asignatura.tipo_asignatura == 1 ? 'bg-info' : 'bg-secondary']">
                                                {{ clase.asignatura.tipo_asignatura == 1 ? 'Lectiva' : 'Obligatoria' }}
                                            </div>
                                        </td>
                                        <td class="text-center">
                                            <div :class="['badge', clase.estado == 1 ? 'bg-success' : 'bg-primary']">
                                                {{ clase.estado == 1 ? 'En proceso' : 'Finalizado' }}
                                            </div>
                                        </td>
                                        <td class="text-center">
                                            <router-link class="btn btn-outline-danger border-0 btn-sm"
                                                :to="{ name: 'ClasesUpdate', params: { id: clase.id } }">Editar
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
const clases = computed(() => store.state.clases.data);
const clasesLoading = computed(() =>
    store.state.clases.loading
)
store.dispatch('getClases')

</script>


