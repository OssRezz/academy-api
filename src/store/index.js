import { createStore } from "vuex";
import axiosClient from "../axios.js";

const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem("TOKEN"),
    },
    currentEstudiante: {
      loading: false,
      data: {},
    },
    currentProfesor: {
      loading: false,
      data: {},
    },
    estudiantes: {
      loading: false,
      data: [],
    },
    usuarios: {
      loading: false,
      data: [],
    },
    profesores: {
      loading: false,
      data: [],
    },
    asignaturas: {
      loading: false,
      data: [],
    },
    matriculas: {
      loading: false,
      data: [],
    },
    clases: {
      loading: false,
      data: [],
    },
    roles: [],
  },
  getters: {},
  actions: {
    //Un estudiante
    getEstudiante({ commit }, id) {
      commit("setCurrentEstudianteLoading", true);

      return axiosClient
        .get(`/estudiantes/${id}`)
        .then((res) => {
          commit("setCurrentEstudiante", res.data.data);
          commit("setCurrentEstudianteLoading", false);
          console.log("Estudiante obtenido por un id...");
          return res;
        })
        .catch((error) => {
          commit("setCurrentEstudianteLoading", false);
          throw error;
        });
    },
    //Todos los estudiantes
    getEstudiantes({ commit }) {
      commit("setEstudiantesLoading", true);

      return axiosClient
        .get(`/estudiantes`)
        .then((res) => {
          commit("setEstudiantesLoading", false);
          commit("setEstudiantes", res.data.data);
          console.log("Todos los estudiantes...");
          return res.data;
        })
        .catch((error) => {
          commit("setEstudiantesLoading", false);
          throw error;
        });
    },
    //Craer, editar estudiante
    saveEstudiante({ commit }, estudiante) {
      let response;
      //Si el id es true significa que vamos actualizar el estudiante
      if (estudiante.id) {
        response = axiosClient
          .put(`/estudiantes/${estudiante.id}`, estudiante)
          .then((res) => {
            commit("setCurrentEstudiante", res.data.data);
            console.log("Estudiante editado...");
            return res.data;
          })
          .catch((error) => {
            throw error;
          });
      } else {
        response = axiosClient
          .post(`/estudiantes`, estudiante)
          .then((res) => {
            if (res.data.status === 200) {
              commit("setCurrentEstudiante", res.data.data);
              console.log("Estudiante creado...");
            }
            return res.data;
          })
          .catch((error) => {
            throw error;
          });
      }
      return response;
    },
    //todos los profesores
    getProfesores({ commit }) {
      commit("setProfesoresLoading", true);

      return axiosClient
        .get(`/profesores`)
        .then((res) => {
          commit("setProfesoresLoading", false);
          commit("setProfesores", res.data.data);
          console.log("Todos los Profesores...");
          return res.data;
        })
        .catch((error) => {
          commit("setProfesoresLoading", false);
          throw error;
        });
    },
    //Un profesor
    getProfesor({ commit }, id) {
      commit("setCurrentProfesorLoading", true);

      return axiosClient
        .get(`/profesores/${id}`)
        .then((res) => {
          commit("setCurrentProfesor", res.data.data);
          commit("setCurrentProfesorLoading", false);
          console.log("Profesor obtenido por un id...");
          return res;
        })
        .catch((error) => {
          commit("setCurrentProfesorLoading", false);
          throw error;
        });
    },
    //Craer, editar profesores
    saveProfesor({ commit }, profesor) {
      let response;
      //Si el id es true significa que vamos actualizar el profesor
      if (profesor.id) {
        response = axiosClient
          .put(`/profesores/${profesor.id}`, profesor)
          .then((res) => {
            commit("setCurrentProfesor", res.data.data);
            console.log("Profesor editado...");
            return res.data;
          })
          .catch((error) => {
            throw error;
          });
      } else {
        response = axiosClient
          .post(`/profesores`, profesor)
          .then((res) => {
            if (res.data.status === 200) {
              commit("setCurrentProfesor", res.data.data);
              console.log("Profesor creado...");
            }
            return res.data;
          })
          .catch((error) => {
            throw error;
          });
      }
      return response;
    },
    //todos los Asignaturas
    getAsignaturas({ commit }) {
      commit("setAsignaturasLoading", true);

      return axiosClient
        .get(`/asignaturas`)
        .then((res) => {
          commit("setAsignaturasLoading", false);
          commit("setAsignaturas", res.data.data);
          console.log("Todos los Asignaturas...");
          return res.data;
        })
        .catch((error) => {
          commit("setAsignaturasLoading", false);
          throw error;
        });
    },
    //roles
    getRoles({ commit }) {
      return axiosClient
        .get(`/roles`)
        .then((res) => {
          commit("setRoles", res.data.data);
          console.log("Todos los Roles...");
          return res.data;
        })
        .catch((error) => {
          throw error;
        });
    },
    //todos los usuarios
    getUsuarios({ commit }) {
      commit("setUsuariosLoading", true);

      return axiosClient
        .get(`/usuarios`)
        .then((res) => {
          commit("setUsuariosLoading", false);
          commit("setUsuarios", res.data.data);
          console.log("Todos los usuarios...");
          return res.data;
        })
        .catch((error) => {
          commit("setUsuariosLoading", false);
          throw error;
        });
    },
    //Todas las  matriculas
    getMatriculas({ commit }) {
      commit("setMatriculasLoading", true);

      return axiosClient
        .get(`/matriculas`)
        .then((res) => {
          commit("setMatriculasLoading", false);
          commit("setMatriculas", res.data.data);
          console.log("Todos los Matriculas...");
          return res.data;
        })
        .catch((error) => {
          commit("setMatriculasLoading", false);
          throw error;
        });
    },
    //Todas las clases
    getClases({ commit }) {
      commit("setClasesLoading", true);
      return axiosClient
        .get(`/clases`)
        .then((res) => {
          commit("setClasesLoading", false);
          commit("setClases", res.data.data);
          console.log("Todos los Clases...");
          console.log(res.data.data);
          return res.data;
        })
        .catch((error) => {
          commit("setClasesLoading", false);
          throw error;
        });
    },
    saveUser({ commit }, usuario) {
      let response = axiosClient
        .post(`/usuarios`, usuario)
        .then((res) => {
          if (res.data.status === 200) {
            console.log("usuarios creado...");
          }
          console.log(res.data);
          return res.data;
        })
        .catch((error) => {
          throw error;
        });

      return response;
    },
    login({ commit }, user) {
      return axiosClient.post("/login", user).then(({ data }) => {
        if (data.status === 200) {
          commit("setUser", data);
        }
        console.log("login");
        return data;
      });
    },
    logout({ commit }) {
      return axiosClient
        .post("/logout")
        .then(({ data }) => {
          commit("logout");
          console.log("logout");
          return data;
        })
        .catch((error) => {
          commit("logout");
          return error;
        });
    },
  },
  mutations: {
    setCurrentEstudianteLoading: (state, loading) => {
      state.currentEstudiante.loading = loading;
    },
    setCurrentEstudiante: (state, estudiante) => {
      state.currentEstudiante.data = estudiante;
    },
    setEstudiantesLoading: (state, loading) => {
      state.estudiantes.loading = loading;
    },
    setEstudiantes: (state, estudiantes) => {
      state.estudiantes.data = estudiantes;
    },
    setUsuariosLoading: (state, loading) => {
      state.usuarios.loading = loading;
    },
    setUsuarios: (state, usuarios) => {
      state.usuarios.data = usuarios;
    },
    setProfesoresLoading: (state, loading) => {
      state.profesores.loading = loading;
    },
    setProfesores: (state, profesores) => {
      state.profesores.data = profesores;
    },
    setCurrentProfesorLoading: (state, loading) => {
      state.currentProfesor.loading = loading;
    },
    setCurrentProfesor: (state, profesor) => {
      state.currentProfesor.data = profesor;
    },
    setAsignaturasLoading: (state, loading) => {
      state.asignaturas.loading = loading;
    },
    setAsignaturas: (state, asignaturas) => {
      state.asignaturas.data = asignaturas;
    },
    setMatriculasLoading: (state, loading) => {
      state.matriculas.loading = loading;
    },
    setMatriculas: (state, matriculas) => {
      state.matriculas.data = matriculas;
    },
    setClasesLoading: (state, loading) => {
      state.clases.loading = loading;
    },
    setClases: (state, clases) => {
      state.clases.data = clases;
    },
    setRoles: (state, roles) => {
      state.roles = roles;
    },
    logout: (state) => {
      state.user.data = {};
      state.user.token = null;
      sessionStorage.removeItem("TOKEN");
      sessionStorage.removeItem("id");
    },
    setUser: (state, userData) => {
      state.user.token = userData.token;
      state.user.data = userData.usuario;
      sessionStorage.setItem("TOKEN", userData.token);
      sessionStorage.setItem("id", userData.usuario.rol_id);
    },
  },
  modules: {},
});

export default store;
