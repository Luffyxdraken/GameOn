import { useEffect, useState } from "react";
import api from "../api/axios";

function Members() {
const [members, setMembers] = useState([]);
const [search, setSearch] = useState("");

useEffect(() => {
fetchMembers();
}, []);

const fetchMembers = async () => {
try {
const res = await api.get("/users");

  setMembers(
    res.data.users || []
  );
} catch (err) {
  console.log(err);
}

};

const filteredMembers =
members.filter((member) =>
member.username
?.toLowerCase()
.includes(search.toLowerCase())
);

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
👥 Members Directory
</h1>

  <input
    type="text"
    placeholder="Search player..."
    value={search}
    onChange={(e) =>
      setSearch(e.target.value)
    }
    style={{
      width: "100%",
      padding: "12px",
      marginTop: "15px",
      borderRadius: "8px",
      border: "none"
    }}
  />

  <div
    style={{
      marginTop: "20px"
    }}
  >
    {filteredMembers.length === 0 ? (
      <div
        style={{
          background: "#13203d",
          padding: "20px",
          borderRadius: "12px"
        }}
      >
        No members found
      </div>
    ) : (
      filteredMembers.map(
        (member) => (
          <div
            key={member._id}
            style={{
              background: "#13203d",
              padding: "15px",
              borderRadius: "12px",
              marginBottom: "12px"
            }}
          >
            <h3>
              {member.username}
            </h3>

            <p>
              {member.email}
            </p>

            <p>
              Role:
              {member.role || "player"}
            </p>
          </div>
        )
      )
    )}
  </div>
</div>

);
}

export default Members;
