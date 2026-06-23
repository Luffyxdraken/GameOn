import { useEffect, useState } from "react";
import api from "../api/axios";

function SuperAdminDashboard() {

const [users, setUsers] =
useState([]);

const [guilds, setGuilds] =
useState([]);

const [tournaments, setTournaments] =
useState([]);

useEffect(() => {
loadData();
}, []);

const loadData =
async () => {

try {

const usersRes =
await api.get("/users");

const guildsRes =
await api.get("/guilds");

const tournamentsRes =
await api.get("/tournaments");

setUsers(
usersRes.data.users || []
);

setGuilds(
guildsRes.data.guilds || []
);

setTournaments(
tournamentsRes.data.tournaments || []
);

} catch (err) {
console.log(err);
}

};

return (

<div
style={{
minHeight: "100vh",
background: "#08142e",
color: "white",
padding: "20px"
}}
><h1
style={{
color: "#ff7b22"
}}
>
👑 Supreme Commander Dashboard
</h1><div
style={{
display: "grid",
gridTemplateColumns:
"repeat(auto-fit,minmax(250px,1fr))",
gap: "15px",
marginTop: "20px"
}}
><div
style={{
background: "#13203d",
padding: "20px",
borderRadius: "12px"
}}
>
<h2>👥 Users</h2>
<h1>{users.length}</h1>
</div><div
style={{
background: "#13203d",
padding: "20px",
borderRadius: "12px"
}}
>
<h2>🛡 Guilds</h2>
<h1>{guilds.length}</h1>
</div><div
style={{
background: "#13203d",
padding: "20px",
borderRadius: "12px"
}}
>
<h2>🏆 Tournaments</h2>
<h1>{tournaments.length}</h1>
</div></div><div
style={{
background: "#13203d",
padding: "20px",
borderRadius: "12px",
marginTop: "25px"
}}
>
<h2>⚡ Quick Actions</h2><button
onClick={() =>
window.location.href =
"/superadmin"
}

«»

Manage Admins
</button>

<button
style={{
marginLeft: "10px"
}}
onClick={() =>
window.location.href =
"/admin"
}

«»

Manage Tournaments
</button>

<button
style={{
marginLeft: "10px"
}}
onClick={() =>
window.location.href =
"/guilds"
}

«»

Manage Guilds
</button>

</div></div>
);
}export default SuperAdminDashboard;
