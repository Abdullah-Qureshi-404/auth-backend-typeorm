const express = require("express");
const app = express();
const cors = require("cors");
const AppDataSource = require("./src/database/dataSource.js");
const signupRoutes = require("./routes/signup.js");
const loginRoutes = require("./routes/login.js");
require("dotenv").config();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(express.json());
AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log("Error during Data Source initialization", err);
  });

app.get("/", (req, res) => {
  res.send("Testing Express Server");
});

app.use("/api", signupRoutes);
app.use("/api", loginRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server running on http://localhost:3000");
});
