import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

function Tournament() {
const { id } = useParams();

const [tournament, setTournament] = useState(null);
const [messages, setMessages] = useState([]);
const [newMessage, setNewMessage] = useState("");
const [timeLeft, setTimeLeft] = useState("");

useEffect(() => {
fetchTournament();
fetchChat();

const chatInterval = setInterval(() => {
fetchChat();
}, 5000);

return () => clearInterval(chatInterval);

}, []);

useEffect(() => {
if (!tournament?.startTime) return;

const interval = setInterval(() => {

const now = new Date().getTime();

const target = new Date(
tournament.startTime
).getTime();

const distance = target - now;

if (distance <= 0) {
setTimeLeft("Tournament Started");
clearInterval(interval);
return;
}

const days = Math.floor(
distance / (1000 * 60 * 60 * 24)
);

const hours = Math.floor(
(distance %
(1000 * 60 * 60 * 24))
/
(1000 * 60 * 60)
);

const minutes = Math.floor(
(distance %
(1000 * 60 * 60))
/
(1000 * 60)
);

const seconds = Math.floor(
(distance %
(1000 * 60))
/
1000
);

setTimeLeft(
"${days}d ${hours}h ${minutes}m ${seconds}s"
);

}, 1000);

return () => clearInterval(interval);

}, [tournament]);

const fetchTournament = async () => {
try {

const res =
await api.get("/tournaments/${id}");

setTournament(
res.data.tournament
);

} catch (err) {
console.log(err);
}
};

const fetchChat = async () => {
try {

const res =
await api.get(
"/tournaments/chat/${id}"
);

setMessages(
res.data.messages || []
);

} catch (err) {
console.log(err);
}
};

const sendMessage = async () => {
try {

const user =
JSON.parse(
localStorage.getItem("user")
);

if (!newMessage.trim()) return;

await api.post(
"/tournaments/chat/${id}",
{
userId: user._id,
message: newMessage
}
);

setNewMessage("");

fetchChat();

} catch (err) {
console.log(err);
}
};

const joinTournament = async () => {
try {

const user =
JSON.parse(
localStorage.getItem("user")
);

await api.post(
"/tournaments/join/${id}",
{
playerId: user._id
}
);

alert("Joined Successfully");

fetchTournament();

} catch (err) {

alert(
err.response?.data?.message ||
"Join Failed"
);

}
};

if (!tournament) {
return (

<div style={{
padding:"20px",
color:"white"
}}>
Loading...
</div>
);
}return (

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
🏆 {tournament.title}
</h1><div style={{
background:"#13203d",
padding:"20px",
borderRadius:"12px",
marginTop:"20px"
}}>
<p>Type: {tournament.type}</p><p>
Prize Pool: ₹{tournament.prizePool}
</p><p>
Slots:
{tournament.filledSlots || 0}
/
{tournament.totalSlots}
</p><p>
Status: {tournament.status}
</p><h2 style={{
color:"#ff7b22"
}}>
{timeLeft}
</h2><button
onClick={joinTournament}
style={{
background:"#ff7b22",
color:"white",
border:"none",
padding:"12px 20px",
borderRadius:"8px",
cursor:"pointer"
}}

«»

Join Tournament
</button>

</div>{tournament.roomId && (

<div style={{
background:"#13203d",
padding:"20px",
borderRadius:"12px",
marginTop:"20px"
}}>
<h2>🔑 Room Details</h2><p>
Room ID:
{tournament.roomId}
</p><p>
Password:
{tournament.roomPassword}
</p></div>
)}<div style={{
background:"#13203d",
padding:"20px",
borderRadius:"12px",
marginTop:"20px"
}}>
<h2>💬 Tournament Chat</h2><div style={{
height:"300px",
overflowY:"auto",
background:"#0f172a",
padding:"10px",
borderRadius:"10px"
}}>
{messages.map((msg,index)=>(
<div
key={index}
style={{
marginBottom:"10px"
}}
>
<b>
{msg.sender?.username ||
"Player"}
:
</b>
{" "}
{msg.message}
</div>
))}
</div><div style={{
display:"flex",
marginTop:"10px"
}}>
<input
value={newMessage}
onChange={(e)=>
setNewMessage(
e.target.value
)
}
placeholder="Type message..."
style={{
flex:1,
padding:"10px"
}}
/><button
onClick={sendMessage}
style={{
background:"#ff7b22",
color:"white",
border:"none",
padding:"10px 20px"
}}

«»

Send
</button>

</div></div></div>
);
}export default Tournament;
