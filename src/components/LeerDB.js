import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";

export const LeerDB = () => {
  const [estudiantes, setEstudiantes] = useState([]);

  //Actualizar Datos de un Estudiante.
  const [actualizarNombre, setNombre] = useState("");
  const [actualizarApellido, setApellido] = useState("");
  const [actualizarEdad, setEdad] = useState(0);
  const [actualizarFechaNacimiento, setFechaNacimiento] = useState("");
  const [actualizarFechaInscripcion, setFechaInscripcion] = useState("");
  const [actualizarCosto, setCosto] = useState(0);

  const estudiantesCollectionRef = collection(db, "estudiantes");

  //funcion para actualizar datos de un estudiante.
  const actualizarEstudiante = async (
    id,
    nombre,
    apellido,
    edad,
    fechaNacimiento,
    fechaInscripcion
  ) => {
    const estudianteDoc = doc(db, "estudiantes", id);

    const datosNuevos = {
      nombre: actualizarNombre,
      apellido: actualizarApellido,
      edad: Number(actualizarEdad),
      fecha: actualizarFechaNacimiento,
      fechaInscripcion: actualizarFechaInscripcion,
    };
    await updateDoc(estudianteDoc, datosNuevos);
  };

  const eliminarEstudiante = async (id) => {
    const estudianteDoc = doc(db, "estudiantes", id);
    await deleteDoc(estudianteDoc);
  };

  //Actualiza cada vez que un nuevo estudiante es agregado.
  useEffect(() => {
    const getEstudiantes = async () => {
      const data = await getDocs(estudiantesCollectionRef);
      setEstudiantes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getEstudiantes();
  });

  return (
    <>
      {estudiantes.map((estudiante) => {
        return (
          <div>
            {/* Leyendo los estudiantes registrados en la base de datos */}
            <p>----------------------------------------------</p>
            <h2>Nombre: {estudiante.nombre}</h2>
            <h2>Apellido: {estudiante.apellido}</h2>
            <h2>Edad: {estudiante.edad}</h2>
            <h2>Fecha de Nacimiento: {estudiante.fecha}</h2>
            <h2>Fecha de Inscripcion: {estudiante.fechaInscripcion}</h2>
            <h2>Costo de la mensualidad: {estudiante.costo}$</h2>
            <p>----------------------------------------------</p>
            {/* Formulario para Actualizar los datos de algun estudiante */}
            <input
              placeholder="Nombre.."
              onChange={(e) => setNombre(e.target.value)}
            />
            <br />
            <input
              placeholder="Apellido.."
              onChange={(e) => setApellido(e.target.value)}
            />
            <br />
            <input
              placeholder="Edad.."
              type="number"
              onChange={(e) => setEdad(e.target.value)}
            />
            <br />
            <label>Fecha de Nacimiento</label>
            <br />
            <input
              type="date"
              onChange={(e) => setFechaNacimiento(e.target.value)}
            />
            <br />
            <label>Fecha de Inscripcion</label>
            <br />
            <input
              type="date"
              onChange={(e) => setFechaInscripcion(e.target.value)}
            />
            <br />
            {/* Boton para actualizar los datos ingresados en el formulario */}
            <button
              onClick={() =>
                actualizarEstudiante(
                  estudiante.id,
                  estudiante.nombre,
                  estudiante.apellido,
                  estudiante.edad,
                  estudiante.fecha,
                  estudiante.fechaInscripcion
                )
              }
            >
              Actualizar Estudiante
            </button>
            {/* Boton para eliminar estudiante */}
            <button onClick={() => eliminarEstudiante(estudiante.id)}>
              Eliminar Estudiante
            </button>
          </div>
        );
      })}
    </>
  );
};
