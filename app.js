require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const router = require("./Routers/index");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect to mongodb
const mongoDbURL= process.env.MONGODB_URL || "mongodb://localhost:27017/portal-article"
mongoose.connect(mongoDbURL , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});



const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", () => {
  console.log("database connected");
});

app.use(router);

app.listen(PORT, () => {
  console.log("server running on port", PORT);
});


/**
mongodb+srv://prdi-server:4csfFh3PNomoivyY@cluster0.ded7h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority


mongo "mongodb+srv://cluster0.ded7h.mongodb.net/prdi-db" --username prdi-server

mongo "mongodb+srv://cluster0.ded7h.mongodb.net/prdi-db" --username prdi-server

 */