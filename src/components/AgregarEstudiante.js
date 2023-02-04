import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase";

export const AgregarEstudiante = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [edad, setEdad] = useState(0);
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [fechaInscripcion, setFechaInscripcion] = useState("");
  const costo = 8.33;

  const [error, setError] = useState(false);

  const estudiantesCollectionRef = collection(db, "estudiantes");

  //Funcion para registrar estudiantes nuevos.
  const nuevoEstudiante = async (e) => {
    e.preventDefault();

    //Condicional que detectad que el usuario pulso el boton de inscribirse pero que no lleno ningun dato.
    if (
      nombre.length === 0 ||
      apellido.length === 0 ||
      (edad.length === 0 && edad <= 17) ||
      fechaNacimiento.length === 0 ||
      fechaInscripcion.length === 0
    ) {
      setError(true);
    } //Si el usuario lleno los datos correctamente, se registra
    else if (
      nombre.length === 4 &&
      apellido.length === 4 &&
      edad >= 18 &&
      fechaNacimiento.length > 0 &&
      fechaInscripcion.length > 0
    ) {
      await addDoc(estudiantesCollectionRef, {
        nombre: nombre,
        apellido: apellido,
        edad: Number(edad),
        fecha: fechaNacimiento,
        fechaInscripcion: fechaInscripcion,
        costo: Number(costo),
      });
    }
  };

  return (
    <>
      <form onSubmit={nuevoEstudiante}>
        <input
          placeholder="Nombre.."
          onChange={(e) => setNombre(e.target.value)}
        />
        {error && nombre.length >= 5 ? (
          <label>
            El nombre no puede exceder los 4 caracteres o esta el formulario
            vacio.
          </label>
        ) : (
          ""
        )}
        <br />
        <input
          placeholder="Apellido.."
          onChange={(e) => setApellido(e.target.value)}
        />
        {error && apellido.length >= 5 ? (
          <label>
            El Apellido no puede exceder los 4 caracteres o esta el formulario
            vacio.
          </label>
        ) : (
          ""
        )}
        <br />
        <input
          placeholder="Edad.."
          type="number"
          onChange={(e) => setEdad(e.target.value)}
        />
        {error && edad <= 17 ? (
          <label>Eres menor de edad o colocaste un dato erroneo.</label>
        ) : (
          ""
        )}
        <br />
        <label>Fecha de nacimiento</label>
        <br />
        <input
          placeholder="Fecha de Nacimiento.."
          type="date"
          onChange={(e) => setFechaNacimiento(e.target.value)}
        />
        {error && fechaNacimiento.length <= 0 ? (
          <label>No puedes dejar este campo vacio.</label>
        ) : (
          ""
        )}
        <br />
        <label>Fecha de Inscripcion</label>
        <br />
        <input
          placeholder="Fecha de Inscripcion.."
          type="date"
          onChange={(e) => setFechaInscripcion(e.target.value)}
        />
        {error && fechaInscripcion.length <= 0 ? (
          <label>No puedes dejar este campo vacio.</label>
        ) : (
          ""
        )}
        <br />
        <label>Costo de la Inscripcion: {costo}$</label>
        <br />
        <button>Inscribirse</button>
      </form>
    </>
  );
};
