import { useEffect, useState } from "react";
import api from "../api/axios";

function Notifications() {

const [announcements,
setAnnouncements] =
useState([]);

useEffect(() => {
fetchNotifications();
}, []);

const fetchNotifications =
async () => {
try {

    const res =
      await api.get(
        "/announcements"
      );

    setAnnouncements(
      res.data.announcements || []
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
🔔 Notifications
</h1>

  <div
    style={{
      marginTop: "20px"
    }}
  >
    {announcements.length === 0 ? (

      <div
        style={{
          background: "#13203d",
          padding: "15px",
          borderRadius: "12px"
        }}
      >
        No Notifications Yet
      </div>

    ) : (

      announcements.map((item) => (
        <div
          key={item._id}
          style={{
            background: "#13203d",
            padding: "15px",
            borderRadius: "12px",
            marginBottom: "15px"
          }}
        >
          <h3>
            {item.title}
          </h3>

          <p>
            {item.message}
          </p>

        </div>
      ))

    )}
  </div>
</div>

);
}

export default Notifications;
