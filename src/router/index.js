import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Auth/Login.vue";
import Usuarios from "../views/Users/Usuarios.vue";
import UsuariosCreate from "../views/Users/UsuariosCreate.vue";
import Estudiantes from "../views/Estudiantes/Estudiantes.vue";
import Profesores from "../views/Profesores/Profesores.vue";
import Asignaturas from "../views/Asignaturas/Asignaturas.vue";
import Matriculas from "../views/Matriculas/Matriculas.vue";
import Clases from "../views/Clases/Clases.vue";
import AsignaturasView from "../views/Asignaturas/AsignaturasView.vue";
import ProfesoresView from "../views/Profesores/ProfesoresView.vue";
import EstudiantesView from "../views/Estudiantes/EstudiantesView.vue";
import Semestres from "../views/semestres/Semestres.vue";
import Dashboard from "../views/Dashboard.vue";
import DefaultLayout from "../components/DefaultLayout.vue";
import AuthLayout from "../components/AuthLayout.vue";
import store from "../store";

const routes = [
  //Rutas que  requieren token
  {
    path: "/",
    redirect: "/dashboard",
    component: DefaultLayout,
    meta: { requiresAtuh: true },
    children: [
      { path: "/dashboard", name: "Dashboard", component: Dashboard },
      { path: "/usuarios", name: "Usuarios", component: Usuarios },
      { path: "/usuarios/create", name: "UsuariosCreate", component: UsuariosCreate },
      { path: "/estudiantes", name: "Estudiantes", component: Estudiantes },
      { path: "/estudiantes/:id", name: "EstudiantesView", component: EstudiantesView },
      { path: "/estudiantes/create", name: "EstudiantesCreate", component: EstudiantesView },
      { path: "/estudiantes/update", name: "EstudiantesUpdate", component: EstudiantesView },
      { path: "/profesores", name: "Profesores", component: Profesores },
      { path: "/profesores/:id", name: "ProfesoresView", component: ProfesoresView },
      { path: "/profesores/create", name: "ProfesoresCreate", component: ProfesoresView },
      { path: "/profesores/update", name: "ProfesoresUpdate", component: ProfesoresView },
      { path: "/asignaturas", name: "Asignaturas", component: Asignaturas },
      { path: "/asignaturas/create", name: "AsignaturasCreate", component: AsignaturasView },
      { path: "/asignaturas/update", name: "AsignaturasUpdate", component: AsignaturasView },
      { path: "/matriculas", name: "Matriculas", component: Matriculas },
      { path: "/clases", name: "Clases", component: Clases },
      { path: "/semestres", name: "Semestres", component: Semestres },
    ],
  },
  //Rutas que no requiere auth
  {
    path: "/auth",
    redirect: "/Login",
    name: "Auth",
    meta: { isGuest: true },
    component: AuthLayout,
    children: [{ path: "/login", name: "Login", component: Login }],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAtuh && !store.state.user.token) {
    next({ name: "Login" });
  } else if (store.state.user.token && to.meta.isGuest) {
    next({ name: "Dashboard" });
  } else {
    next();
  }
});

export default router;
