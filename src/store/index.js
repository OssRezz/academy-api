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
    currentAsignatura: {
      loading: false,
      data: {},
    },
    currentMatricula: {
      loading: false,
      data: {},
    },
    currentClase: {
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
    areas: [],
  },
  getters: {},
  actions: {
    //Una clase
    getClase({ commit }, id) {
      commit("setCurrentClaseLoading", true);

      return axiosClient
        .get(`/clases/${id}`)
        .then((res) => {
          commit("setCurrentClase", res.data.data);
          commit("setCurrentClaseLoading", false);
          console.log("Clase obtenido por un id...");
          return res;
        })
        .catch((error) => {
          commit("setCurrentClaseLoading", false);
          throw error;
        });
    },
    //Craer, editar clases
    saveClase({ commit }, clase) {
      let response;
      //Si el id es true significa que vamos actualizar el profesor
      if (clase.id) {
        response = axiosClient
          .put(`/clases/${clase.id}`, clase)
          .then((res) => {
            commit("setCurrentClase", res.data.data);
            console.log("Clase editado...");
            return res.data;
          })
          .catch((error) => {
            throw error;
          });
      } else {
        response = axiosClient
          .post(`/clases`, clase)
          .then((res) => {
            if (res.data.status === 200) {
              commit("setCurrentClase", res.data.data);
              console.log("Clase creada...");
            }
            return res.data;
          })
          .catch((error) => {
            throw error;
          });
      }
      return response;
    },
    //Una asignatura
    getAsignatura({ commit }, id) {
      commit("setCurrentAsignaturaLoading", true);

      return axiosClient
        .get(`/asignaturas/${id}`)
        .then((res) => {
          commit("setCurrentAsignatura", res.data.data);
          commit("setCurrentAsignaturaLoading", false);
          console.log("Asignatura obtenido por un id...");
          return res;
        })
        .catch((error) => {
          commit("setCurrentAsignaturaLoading", false);
          throw error;
        });
    },
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
    //Un Matricula
    getMatricula({ commit }, id) {
      commit("setCurrentMatriculaLoading", true);

      return axiosClient
        .get(`/matriculas/${id}`)
        .then((res) => {
          commit("setCurrentMatricula", res.data.data);
          commit("setCurrentMatriculaLoading", false);
          console.log("Matricula obtenido por un id...");
          return res;
        })
        .catch((error) => {
          commit("setCurrentMatriculaLoading", false);
          throw error;
        });
    },
    //Craer, editar estudiante
    saveMatricula({ commit }, matricula) {
      let response;
      //Si el id es true significa que vamos actualizar el Matricula
      if (matricula.id) {
        response = axiosClient
          .put(`/matriculas/${matricula.id}`, matricula)
          .then((res) => {
            commit("setCurrentMatricula", res.data.data);
            console.log("Matricula editado...");
            return res.data;
          })
          .catch((error) => {
            throw error;
          });
      } else {
        response = axiosClient
          .post(`/matriculas`, matricula)
          .then((res) => {
            if (res.data.status === 200) {
              commit("setCurrentMatricula", res.data.data);
              console.log("Matricula creada...");
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
    //Craer, editar profesores
    saveAsignatura({ commit }, asignatura) {
      let response;
      //Si el id es true significa que vamos actualizar el profesor
      if (asignatura.id) {
        response = axiosClient
          .put(`/asignaturas/${asignatura.id}`, asignatura)
          .then((res) => {
            commit("setCurrentAsignatura", res.data.data);
            console.log("asignatura editado...");
            return res.data;
          })
          .catch((error) => {
            throw error;
          });
      } else {
        response = axiosClient
          .post(`/asignaturas`, asignatura)
          .then((res) => {
            if (res.data.status === 200) {
              commit("setCurrentAsignatura", res.data.data);
              console.log("asignatura creado...");
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
    //areas
    getAreas({ commit }) {
      return axiosClient
        .get(`/areas`)
        .then((res) => {
          commit("setAreas", res.data.data);
          console.log("Todos los Areas...");
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
    setCurrentMatriculaLoading: (state, loading) => {
      state.currentMatricula.loading = loading;
    },
    setCurrentMatricula: (state, matricula) => {
      state.currentMatricula.data = matricula;
    },
    setCurrentClaseLoading: (state, loading) => {
      state.currentClase.loading = loading;
    },
    setCurrentClase: (state, clase) => {
      state.currentClase.data = clase;
    },
    setCurrentAsignaturaLoading: (state, loading) => {
      state.currentAsignatura.loading = loading;
    },
    setCurrentAsignatura: (state, asignatura) => {
      state.currentAsignatura.data = asignatura;
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
    setAreas: (state, areas) => {
      state.areas = areas;
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
