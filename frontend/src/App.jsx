import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tournament from "./pages/Tournament";
import Admin from "./pages/Admin";

import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";
import Members from "./pages/Members";
import Guilds from "./pages/Guilds";
import MyMatches from "./pages/MyMatches";
import Notifications from "./pages/Notifications";
import SuperAdmin from "./pages/SuperAdmin";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tournament/:id" element={<Tournament />} />

        {/* User */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/members" element={<Members />} />
        <Route path="/guilds" element={<Guilds />} />
        <Route path="/mymatches" element={<MyMatches />} />
        <Route path="/notifications" element={<Notifications />} />

        {/* Admin */}
        <Route path="/admin" element={<Admin />} />

        {/* Super Admin */}
        <Route path="/superadmin" element={<SuperAdmin />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
