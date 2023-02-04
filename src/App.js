import "./App.css";
import { LeerDB } from "./components/LeerDB";
import { AgregarEstudiante } from "./components/AgregarEstudiante";

function App() {
  return (
    <div className="App">
      <AgregarEstudiante />
      <LeerDB />
    </div>
  );
}

export default App;
