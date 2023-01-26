<script>
export default { name: "Asignaturas" }

</script>

<template>
    <div class="container my-4">
        <div class="row d-flex align-items-center mb-4">
            <div class="col">
                <a class="btn btn-danger shadow-sm">
                    <i class="fas fa-plus-square"></i> Crear usuario
                </a>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div class="card shadow-sm">
                    <div class="card-header  fs-5" style="font-weight: 500;">
                        Lista de asignaturas
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover table-bordered" style="width: 100%;">
                                <thead>
                                    <tr>
                                        <th class="text-start">Nombre</th>
                                        <th class="text-start">Area</th>
                                        <th class="text-start">Tipo asignatura</th>
                                        <th class="text-end">Creditos</th>
                                        <th class="text-center">Accion</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="asignatura in asignaturas" :key="asignatura.id">
                                        <td class="text-start">
                                            {{ asignatura.nombre }}
                                        </td>
                                        <td class="text-start">
                                            {{ asignatura.area.nombre }}
                                        </td>
                                        <td class="text-start">
                                            {{ asignatura.tipo_asignatura == 1 ? 'Lectiva' : 'Obligatoria' }}
                                        </td>
                                        <td class="text-end">
                                            {{ asignatura.creditos }}
                                        </td>
                                        <td class="text-center">
                                            <button class=" btn btn-danger btn-sm">Editar</button>
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


const asignaturas = computed(() => store.state.asignaturas);
</script>





