<script>
export default { name: "UsuariosCreate" }
</script>

<template>
    <div class="container my-4">
        <div class="row d-flex align-items-center mb-4">
            <div class="col-12 col-lg-7">
                <router-link class="btn btn-danger shadow-sm" :to="{ name: 'Usuarios' }">
                    <i class="fas fa-plus-square"></i> Atras
                </router-link>
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-lg-7">
                <div class="card shadow-sm">
                    <div class="card-header  fs-5" style="font-weight: 500;">
                        Crear usuario
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="SaveUser">
                            <div class="row g-3">
                                <div class="col-12">
                                    <div class="form-floating">
                                        <input type="text" class="form-control" placeholder="Nombres" name="name"
                                            v-model="model.name">
                                        <label for="" class="form-label">Nombre <b class="text-danger">*</b></label>
                                    </div>

                                </div>
                                <div class="col-12">
                                    <div class="form-floating">
                                        <input type="email" class="form-control" placeholder="Correo" name="email"
                                            v-model="model.email">
                                        <label for="" class="form-label">Correo <b class="text-danger">*</b></label>
                                    </div>

                                </div>
                                <div class="col-12">
                                    <div class="form-floating">
                                        <input type="password" class="form-control" placeholder="Password"
                                            name="password" v-model="model.password">
                                        <label for="" class="form-label">Contraseña <b class="text-danger">*</b></label>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="form-floating">
                                        <select name="rol_id" class="form-select" placeholder="roles"
                                            v-model="model.rol_id">
                                            <option disabled selected>Selecciona un rol</option>
                                            <option v-for="rol in roles" :key="rol.id" :value="rol.id">
                                                {{ rol.nombre }}
                                            </option>
                                        </select>
                                        <label for="" class="form-label">Rol <b class="text-danger">*</b></label>
                                    </div>

                                </div>

                                <div class="col-12">
                                    <div class="d-grid">
                                        <button class="btn btn-danger">Ingresar usuario</button>
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
import { useRoute } from 'vue-router';
import store from '../../store';
import { computed, ref } from 'vue';
import Swal from 'sweetalert2'

store.dispatch('getRoles')
const roles = computed(() => store.state.roles);
const route = useRoute();

let model = ref({
    name: "",
    email: "",
    password: "",
    rol_id: "",
});


if (route.params.id) {
    model.value = store.state.usuarios.find(
        (user) => user.id === parseInt(route.params.id)
    );
}

function SaveUser() {
    store.dispatch("saveUser", model.value).then((res) => {

        if (res.status !== 200) {
            let html = "";
            Object.values(res.data).forEach(error => {
                html += `<li class="list-group-item"><small>${error}</small></li>`;

            });
            return Swal.fire({
                title: res.message,
                html: `<ul class="list-group list-group-flush">${html}</ul>`,
                icon: 'warning',
                confirmButtonColor: 'rgb(223, 71, 89)',
            });
        }
        model.value = {
            name: "",
            email: "",
            password: "",
            rol_id: "",
        }
        return Swal.fire({
            title: res.message,
            text: `${res.data.name}`,
            icon: 'success',
            confirmButtonColor: 'rgb(223, 71, 89)',
        });
    })
}
</script>



