import {BrowserRouter, Routes, Route} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Users from "./pages/Users";
import Estudiante from "./pages/Estudiante";
import JefeCarrera from "./components/JefeCarrera";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="*" element={<Dashboard/>}/>
          <Route path="/users" element={<Users/>}/>
          <Route path="/estudiante" element={<Estudiante/>}/>
          <Route path="/jefecarrera" element={<JefeCarrera/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
