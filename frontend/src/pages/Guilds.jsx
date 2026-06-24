import { useEffect, useState } from "react";
import api from "../api/axios";

function Guilds() {

const [guilds, setGuilds] =
useState([]);

const [guildName, setGuildName] =
useState("");

const [description, setDescription] =
useState("");

useEffect(() => {
fetchGuilds();
}, []);

const fetchGuilds = async () => {
try {

const res =
await api.get("/guilds");

setGuilds(
res.data.guilds || []
);

} catch (err) {
console.log(err);
}
};

const createGuild = async () => {
try {

const user =
JSON.parse(
localStorage.getItem("user")
);

await api.post(
"/guilds/create",
{
name: guildName,
description,
userId: user._id
}
);

alert("Guild Created");

setGuildName("");
setDescription("");

fetchGuilds();

} catch (err) {

alert(
err.response?.data?.message ||
"Guild creation failed"
);

}
};

const joinGuild = async (guildId) => {
try {

const user =
JSON.parse(
localStorage.getItem("user")
);

await api.post(
"/guilds/join/${guildId}",
{
userId: user._id
}
);

alert("Joined Guild");

fetchGuilds();

} catch (err) {

alert(
err.response?.data?.message ||
"Join failed"
);

}
};

const deleteGuild = async (guildId) => {
try {

await api.delete(
"/guilds/delete/${guildId}"
);

alert("Guild Deleted");

fetchGuilds();

} catch (err) {

alert("Delete Failed");

}
};

return (

<div
style={{
minHeight:"100vh",
background:"#08142e",
color:"white",
padding:"20px"
}}
><h1 style={{
color:"#ff7b22"
}}>
🛡 Guild System
</h1><div
style={{
background:"#13203d",
padding:"20px",
borderRadius:"12px",
marginTop:"20px"
}}
><h2>Create Guild</h2><input
placeholder="Guild Name"
value={guildName}
onChange={(e)=>
setGuildName(
e.target.value
)
}
style={{
width:"100%",
padding:"10px",
marginTop:"10px"
}}
/>

<textarea
placeholder="Description"
value={description}
onChange={(e)=>
setDescription(
e.target.value
)
}
style={{
width:"100%",
padding:"10px",
marginTop:"10px"
}}
/>

<button
onClick={createGuild}
style={{
background:"#ff7b22",
color:"white",
border:"none",
padding:"10px 20px",
marginTop:"10px",
borderRadius:"8px"
}}
>
Create Guild
</button>

</div>

<div style={{
marginTop:"20px"
}}>

{guilds.map((guild)=>(
<div
key={guild._id}
style={{
background:"#13203d",
padding:"15px",
borderRadius:"12px",
marginBottom:"15px"
}}
>

<h2>
{guild.name}
</h2>

<p>
{guild.description}
</p>

<p>
👑 Leader:
{" "}
{guild.leader?.username}
</p>

<p>
👥 Members:
{" "}
{guild.members?.length}
</p>

<div>

<button
onClick={() =>
joinGuild(guild._id)
}
style={{
background:"#16a34a",
color:"white",
border:"none",
padding:"10px 15px",
borderRadius:"8px",
marginRight:"10px"
}}
>
Join Guild
</button>

<button
onClick={() =>
deleteGuild(guild._id)
}
style={{
background:"#dc2626",
color:"white",
border:"none",
padding:"10px 15px",
borderRadius:"8px"
}}
>
Delete Guild
</button>

</div>

<div
style={{
marginTop:"10px"
}}
>

<h4>
Members
</h4>

{guild.members?.map(
(member)=>(
<div
key={member._id}
>
• {member.username}
</div>
)
)}

</div>

</div>
))}

</div>

</div>
);
}

export default Guilds;
