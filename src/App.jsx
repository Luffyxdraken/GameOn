import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tournament from "./pages/Tournament";
import Admin from "./pages/Admin";

function App() {
return (
<BrowserRouter>
<Routes>
<Route
path="/"
element={<Home />}
/>

    <Route
      path="/login"
      element={<Login />}
    />

    <Route
      path="/register"
      element={<Register />}
    />

    <Route
      path="/admin"
      element={<Admin />}
    />

    <Route
      path="/tournament/:id"
      element={<Tournament />}
    />
  </Routes>
</BrowserRouter>

);
}

export default App;
