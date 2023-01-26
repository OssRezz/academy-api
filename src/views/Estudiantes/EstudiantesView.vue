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
        <div class="row">
            <div class="col-12  col-lg-7">
                <div class="card shadow-sm">
                    <div class="card-header  fs-5" style="font-weight: 500;">
                        {{ model.id ? 'Actualizar' : 'Crear' }} un estudiante
                    </div>
                    <div class="card-body">
                        <pre>{{ model }}</pre>
                        <form @submit.prevent="saveEstudiante">
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
                                        <button class="btn btn-danger">Ingresar estudiante</button>
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
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

let model = ref({
    id: false,
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
function saveEstudiante() {
    store.dispatch("saveEstudiante", model.value).then((res) => {
        console.log(res)
        if (res.status !== 404) {
            router.push({
                name: "EstudiantesView",
                params: { id: res.data[0].id }
            })
        }
    })
}
</script>

