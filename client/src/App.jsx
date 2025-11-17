// src/App.jsx
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {BrowserRouter, Routes, Route} from "react-router-dom"

function App() {
  return (
    <AuthProvider>
      {/* Routes example */}
      <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/" element={<h1>Home Page</h1>}/>
      </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
