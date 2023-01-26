<template>
    <div class="container my-5">
        <div class="row d-flex justify-content-center">
            <div class="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4  mt-5">
                <div class="card  mt-5">
                    <div class="card-body">
                        <div class="row mb-4">
                            <div class="col-12 text-center">
                                <img src="https://www.galaxiaseguridadltda.com.co/psicolacademy/public/images/logo.png" height="150">
                            </div>
                            <div class="col-12 text-center">
                                <div class="fs-4" style="font-weight: 600;">PsicolAcademy</div>
                            </div>
                        </div>
                        <form @submit="login">
                            <div class="row g-4 d-flex justify-content-center">
                                <div class="col-11 text-white bg-danger p-2 rounded" v-if="errorMsg">
                                    <div class="row d-flex align-items-center">
                                        <div class="col-10">
                                            <small>{{ errorMsg }}</small>
                                        </div>
                                        <div class="col-2">
                                            <span @click="errorMsg = ''" style="cursor: pointer;">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="form-floating">
                                        <input type="email" class="form-control" id="input-1" v-model="user.email"
                                            placeholder="Enter email" required>
                                        <label for="">Email</label>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="form-floating">
                                        <input type="password" class="form-control" id="input_password"
                                            v-model="user.password" placeholder="Enter password" required>
                                        <label for="">Password</label>
                                    </div>
                                </div>
                                <div class="col-12 text-center">
                                    <button type="submit" class="btn btn-primary">Iniciar sesion</button>
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
import { useRouter } from 'vue-router';
import store from '../../store';
import { ref } from "vue";

const router = useRouter();
const user = {
    email: "",
    password: "",
}

let errorMsg = ref("");

function login(ev) {
    ev.preventDefault();
    store.dispatch('login', user)
        .then((res) => {
            errorMsg.value = res.message
            if (res.status === 200) {
                res.usuario.rol_id !== 3 ?
                    router.push({ name: "Dashboard" }) : router.push({ name: "Semestres" })
            }
        })
        .catch((error) => {
            console.log(error.message.message)
            errorMsg.value = error.message
        })
}
</script>