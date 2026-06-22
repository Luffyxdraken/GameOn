require("dotenv").config();

const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");

const connectDB = require("./config/db");

const app = express();

/*
CONNECT DATABASE
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
app.use("/api/auth", require("./routes/auth"));

app.use("/api/auth", authRoutes);

app.use("/api/tournaments", require("./routes/tournament"));

app.use("/api/points", require("./routes/points"));

app.use("/api/point-system", require("./routes/pointSystem"));

app.use("/api/announcements", require("./routes/announcement"));

app.use("/api/notifications", require("./routes/notification"));

app.use("/api/match-registration", require("./routes/matchRegistration"));

app.use("/api/results", require("./routes/results"));

app.use("/api/match-results", require("./routes/matchResult"));

app.use("/api/admin-settings", require("./routes/adminSettings"));

app.use("/api/teams", require("./routes/team"));

app.use("/api/chat", require("./routes/chat"));

app.use("/api/scrims", require("./routes/scrim"));

app.use("/api/admin-roles", require("./routes/adminRole"));

app.use("/api/prize-distributions", require("./routes/prizeDistribution"));

/*
HOME ROUTE
*/
app.get("/", (req, res) => {
res.json({
success: true,
message: "PR eSports API Running"
});
});

/*
404 HANDLER
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
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
console.log(
"🚀 Server running on port ${PORT}"
);
});
