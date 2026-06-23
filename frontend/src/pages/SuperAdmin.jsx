import { useEffect, useState } from "react";
import axios from "axios";

function SuperAdmin() {
const [users, setUsers] = useState([]);

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
await axios.put(
`https://pr-esports-gameon.onrender.com/api/users/make-admin/${id}`
);

fetchUsers();

};

const removeAdmin = async (id) => {
await axios.put(
`https://pr-esports-gameon.onrender.com/api/users/remove-admin/${id}`
);

fetchUsers();

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
Super Admin Panel
</h1>

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
      <h3>{user.username}</h3>

      <p>{user.email}</p>

      <p>
        Role: {user.role}
      </p>

      <button
        onClick={() =>
          makeAdmin(user._id)
        }
      >
        Make Admin
      </button>

      <button
        onClick={() =>
          removeAdmin(user._id)
        }
        style={{
          marginLeft: "10px"
        }}
      >
        Remove Admin
      </button>
    </div>
  ))}
</div>

);
}

export default SuperAdmin;
