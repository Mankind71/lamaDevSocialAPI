const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();;
const helmet = require("helmet");
const morgan = require("morgan");
const app = express();
const PORT = 5000;

const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const authRoute = require("./routes/auth");

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to MongoDB")
);

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.get("/", (req, res) => res.send("homepage"));

app.use("/api/posts", postRoute);
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

app.listen(PORT, () =>
  console.log(`Server running on port: http://localhost:${PORT}`)
);
