const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const users = require("./routes/api/users");
const posts = require("./routes/api/posts");
const notice = require("./routes/api/notice");
const profile = require("./routes/api/profile");
const upload = require("./routes/api/upload");

const app = express();

// // CORS Middleware
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:5000");
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, DELETE, OPTIONS, HEAD, PATCH"
//   );
//   res.header("Access-Control-Max-Age", "86400");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Access-Control-Request-Method, Access-Control-Request-Headers"
//   );
//   next();
// });

// Passport Config
const passport = require("passport");
const social = require("./config/passport")(app, passport);

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").database;
// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Use Routes
app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/notice", notice);
app.use("/api/profile", profile);
app.use("/api/upload", upload);

// Server static assets if in production
//if (process.env.NODE_ENV === "production") {
// Set static folder
app.use(express.static("client/build"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});
//}

const port = 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
