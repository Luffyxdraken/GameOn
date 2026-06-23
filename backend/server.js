require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const app = express();

/*

DATABASE

*/

connectDB();

/*

MIDDLEWARE

*/

app.use(cors());
app.use(express.json());

/*

ROUTES

*/

app.use(
"/api/auth",
require("./routes/auth")
);

app.use(
"/api/tournaments",
require("./routes/tournament")
);

app.use(
"/api/users",
require("./routes/user")
);

app.use(
"/api/announcements",
require("./routes/announcement")
);

/*

HOME

*/

app.get("/", (req, res) => {
res.json({
success: true,
message:
"PR eSports API Running"
});
});

/*

404

*/

app.use((req, res) => {
res.status(404).json({
success: false,
message: "Route not found"
});
});

/*

START SERVER

*/

const PORT =
process.env.PORT || 5000;

app.listen(PORT, () => {
console.log(
"🚀 Server running on port ${PORT}"
);
});
