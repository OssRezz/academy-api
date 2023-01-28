<script>
export default { name: "ProfesoresView" }

</script>

<template>
    <div class="container my-4">
        <div class="row d-flex align-items-center mb-4">
            <div class="col">
                <router-link class="btn btn-danger shadow-sm" :to="{ name: 'Profesores' }">
                    <i class="fas fa-plus-square"></i> Atras
                </router-link>
            </div>
        </div>
        <div class="row my-5" v-if="profesorLoading">
            <div class="col-12  col-lg-7 text-center">
                <div class="text-primary h3">Loading...</div>
            </div>
        </div>
        <div class="row" v-else>
            <div class="col-12  col-lg-7">
                <div class="card shadow-sm">
                    <div class="card-header  fs-5" style="font-weight: 500;">
                        {{ route.params.id ? 'Actualizar' : 'Crear' }} profesor
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="saveProfesor">
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
                                            {{ route.params.id ? 'Actualizar' : 'Crear' }} profesor
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
import Swal from 'sweetalert2'

const route = useRoute();
const router = useRouter();
const profesorLoading = computed(() =>
    store.state.currentProfesor.loading
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

watch(
    () => store.state.currentProfesor.data,
    (newVal, oldVal) => {
        model.value = {
            ...JSON.parse(JSON.stringify(newVal)),
            status: newVal.status !== "draft"
        }
    }
);

if (route.params.id) {
    store.dispatch('getProfesor', route.params.id);
}

function saveProfesor() {
    store.dispatch("saveProfesor", model.value).then((res) => {
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
        router.push({
            name: "ProfesoresView",
            params: { id: res.data.id }
        })
        return Swal.fire({
            title: res.message,
            text: `${res.data.nombres} ${res.data.apellidos}`,
            icon: 'success',
            confirmButtonColor: 'rgb(223, 71, 89)',
        });

    })
}
</script>

