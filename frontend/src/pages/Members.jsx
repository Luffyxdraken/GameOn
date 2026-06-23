import { useEffect, useState } from "react";
import api from "../api/axios";

function Members() {

const [members, setMembers] =
useState([]);

useEffect(() => {
fetchMembers();
}, []);

const fetchMembers =
async () => {
try {

    const res =
      await api.get(
        "/users"
      );

    setMembers(
      res.data.users || []
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
>
<h1
style={{
color: "#ff7b22"
}}
>
👥 Member Directory
</h1>

  <div
    style={{
      marginTop: "20px"
    }}
  >
    {members.map(
      (member) => (
        <div
          key={member._id}
          style={{
            background:
              "#13203d",
            padding:
              "15px",
            borderRadius:
              "12px",
            marginBottom:
              "15px"
          }}
        >
          <h3>
            {member.username}
          </h3>

          <p>
            Role:
            {" "}
            {member.role}
          </p>

          <p>
            UID:
            {" "}
            {member.uid ||
              "Not Set"}
          </p>

          <p>
            Email:
            {" "}
            {member.email}
          </p>

          <p>
            Points:
            {" "}
            {member.points ||
              0}
          </p>

          <p>
            Kills:
            {" "}
            {member.kills ||
              0}
          </p>
        </div>
      )
    )}
  </div>
</div>

);
}

export default Members;
