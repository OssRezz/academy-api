<script>
export default { name: "EstudiantesView" }

</script>

<template>
    <div class="container my-4">
        <div class="row d-flex align-items-center mb-4">
            <div class="col">
                <router-link class="btn btn-danger shadow-sm" :to="{ name: 'Estudiantes' }">
                    <i class="fas fa-plus-square"></i> Atras
                </router-link>
            </div>
        </div>
        <div class="row my-5" v-if="estudianteLoading">
            <div class="col-12  col-lg-7 text-center">
                <div class="text-primary h3">Loading...</div>
            </div>
        </div>
        <div class="row" v-else>
            <div class="col-12  col-lg-7">
                <div class="card shadow-sm">
                    <div class="card-header  fs-5" style="font-weight: 500;">
                        {{ route.params.id ? 'Actualizar' : 'Crear' }} estudiante
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="saveEstudiante">
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
                                        <input type="number" class="form-control" placeholder="documento"
                                            name="documento" v-model="model.documento">
                                        <label for="" class="form-label">Documento <b class="text-danger">*</b></label>
                                    </div>
                                </div>

                                <div class="col-12">
                                    <div class="form-floating">
                                        <input type="text" class="form-control" placeholder="Nombres" name="nombres"
                                            v-model="model.nombres">
                                        <label for="" class="form-label">Nombres <b class="text-danger">*</b></label>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="form-floating">
                                        <input type="text" class="form-control" placeholder="Nombres" name="apellidos"
                                            v-model="model.apellidos">
                                        <label for="" class="form-label">Apellidos <b class="text-danger">*</b></label>
                                    </div>
                                </div>

                                <div class="col-12">
                                    <div class="form-floating">
                                        <input type="number" class="form-control" placeholder="telefono" name="telefono"
                                            v-model="model.telefono">
                                        <label for="" class="form-label">Telefono <b class="text-danger">*</b></label>
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
                                        <textarea class="form-control" name="direccion" placeholder="direccion"
                                            v-model="model.direccion"></textarea>
                                        <label for="" class="form-label">Dirección <b class="text-danger">*</b></label>
                                    </div>
                                </div>

                                <div class="col-12 col-lg-6">
                                    <div class="form-floating">
                                        <input type="text" class="form-control" placeholder="Departamento"
                                            name="departamento" v-model="model.departamento">
                                        <label for="" class="form-label">Departamento <b class="text-danger">*</b>
                                        </label>
                                    </div>

                                </div>

                                <div class="col-12 col-lg-6">
                                    <div class="form-floating">
                                        <input type="text" class="form-control" placeholder="ciudad" name="ciudad"
                                            v-model="model.ciudad">
                                        <label for="" class="form-label">Ciudad <b class="text-danger">*</b>
                                        </label>
                                    </div>
                                </div>

                                <div class="col-12">
                                    <div class="d-grid">
                                        <button class="btn btn-danger">
                                            {{ route.params.id ? 'Actualizar' : 'Crear' }} estudiante
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

const route = useRoute();
const router = useRouter();
const estudianteLoading = computed(() =>
    store.state.currentEstudiante.loading
)

let model = ref({
    id: "",
    documento: "",
    nombres: "",
    apellidos: "",
    telefono: "",
    email: "",
    direccion: "",
    ciudad: "",
    departamento: "",
    estado: "1",
});

let errorMsg = ref({
    msg: "",
    color: "",
    estado: false,
});


watch(
    () => store.state.currentEstudiante.data,
    (newVal, oldVal) => {
        model.value = {
            ...JSON.parse(JSON.stringify(newVal)),
            status: newVal.status !== "draft"
        }
    }
);

if (route.params.id) {
    store.dispatch('getEstudiante', route.params.id);
}

// store.dispatch('getEstudiantes')

function saveEstudiante() {
    store.dispatch("saveEstudiante", model.value).then((res) => {
        console.log(res)
        if (res.status === 200) {
            router.push({
                name: "EstudiantesView",
                params: { id: res.data.id }
            })
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
</script>

