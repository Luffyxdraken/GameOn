import { useEffect, useState } from "react";
import api from "../api/axios";

function Guilds() {

const [guilds, setGuilds] =
useState([]);

const [guildName,
setGuildName] =
useState("");

const [description,
setDescription] =
useState("");

const user =
JSON.parse(
localStorage.getItem("user")
);

useEffect(() => {
fetchGuilds();
}, []);

const fetchGuilds =
async () => {

  const res =
    await api.get(
      "/guilds"
    );

  setGuilds(
    res.data.guilds
  );
};

const createGuild =
async () => {

  await api.post(
    "/guilds/create",
    {
      name: guildName,
      description,
      userId: user._id
    }
  );

  setGuildName("");
  setDescription("");

  fetchGuilds();
};

const joinGuild =
async (guildId) => {

  await api.post(
    `/guilds/join/${guildId}`,
    {
      userId: user._id
    }
  );

  fetchGuilds();
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
🛡 Guild System
</h1>

  <div
    style={{
      background: "#13203d",
      padding: "20px",
      borderRadius: "12px"
    }}
  >
    <input
      placeholder="Guild Name"
      value={guildName}
      onChange={(e)=>
        setGuildName(
          e.target.value
        )
      }
    />

    <br /><br />

    <input
      placeholder="Description"
      value={description}
      onChange={(e)=>
        setDescription(
          e.target.value
        )
      }
    />

    <br /><br />

    <button
      onClick={createGuild}
    >
      Create Guild
    </button>
  </div>

  <div
    style={{
      marginTop: "20px"
    }}
  >
    {guilds.map(
      (guild) => (
        <div
          key={guild._id}
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
            {guild.name}
          </h3>

          <p>
            {
              guild.description
            }
          </p>

          <p>
            Leader:
            {" "}
            {
              guild.leader
                ?.username
            }
          </p>

          <p>
            Members:
            {" "}
            {
              guild.members
                ?.length
            }
          </p>

          <button
            onClick={() =>
              joinGuild(
                guild._id
              )
            }
          >
            Join Guild
          </button>

          <div
            style={{
              marginTop:
                "10px"
            }}
          >
            <b>
              Members:
            </b>

            {guild.members?.map(
              (member) => (
                <p
                  key={
                    member._id
                  }
                >
                  • {
                    member.username
                  }
                </p>
              )
            )}
          </div>
        </div>
      )
    )}
  </div>
</div>

);
}

export default Guilds;
