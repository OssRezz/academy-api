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
                            <div class="row  d-flex justify-content-center">
                                <div class="col-12 px-4 text-white  rounded mb-3" v-if="errorMsg.estado">
                                    <div :class="[errorMsg.color, 'row d-flex align-items-center p-2 rounded']">
                                        <div class="col-10 fs-6">
                                            <small>{{ errorMsg.msg }}</small>
                                        </div>
                                        <div class="col-2 text-end">
                                            <span @click="errorMsg.estado = false" style="cursor: pointer;">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke-width="1.5" stroke="currentColor" height="30">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                                        <select name="rol_id" class="form-select" v-model="model.rol_id"
                                            @change="rolChange" placeholder="roles">
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
import { useRoute, useRouter } from 'vue-router';
import store from '../../store';
import { computed, ref } from 'vue';

const roles = computed(() => store.state.roles);
const route = useRoute();
const router = useRouter();

let model = ref({
    name: "",
    email: "",
    password: "",
    rol_id: "",
});



let errorMsg = ref({
    msg: "",
    color: "",
    estado: false,
});

const modelRoles = computed(() => store.state.roles);


if (route.params.id) {
    model.value = store.state.usuarios.find(
        (user) => user.id === parseInt(route.params.id)
    );
}

function SaveUser() {
    store.dispatch("saveUser", model.value).then((res) => {
        console.log(res)
        if (res.status === 200) {
            model.value = {
                name: "",
                email: "",
                password: "",
                rol_id: "",
            }
            errorMsg.value = {
                msg: res.message,
                color: "bg-success",
                estado: true,
            }
        } else {
            errorMsg.value = {
                msg: res.message,
                color: "bg-primary",
                estado: true,
            }

        }
    })
}

store.dispatch('getRoles')

</script>



