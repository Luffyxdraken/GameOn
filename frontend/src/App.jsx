import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Members from "./pages/Members";
import Messages from "./pages/Messages";
import Guilds from "./pages/Guilds";
import MyMatches from "./pages/MyMatches";
import Notifications from "./pages/Notifications";
import Admin from "./pages/Admin";
import SuperAdmin from "./pages/SuperAdmin";
import Tournament from "./pages/Tournament";

function App() {
return (
<BrowserRouter>
<Routes>

    {/* Public Pages */}
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    {/* User Dashboard */}
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/members" element={<Members />} />
    <Route path="/messages" element={<Messages />} />
    <Route path="/guilds" element={<Guilds />} />
    <Route path="/mymatches" element={<MyMatches />} />
    <Route path="/notifications" element={<Notifications />} />

    {/* Tournament */}
    <Route
      path="/tournament/:id"
      element={<Tournament />}
    />

    {/* Admin */}
    <Route path="/admin" element={<Admin />} />
    <Route
      path="/superadmin"
      element={<SuperAdmin />}
    />

  </Routes>
</BrowserRouter>

);
}

export default App;
