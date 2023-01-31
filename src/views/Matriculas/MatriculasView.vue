<script>
export default { name: "MatriculasView" }

</script>

<template>
    <div class="container my-4">
        <div class="row d-flex align-items-center mb-4">
            <div class="col">
                <router-link class="btn btn-danger shadow-sm" :to="{ name: 'Matriculas' }">
                    <i class="fas fa-plus-square"></i> Atras
                </router-link>
            </div>
        </div>
        <div class="row my-5" v-if="matriculaLoading">
            <div class="col-12  col-lg-7 text-center">
                <div class="text-primary h3">Loading...</div>
            </div>
        </div>
        <div class="row" v-else>
            <div class="col-12 col-lg-6 col-xl-7 col-xxl-8">
                <div class="card shadow-sm">
                    <div class="card-header  fs-5" style="font-weight: 500;">
                        Asignaturas disponibles
                    </div>
                    <div class="card-body">
                        <div class="accordion" id="ListaAsignaturas">
                            <div class="accordion" id="ListaAsignaturas" key="{{clase.id}}" v-for="clase in clases">
                                <div class="accordion-item">
                                    <h2 class="accordion-header" :id="'heading' + clase.id">
                                        <button class="accordion-button collapsed" type="button"
                                            data-bs-toggle="collapse" :data-bs-target="'#collapse' + clase.id"
                                            aria-expanded="true" :aria-controls="'collapse' + clase.id">
                                            <div class="row d-flex justify-content-bewteen aling-items-center">
                                                <small>
                                                    <div class="row">
                                                        <div class="col-12 mb-1">
                                                            <b>Asignatura</b>: {{ clase.asignatura.nombre }}
                                                        </div>
                                                        <div class="col-12 mb-1">
                                                            <b>Profesor</b>: {{ clase.profesor.nombres }}
                                                            {{ clase.profesor.apellidos }}
                                                        </div>
                                                        <div class="col-12 mb-1">
                                                            <b>Tipo asignatura</b>:
                                                            <div
                                                                :class="[[clase.asignatura.tipo_asignatura == 0 ? 'bg-secondary' : 'bg-primary'], ['badge bg-sm']]">
                                                                {{
                                                                    clase.asignatura.tipo_asignatura == 0 ? "Electiva" :
                                                                        "Obligatoria"
                                                                }}
                                                            </div>
                                                        </div>
                                                        <div class="col-12">
                                                            <b>Creditos</b>: {{ clase.asignatura.creditos }}
                                                        </div>
                                                    </div>
                                                </small>
                                            </div>
                                        </button>
                                    </h2>
                                    <div :id="'collapse' + clase.id" class="accordion-collapse collapse"
                                        :aria-labelledby="'heading' + clase.id" data-bs-parent="#ListaAsignaturas">
                                        <div class="accordion-body">
                                            <div class="row">
                                                <div class="col-12">
                                                    {{ clase.asignatura.descripcion }}
                                                </div>
                                                <div class="col-12 mb-3">
                                                    <ul class="list-group">
                                                        <li class="list-group-item">
                                                            # de creditos: <b>{{ clase.asignatura.creditos }}</b>
                                                        </li>
                                                        <li class="list-group-item">Profesor:
                                                            <b>
                                                                {{ clase.profesor.nombres }}
                                                                {{ clase.profesor.apellidos }}
                                                            </b>
                                                        </li>
                                                        <li class="list-group-item">
                                                            Hora inicio: <b>{{ clase.hora_inicio }}</b>
                                                        </li>
                                                        <li class="list-group-item">
                                                            Hora fin: <b>{{ clase.hora_fin }}</b>
                                                        </li>
                                                        <li class="list-group-item">Area:
                                                            <b>
                                                                {{ clase.asignatura.area.nombre }}
                                                            </b>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div class="col-12 d-grid">
                                                    <button class="btn btn-outline-danger"
                                                        @click="SeleccionarClase(clase.id)">
                                                        Seleccionar
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12  col-lg-6 col-xl-5 col-xxl-4">
                <div class="card shadow-sm">
                    <div class="card-header  fs-5" style="font-weight: 500;">
                        {{ route.params.id ? 'Actualizar' : 'Crear' }} matricula
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="saveMatricula">
                            <div class="row g-4">
                                <div class="col-12">
                                    <div class="form-floating">
                                        <select name="rol_id" class="form-select" placeholder="estudiante"
                                            v-model="model.estudiante_id">
                                            <option disabled selected>Selecciona un area</option>
                                            <option v-for="estudiante in estudiantes" :key="estudiante.id"
                                                :value="estudiante.id">
                                                {{ estudiante.nombres + ' ' + estudiante.apellidos }}
                                            </option>
                                        </select>
                                        <label for="" class="form-label">Estudiante <b class="text-danger">*</b></label>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="form-floating">
                                        <input type="number" class="form-control" placeholder="Nombres" name="nombres"
                                            v-model="model.semestre">
                                        <label for="" class="form-label"># Semestre <b class="text-danger">*</b></label>
                                    </div>
                                </div>

                                <div class="col-12" v-if="route.params.id">
                                    <div class="form-floating">
                                        <select name="rol_id" class="form-select" placeholder="roles"
                                            v-model="model.estado">
                                            <option value="0">Finalizado</option>
                                            <option value="1">En proceso</option>
                                        </select>
                                        <label for="" class="form-label">Estado <b class="text-danger">*</b></label>
                                    </div>
                                </div>
                            </div>
                            <div class="border my-4">

                            </div>
                            <div class="row mb-4">
                                <div class="col-12">
                                    <small v-if="AsignaturasSeleccionadas.length !== 0">
                                        <ul class="list-group mb-3"
                                            v-for="clase_seleccionadas in AsignaturasSeleccionadas">
                                            <li class="list-group-item">
                                                <div class="row d-flex  aling-items-center">
                                                    <div class="col-10">
                                                        <div class="col-12 mb-1">
                                                            <b>Asignatura</b>: {{
                                                                clase_seleccionadas.asignatura.nombre
                                                            }}
                                                        </div>
                                                        <div class="col-12 mb-1">
                                                            <b>Profesor</b>: {{ clase_seleccionadas.profesor.nombres }}
                                                            {{ clase_seleccionadas.profesor.apellidos }}
                                                        </div>
                                                        <div class="col-12 mb-1">
                                                            <b>Tipo asignatura</b>:
                                                            <div
                                                                :class="[[clase_seleccionadas.asignatura.tipo_asignatura == 0 ? 'bg-secondary' : 'bg-primary'], ['badge bg-sm']]">
                                                                {{
                                                                    clase_seleccionadas.asignatura.tipo_asignatura == 0 ?
                                                                        "Electiva" :
                                                                        "Obligatoria"
                                                                }}
                                                            </div>
                                                        </div>
                                                        <div class="col-12">
                                                            <b>Creditos</b>:{{
                                                                clase_seleccionadas.asignatura.creditos
                                                            }}
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="col-2 d-flex aling-items-center d-flex justify-content-end">
                                                        <div class="row">
                                                            <button type="button"
                                                                class="btn btn-outline-danger border-0 btn-sm"
                                                                @click="EliminarClase(clase_seleccionadas.id)">Eliminar</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </small>
                                    <div class="row" v-else>
                                        <div class="col-12">
                                            <small class="text-muted">No hay asignaturas seleccionadas</small>
                                        </div>
                                    </div>
                                    <div class="row" v-if="CalcularTotal() !== 0">
                                        <div class="col-12">
                                            <small>Credito totales: <b>{{ CalcularTotal() }}</b></small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <div class="d-grid">
                                        <button class="btn btn-danger">
                                            {{ route.params.id ? 'Actualizar' : 'Crear' }} matricula
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
const matriculaLoading = computed(() =>
    store.state.currentMatricula.loading
)
store.dispatch('getEstudiantes')
store.dispatch('getClases')
const estudiantes = computed(() =>
    store.state.estudiantes.data
)

const clases = computed(() =>
    store.state.clases.data
)


let model = ref({
    id: "",
    estudiante_id: "",
    semestre: "",
    asignaturas: "",
    creditos: "",
    estado: route.params.id ? '' : "1",
});


let AsignaturasSeleccionadas = ref([]);

watch(
    () => store.state.currentMatricula.data,
    (newVal, oldVal) => {
        model.value = {
            ...JSON.parse(JSON.stringify(newVal)),
            status: newVal.status !== "draft"
        }
    }
);

if (route.params.id) {
    store.dispatch('getMatricula', route.params.id);
}


function saveMatricula() {

    let TotalCreditos = CalcularTotal();

    if (TotalCreditos < 7) {
        return Swal.fire({
            title: "Información",
            html: `Los creditos minimos para matricular un estudiante son <b>7</b>.`,
            icon: 'info',
            confirmButtonColor: 'rgb(223, 71, 89)',
        });
    }

    //Agregamos las asignaturas seleccionadas
    model.value.asignaturas = AsignaturasSeleccionadas.value
    model.value.creditos = TotalCreditos

    store.dispatch("saveMatricula", model.value).then((res) => {

        //Retornamos los errores al suario
        if (res.status !== 200 || res.status === undefined) {
            let html = "";
            Object.values(res.data).forEach(error => {
                html += `<li class="list-group-item"><small>${error}</small></li>`;

            });
            html = res.status === 204 ? '' : html;
            return Swal.fire({
                title: res.message,
                html: `<ul class="list-group list-group-flush">${html}</ul>`,
                icon: 'warning',
                confirmButtonColor: 'rgb(223, 71, 89)',
            });
        }
        router.push({
            name: "Matriculas",
            // params: { id: res.data.id }
        });
        return Swal.fire({
            title: res.message,
            text: `${res.data.estudiante.nombres} ${res.data.estudiante.apellidos}`,
            icon: 'success',
            confirmButtonColor: 'rgb(223, 71, 89)',
        });
    })
}

function CalcularTotal() {
    return parseInt(AsignaturasSeleccionadas.value.length !== 0 ? AsignaturasSeleccionadas.value.map(amount).reduce(sum) : 0);

}

function sum(prev, next) {
    return parseInt(prev) + parseInt(next);
}
function amount(item) {
    return parseInt(item.asignatura.creditos);
}


function SeleccionarClase(id) {
    id = parseInt(id)
    //Filtramos la seleccion  del array de clases disponibles
    let FilterClase = clases.value.filter((clase) => parseInt(clase.id) === id);

    //Filtramos que el estudiante no tenga este asginatura ya seleccionada (Validamos que el id no este dentro del array de asignaturas seleccionadas)
    //Si encuentra algo el array sera mayor a 0 y va a retornar en el condicional.
    let ValidateAsignatura = AsignaturasSeleccionadas.value.filter(
        (asginatura) => asginatura.id == id
    );
    let ValidateIfAsignaturaExist = AsignaturasSeleccionadas.value.filter(
        (asginatura) => asginatura.asignatura_id == FilterClase[0].asignatura_id
    );
    if (
        ValidateAsignatura.length !== 0 ||
        ValidateIfAsignaturaExist.length !== 0
    ) {
        return Swal.fire({
            html: `Ya ha seleccionado esta asignatura. Puede verificarlo en la sección de Asignaturas seleccionadas`,
            showDenyButton: false,
            confirmButtonColor: "#0275d8",
            icon: "info",
        });
    }

    AsignaturasSeleccionadas.value.push(FilterClase[0]);
}

function EliminarClase(id) {
    let FilterClase = AsignaturasSeleccionadas.value.filter((clase) => parseInt(clase.id) !== parseInt(id));
    AsignaturasSeleccionadas.value = FilterClase

}
</script>

