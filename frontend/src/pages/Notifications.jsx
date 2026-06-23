function Notifications() {
const notifications = [
{
id: 1,
title: "Tournament Reminder",
message:
"Free Fire MAX Solo Cup starts in 1 hour."
},
{
id: 2,
title: "Room Details Published",
message:
"Room ID and Password are now available."
},
{
id: 3,
title: "Guild Invitation",
message:
"Lost Pirates invited you to join."
},
{
id: 4,
title: "Admin Announcement",
message:
"New Squad Tournament announced."
}
];

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
    {notifications.map((item) => (
      <div
        key={item.id}
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
    ))}
  </div>
</div>

);
}

export default Notifications;
