import { createStore } from "vuex";
import axiosClient from "../axios.js";

const usuarios = [
  {
    id: 1,
    rol_id: 1,
    name: "Administrador",
    email: "Administrador@gmail.com",
    email_verified_at: "2023-01-25T01:59:16.000000Z",
    created_at: "2023-01-25T01:59:16.000000Z",
    updated_at: "2023-01-25T01:59:16.000000Z",
    rol: {
      id: 1,
      nombre: "Administrador",
      created_at: null,
      updated_at: null,
    },
  },
  {
    id: 2,
    rol_id: 2,
    name: "Usuario",
    email: "Usuario@gmail.com",
    email_verified_at: "2023-01-25T01:59:16.000000Z",
    created_at: "2023-01-25T01:59:16.000000Z",
    updated_at: "2023-01-25T01:59:16.000000Z",
    rol: {
      id: 2,
      nombre: "Usuario",
      created_at: null,
      updated_at: null,
    },
  },
  {
    id: 3,
    rol_id: 3,
    name: "JOSEFA LOPEZ SANCHEZ",
    email: "estudiante1@gmail.com",
    email_verified_at: "2023-01-25T01:59:16.000000Z",
    created_at: "2023-01-25T01:59:16.000000Z",
    updated_at: "2023-01-25T01:59:16.000000Z",
    rol: {
      id: 3,
      nombre: "Estudiante",
      created_at: null,
      updated_at: null,
    },
  },
  {
    id: 4,
    rol_id: 3,
    name: "DAVID FERNANDEZ RUIZ",
    email: "estudiante2@gmail.com",
    email_verified_at: "2023-01-25T01:59:16.000000Z",
    created_at: "2023-01-25T01:59:16.000000Z",
    updated_at: "2023-01-25T01:59:16.000000Z",
    rol: {
      id: 3,
      nombre: "Estudiante",
      created_at: null,
      updated_at: null,
    },
  },
  {
    id: 5,
    rol_id: 3,
    name: "SOFIA MOYA NUNEZ",
    email: "estudiante3@gmail.com",
    email_verified_at: "2023-01-25T01:59:16.000000Z",
    created_at: "2023-01-25T01:59:16.000000Z",
    updated_at: "2023-01-25T01:59:16.000000Z",
    rol: {
      id: 3,
      nombre: "Estudiante",
      created_at: null,
      updated_at: null,
    },
  },
];

const estudiantes = [
  {
    id: 1,
    documento: "1234",
    nombres: "JOSEFA",
    apellidos: "LOPEZ SANCHEZ",
    telefono: "10369572145",
    email: "estudiante1@gmail.com",
    direccion: "asdas",
    ciudad: "Antioquia",
    departamento: "Medellin",
    estado: 1,
    created_at: "2023-01-25T01:59:16.000000Z",
    updated_at: "2023-01-25T01:59:16.000000Z",
  },
  {
    id: 2,
    documento: "1234",
    nombres: "DAVID",
    apellidos: "FERNANDEZ RUIZ",
    telefono: "10369572145",
    email: "estudiante2@gmail.com",
    direccion: "asdas",
    ciudad: "Antioquia",
    departamento: "Medellin",
    estado: 1,
    created_at: "2023-01-25T01:59:16.000000Z",
    updated_at: "2023-01-25T01:59:16.000000Z",
  },
  {
    id: 3,
    documento: "1234",
    nombres: "SOFIA",
    apellidos: "MOYA NUNEZ",
    telefono: "3117562435",
    email: "estudiante3@gmail.com",
    direccion: "Rionegro, Antioquia",
    ciudad: "Medellin",
    departamento: "Rionegro",
    estado: 1,
    created_at: "2023-01-25T01:59:16.000000Z",
    updated_at: "2023-01-25T01:59:16.000000Z",
  },
];

const profesores = [
  {
    id: 1,
    documento: "1002634684",
    nombres: "FRANCISCO",
    apellidos: "LOPEZ SANCHEZ",
    telefono: "10369572145",
    email: "profesor1@gmail.com",
    direccion: "asdas",
    departamento: "Medellin",
    ciudad: "Antioquia",
    estado: 1,
    created_at: "2023-01-25T01:59:16.000000Z",
    updated_at: "2023-01-25T01:59:16.000000Z",
  },
  {
    id: 2,
    documento: "24335463",
    nombres: "MARIA LUISA",
    apellidos: "FERNANDEZ RUIZ",
    telefono: "10369572145",
    email: "profesor2@gmail.com",
    direccion: "asdas",
    departamento: "Medellin",
    ciudad: "Antioquia",
    estado: 1,
    created_at: "2023-01-25T01:59:16.000000Z",
    updated_at: "2023-01-25T01:59:16.000000Z",
  },
  {
    id: 3,
    documento: "1053806651",
    nombres: "ADRIAN",
    apellidos: "MOYA NUNEZ",
    telefono: "3117562435",
    email: "profesor3@gmail.com",
    direccion: "Rionegro, Antioquia",
    departamento: "Rionegro",
    ciudad: "Medellin",
    estado: 1,
    created_at: "2023-01-25T01:59:16.000000Z",
    updated_at: "2023-01-25T01:59:16.000000Z",
  },
];

const asignaturas = [
  {
    id: 1,
    area_id: 1,
    nombre: "Bases de Datos",
    descripcion:
      "Bases de Datos (en lo sucesivo BBDD) es una asignatura obligatoria que consta de 6 créditos y que introducirá al estudiante en las áreas fundamentales de esta materia. Las BBDD son colecciones de datos de cualquier tipo pertenecientes a un mismo contexto y almacenados sistemáticamente para su uso posterior. En este sentido, son de vital importancia para el almacenamiento de grandes cantidades de datos, así como para su rápida y flexible recuperación. Por lo tanto, forman parte de una de las ramas con más aplicación de la informática, estando presentes en la industria, la banca, centros de investigación y en cualquier empresa o institución que requiera la organización y gestión de sus datos de manera eficiente. Una vez terminada la asignatura de BBDD los estudiantes serán capaces tanto de diseñar y desarrollar un modelo de base de datos así como de manejar las BBDD a través de lenguajes de consulta",
    creditos: "6",
    tipo_asignatura: "0",
    estado: 1,
    created_at: "2023-01-25T01:59:16.000000Z",
    updated_at: "2023-01-25T01:59:16.000000Z",
    area: {
      id: 1,
      nombre: "Ciencias Físico - Matemáticas y de las Ingenierías.",
      created_at: null,
      updated_at: null,
    },
  },
  {
    id: 2,
    area_id: 1,
    nombre: "Estructuras de Datos",
    descripcion:
      "La metodología adoptada en esta asignatura para el aprendizaje y evaluación de sus contenidos, se encuentra adecuada a la modalidad de enseñanza a distancia. Junto con el estudio del manual de la asignatura, se encuentran programadas una serie de actividades didácticas evaluables para cada una de las unidades didácticas. Estas actividades consistirán, básicamente, en la búsqueda y análisis de información de fuentes diversas, participación en foros de discusión temáticos, así como la resolución de casos concretos de creación y edición de bases de datos.",
    creditos: "10",
    tipo_asignatura: "1",
    estado: 1,
    created_at: "2023-01-25T01:59:16.000000Z",
    updated_at: "2023-01-25T01:59:16.000000Z",
    area: {
      id: 1,
      nombre: "Ciencias Físico - Matemáticas y de las Ingenierías.",
      created_at: null,
      updated_at: null,
    },
  },
];

const roles = [
  {
    id: 1,
    nombre: "Administrador",
    created_at: null,
    updated_at: null,
  },
  {
    id: 2,
    nombre: "Usuario",
    created_at: null,
    updated_at: null,
  },
];

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
    usuarios: usuarios,
    estudiantes: estudiantes,
    profesores: profesores,
    asignaturas: asignaturas,
    roles: roles,
  },
  getters: {},
  actions: {
    getEstudiante({ commit }, id) {
      commit("setCurrentEstudianteLoading", true);

      return axiosClient
        .get(`/estudiantes/${id}`)
        .then((res) => {
          console.log("obtener por un id");
          console.log(res.data.data);
          commit("setCurrentEstudiante", res.data.data);
          commit("setCurrentEstudianteLoading", false);
          return res;
        })
        .catch((error) => {
          commit("setCurrentEstudianteLoading", false);
          throw error;
        });
    },
    saveEstudiante({ commit }, estudiante) {
      let response;
      //Si el id es true significa que vamos actualizar el estudiante
      if (estudiante.id) {
        response = axiosClient
          .put(`/estudiantes/${estudiante.id}`, estudiante)
          .then((res) => {
            console.log("edit");
            console.log(res);
            commit("updateEstudiante", res.data.data);
            return res;
          })
          .catch((error) => {
            throw error;
          });
      } else {
        response = axiosClient
          .post(`/estudiantes`, estudiante)
          .then((res) => {
            console.log("create: ");
            if (res.data.status === 200) {
              commit("saveEstudiante", res.data.data[1]);
            }
            console.log(res.data.data);
            return res.data;
          })
          .catch((error) => {
            throw error;
          });
      }
      return response;
    },
    login({ commit }, user) {
      return axiosClient.post("/login", user).then(({ data }) => {
        if (data.status === 200) {
          commit("setUser", data);
        }
        console.log(data);
        return data;
      });
    },
    logout({ commit }) {
      return axiosClient
        .post("/logout")
        .then(({ data }) => {
          commit("logout");
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
    saveEstudiante: (state, estudiante) => {
      state.estudiantes = [...state.estudiantes, estudiante];
    },
    updateEstudiante: (state, estudiante) => {
      state.estudiantes = state.estudiantes.map((student) => {
        if (student.id == estudiante.data.id) {
          return estudiante.data;
        }
        return student;
      });
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
