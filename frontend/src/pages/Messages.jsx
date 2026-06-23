import { useState } from "react";

function Messages() {
const [message, setMessage] = useState("");

const [messages, setMessages] = useState([
{
user: "System",
text: "Welcome to PR eSports Global Chat"
}
]);

const sendMessage = () => {
if (!message.trim()) return;

const user =
  JSON.parse(
    localStorage.getItem("user")
  ) || {};

setMessages([
  ...messages,
  {
    user:
      user.username ||
      "Unknown Player",
    text: message
  }
]);

setMessage("");

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
</h1>

  <div
    style={{
      background: "#13203d",
      borderRadius: "12px",
      padding: "15px",
      height: "60vh",
      overflowY: "auto",
      marginTop: "15px"
    }}
  >
    {messages.map((msg, index) => (
      <div
        key={index}
        style={{
          marginBottom: "12px"
        }}
      >
        <strong
          style={{
            color: "#ff7b22"
          }}
        >
          {msg.user}
        </strong>

        <p>{msg.text}</p>
      </div>
    ))}
  </div>

  <div
    style={{
      display: "flex",
      marginTop: "15px",
      gap: "10px"
    }}
  >
    <input
      type="text"
      placeholder="Type message..."
      value={message}
      onChange={(e) =>
        setMessage(e.target.value)
      }
      style={{
        flex: 1,
        padding: "12px",
        borderRadius: "8px",
        border: "none"
      }}
    />

    <button
      onClick={sendMessage}
      style={{
        background: "#ff7b22",
        color: "white",
        border: "none",
        padding: "12px 20px",
        borderRadius: "8px",
        cursor: "pointer"
      }}
    >
      Send
    </button>
  </div>
</div>

);
}

export default Messages;
