import { useEffect, useState } from "react";
import axios from "axios";

function SuperAdmin() {
const [users, setUsers] = useState([]);
const [announcement, setAnnouncement] =
useState("");

useEffect(() => {
fetchUsers();
}, []);

const fetchUsers = async () => {
try {
const res = await axios.get(
"https://pr-esports-gameon.onrender.com/api/users"
);

  setUsers(res.data.users);
} catch (error) {
  console.log(error);
}

};

const makeAdmin = async (id) => {
try {
await axios.put(
"https://pr-esports-gameon.onrender.com/api/users/make-admin/${id}"
);

  fetchUsers();
} catch (error) {
  console.log(error);
}

};

const removeAdmin = async (id) => {
try {
await axios.put(
"https://pr-esports-gameon.onrender.com/api/users/remove-admin/${id}"
);

  fetchUsers();
} catch (error) {
  console.log(error);
}

};

const sendAnnouncement = () => {
alert(
"Announcement Sent: " +
announcement
);

setAnnouncement("");

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
👑 Super Admin Panel
</h1>

  {/* Announcement Section */}

  <div
    style={{
      background: "#13203d",
      padding: "20px",
      borderRadius: "12px",
      marginTop: "20px"
    }}
  >
    <h2>
      📢 Global Announcement
    </h2>

    <textarea
      value={announcement}
      onChange={(e) =>
        setAnnouncement(
          e.target.value
        )
      }
      placeholder="Write announcement..."
      style={{
        width: "100%",
        height: "100px",
        marginTop: "10px",
        borderRadius: "8px",
        padding: "10px"
      }}
    />

    <button
      onClick={sendAnnouncement}
      style={{
        marginTop: "10px",
        background: "#ff7b22",
        color: "white",
        border: "none",
        padding: "12px 20px",
        borderRadius: "8px",
        cursor: "pointer"
      }}
    >
      Send Announcement
    </button>
  </div>

  {/* User Management */}

  <div
    style={{
      marginTop: "30px"
    }}
  >
    <h2>
      👥 User Management
    </h2>

    {users.map((user) => (
      <div
        key={user._id}
        style={{
          background: "#13203d",
          marginTop: "15px",
          padding: "15px",
          borderRadius: "12px"
        }}
      >
        <h3>
          {user.username}
        </h3>

        <p>
          {user.email}
        </p>

        <p>
          Role:
          {" "}
          {user.role}
        </p>

        <button
          onClick={() =>
            makeAdmin(user._id)
          }
          style={{
            background:
              "#16a34a",
            color: "white",
            border: "none",
            padding:
              "10px 15px",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Make Admin
        </button>

        <button
          onClick={() =>
            removeAdmin(
              user._id
            )
          }
          style={{
            background:
              "#dc2626",
            color: "white",
            border: "none",
            padding:
              "10px 15px",
            borderRadius: "8px",
            marginLeft:
              "10px",
            cursor: "pointer"
          }}
        >
          Remove Admin
        </button>
      </div>
    ))}
  </div>
</div>

);
}

export default SuperAdmin;
