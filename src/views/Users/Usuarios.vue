<script>
export default { name: "Usuarios" }

</script>

<template>
    <div class="container my-4">
        <div class="row d-flex align-items-center mb-4">
            <div class="col">
                <router-link class="btn btn-danger shadow-sm" :to="{ name: 'UsuariosCreate' }">
                    <i class="fas fa-plus-square"></i> Crear usuario
                </router-link>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div class="card shadow-sm">
                    <div class="card-header  fs-5" style="font-weight: 500;">
                        Lista de usuarios
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover table-bordered" style="width: 100%;">
                                <thead>
                                    <tr>
                                        <th class="text-start">Nombre</th>
                                        <th class="text-start">Email</th>
                                        <th class="text-start">Rol</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="usuario in usuarios" :key="usuario.id">
                                        <td class="text-start">{{ usuario.name }}</td>
                                        <td class="text-start">{{ usuario.email }}</td>
                                        <td class="text-start">{{ usuario.rol.nombre }}</td>
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
import { computed, ref } from 'vue';
const usuarios = computed(() => store.state.usuarios);

</script>


