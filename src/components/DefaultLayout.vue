<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const navigation = [
    { name: "Dashboard", to: { name: "Dashboard" } },
    { name: "Usuarios", to: { name: "Usuarios" } },
    { name: "Estudiantes", to: { name: "Estudiantes" } },
    { name: "Profesores", to: { name: "Profesores" } },
    { name: "Asignaturas", to: { name: "Asignaturas" } },
    { name: "Matriculas", to: { name: "Matriculas" } },
    { name: "Clases", to: { name: "Clases" } },

];


export default {
    name: "DefaultLayout",
    setup() {
        const store = useStore();
        const router = useRouter();
        const id = sessionStorage.getItem('id');

        function logout() {
            store.dispatch('logout').then(() => {
                router.push({
                    name: "Login"
                })
            })
        }
        return {
            user: computed(() => store.state.user.data),
            navigation,
            id,
            logout
        }
    }
}

</script>

<template>
    <nav class="navbar navbar-expand-xl navbar-white bg-white shadow-sm">
        <div class="container-fluid">
            <a class="navbar-brand fs-5 text-primary" href="#"><b>PsicolAcademy</b></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <img src="https://www.galaxiaseguridadltda.com.co/psicolacademy/public/images/bars-solid.svg"
                    height="25">
            </button>
            <div class="collapse navbar-collapse d-xl-flex justify-content-xl-end" id="navbarNavAltMarkup">
                <div class="navbar-nav">

                    <router-link v-for="item in navigation" :key="item.name" :to="item.to"
                        :style="[id == 3 ? 'display: none' : 'display: flex']" :class="[
                            this.$route.name !== item.to.name ? 'btn-outline-primary' : 'btn-primary',
                            'btn btn-sm mx-xl-1 my-1 my-xl-0'
                        ]">
                        {{ item.name }}
                    </router-link>

                    <button as="a" @click="logout" class="btn btn-outline-danger border-0 btn-sm mx-1">
                        Salir <i class="fa-solid fa-right-from-bracket"></i>
                    </button>
                </div>
            </div>
        </div>
    </nav>
    <router-view>

    </router-view>
</template>
