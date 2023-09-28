import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Navbar";
import CreateUser from "./pages/createUser";
import ViewUser from "./pages/viewUser";
import UpdateUser from './pages/updateUser'

function App() {
  return (
    <div className="bg-gray-700 min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={(<Home />)} />
          <Route path="/home" element={(<Home />)} />
          <Route path="/create" element={(<CreateUser />)} />
          <Route path="/viewuser" element={(<ViewUser />)} />
          <Route path="/update/:id" element={(<UpdateUser />)} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
