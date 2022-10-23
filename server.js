const express = require("express");
const app = express();
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
const port = process.env.PORT || 5001;
app.use(express.json());

const usersRoute = require("./routes/usersRoute");
const busesRoute = require("./routes/busesRoute");

app.use("/api/users", usersRoute);
app.use("/api/buses", busesRoute);
app.listen(port, () => console.log(`Node server listening on port ${port}!`));
