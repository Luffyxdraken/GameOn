import { useEffect, useState } from "react";
import api from "../api/axios";

function Messages() {

const [messages,
setMessages] =
useState([]);

const [text,
setText] =
useState("");

useEffect(() => {

fetchMessages();

const interval =
setInterval(
fetchMessages,
3000
);

return () =>
clearInterval(interval);

}, []);

const fetchMessages =
async () => {

try {

const res =
await api.get(
"/chat"
);

setMessages(
res.data.messages || []
);

} catch (err) {
console.log(err);
}

};

const sendMessage =
async () => {

if (!text) return;

const user =
JSON.parse(
localStorage.getItem(
"user"
)
);

await api.post(
"/chat/send",
{
sender:
user._id,
username:
user.username,
message: text
}
);

setText("");

fetchMessages();

};

return (

<div
style={{
minHeight: "100vh",
background: "#08142e",
color: "white",
padding: "20px"
}}
>
<h1
style={{
color: "#ff7b22"
}}
>
💬 Global Chat
</h1><div
style={{
height: "70vh",
overflowY: "auto",
background: "#13203d",
padding: "15px",
borderRadius: "12px"
}}
>
{messages
.slice()
.reverse()
.map((msg) => (
<div
key={msg._id}
style={{
marginBottom: "10px"
}}
>
<b>
{msg.username}
</b><p>
{msg.message}
</p>
</div>
))}
</div><div
style={{
marginTop: "15px"
}}
>
<input
value={text}
onChange={(e) =>
setText(
e.target.value
)
}
placeholder="Type message..."
style={{
width: "80%",
padding: "10px"
}}
/><button
onClick={
sendMessage
}
style={{
background:
"#ff7b22",
color:
"white",
border:
"none",
padding:
"10px 15px",
marginLeft:
"10px"
}}

«»

Send
</button>

</div>
</div>
);
}export default Messages;
