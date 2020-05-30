const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// Importing routes
const authRoute = require("./routes/auth");

const PORT = 8000;
dotenv.config();

// Connect to DB
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log("connected to db!");
    }
);

// Middleware
app.use(express.json());

// Route MiddleWare
app.use("/api/user", authRoute);

app.listen(PORT, () => console.log("Server is running on port: " + PORT));
