const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const {v4: uuidv4} = require("uuid");
const cookieParser = require("cookie-parser")

const urlRouter = require("./routes/url");
const staticRouter = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const URL = require("./models/url");
const { connectMongoDB } = require("./connection");
const { restrictToLoggedinUserOnly, checkAuth } = require("./middlewares/auth");
const app = express();
const PORT = 8001;

// Connection to DB
connectMongoDB("mongodb://127.0.0.1:27017/short-url").then(() => console.log("Connected to MongoDB"));

// EJS View Engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use("/user", userRoute);
app.use("/url", restrictToLoggedinUserOnly, urlRouter);
app.use("/", checkAuth, staticRouter);


app.listen(PORT, () => console.log("Server started at PORT: " + PORT));