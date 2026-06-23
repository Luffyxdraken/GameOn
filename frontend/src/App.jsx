import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Members from "./pages/Members";
import Messages from "./pages/Messages";
import Leaderboard from "./pages/Leaderboard";
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

    {/* First Page */}
    <Route path="/" element={<Login />} />

    {/* Register */}
    <Route
      path="/register"
      element={<Register />}
    />

    {/* Main Platform */}
    <Route
  path="/dashboard"
  element={<Dashboard />}
/>

    {/* User Pages */}
    <Route
      path="/profile"
      element={<Profile />}
    />

    <Route
      path="/members"
      element={<Members />}
    />

    <Route
      path="/leaderboard"
      element={<Leaderboard />}
/>
    
    <Route
      path="/messages"
      element={<Messages />}
    />

    <Route
      path="/guilds"
      element={<Guilds />}
    />

    <Route
      path="/mymatches"
      element={<MyMatches />}
    />

    <Route
      path="/notifications"
      element={<Notifications />}
    />

    {/* Tournament */}
    <Route
      path="/tournament/:id"
      element={<Tournament />}
    />

    {/* Admin */}
    <Route
      path="/admin"
      element={<Admin />}
    />

    {/* Super Admin */}
    <Route
      path="/superadmin"
      element={<SuperAdmin />}
    />

  </Routes>
</BrowserRouter>

);
}

export default App;
