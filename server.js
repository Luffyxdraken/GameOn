const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

/*
MIDDLEWARE
*/
app.use(cors());
app.use(express.json());

/*
MONGODB CONNECTION
*/
mongoose
.connect(process.env.MONGO_URI)
.then(() => {
console.log("MongoDB Connected");
})
.catch((err) => {
console.error(err);
});

/*
ROUTES
*/
app.use("/api/auth", require("./routes/auth"));

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
HOME
*/
app.get("/", (req, res) => {
res.json({
message: "PR eSports API Running"
});
});

/*
SERVER
*/
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
console.log(
"Server running on port ${PORT}"
);
});
