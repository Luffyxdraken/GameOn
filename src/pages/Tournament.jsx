import { useState } from "react";
import { useParams } from "react-router-dom";

function Tournament() {
  const { id } = useParams();

  const [activeTab, setActiveTab] =
    useState("information");

  const tabs = [
    "information",
    "announcements",
    "slots",
    "matches",
    "chat",
    "results"
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "20px"
      }}
    >
      {/* Banner */}
      <div
        style={{
          height: "250px",
          background:
            "linear-gradient(135deg,#ea580c,#f97316)",
          borderRadius: "15px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "25px"
        }}
      >
        <h1
          style={{
            fontSize: "3rem"
          }}
        >
          PR Weekly Scrim
        </h1>
      </div>

      {/* Tournament Info */}
      <div
        style={{
          background: "#1e293b",
          padding: "20px",
          borderRadius: "12px",
          marginBottom: "20px"
        }}
      >
        <h2>Free Fire MAX</h2>

        <p>💰 Prize Pool: ₹1000</p>
        <p>🎟 Entry Fee: ₹50</p>
        <p>👥 Slots: 0 / 12</p>
        <p>📌 Status: Upcoming</p>

        <button
          style={{
            background: "#f97316",
            color: "white",
            border: "none",
            padding: "12px 25px",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Join Tournament
        </button>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          marginBottom: "20px"
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() =>
              setActiveTab(tab)
            }
            style={{
              background:
                activeTab === tab
                  ? "#f97316"
                  : "#1e293b",
              color: "white",
              border: "none",
              padding: "10px 15px",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Information */}
      {activeTab === "information" && (
        <div
          style={{
            background: "#1e293b",
            padding: "20px",
            borderRadius: "12px"
          }}
        >
          <h2>Tournament Information</h2>

          <p>
            Welcome to PR eSports Weekly
            Scrim.
          </p>

          <p>
            Rules:
          </p>

          <ul>
            <li>No hacks</li>
            <li>No teaming</li>
            <li>Follow admin instructions</li>
          </ul>
        </div>
      )}

      {/* Announcements */}
      {activeTab === "announcements" && (
        <div
          style={{
            background: "#1e293b",
            padding: "20px",
            borderRadius: "12px"
          }}
        >
          <h2>Announcements</h2>

          <p>
            No announcements yet.
          </p>
        </div>
      )}

      {/* Slots */}
      {activeTab === "slots" && (
        <div
          style={{
            background: "#1e293b",
            padding: "20px",
            borderRadius: "12px"
          }}
        >
          <h2>Slot List</h2>

          <table
            style={{
              width: "100%"
            }}
          >
            <thead>
              <tr>
                <th>Slot</th>
                <th>Team</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>#1</td>
                <td>Lost Pirates</td>
              </tr>

              <tr>
                <td>#2</td>
                <td>Team Alpha</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Matches */}
      {activeTab === "matches" && (
        <div
          style={{
            background: "#1e293b",
            padding: "20px",
            borderRadius: "12px"
          }}
        >
          <h2>Match Details</h2>

          <p>Room ID: Not Published</p>
          <p>Password: Not Published</p>
          <p>Map: Bermuda</p>
          <p>Start Time: 9:30 PM</p>
        </div>
      )}

      {/* Chat */}
      {activeTab === "chat" && (
        <div
          style={{
            background: "#1e293b",
            padding: "20px",
            borderRadius: "12px"
          }}
        >
          <h2>Tournament Chat</h2>

          <input
            placeholder="Type message..."
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px"
            }}
          />
        </div>
      )}

      {/* Results */}
      {activeTab === "results" && (
        <div
          style={{
            background: "#1e293b",
            padding: "20px",
            borderRadius: "12px"
          }}
        >
          <h2>Results</h2>

          <table
            style={{
              width: "100%"
            }}
          >
            <thead>
              <tr>
                <th>Rank</th>
                <th>Team</th>
                <th>Kills</th>
                <th>Points</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>1</td>
                <td>Lost Pirates</td>
                <td>15</td>
                <td>27</td>
              </tr>

              <tr>
                <td>2</td>
                <td>Team Alpha</td>
                <td>10</td>
                <td>19</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <div
        style={{
          marginTop: "20px",
          color: "#94a3b8"
        }}
      >
        Tournament ID: {id}
      </div>
    </div>
  );
}

export default Tournament;
