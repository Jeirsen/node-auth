const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const path = require("path");
// Get database object
const config = require("./config/database");

// Connect with database
mongoose.set("useCreateIndex", true);
mongoose
  .connect(config.database, { useNewUrlParser: true })
  .then(() => {
    console.log("database connected successfully");
  })
  .catch(err => {
    console.log(err);
  });

// Initialize the app
const app = express();

// Defining the PORT
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// BodyParser middleware
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.json({
    message: "This is route base for auth system"
  });
});

// Create custom middleware function
const checkUserType = function(req, res, next) {
  const userType = req.originalUrl.split("/")[2];
  require("./config/passport")(userType, passport);
  next();
};
app.use(checkUserType);

// Register routes
const users = require("./routes/users");
const admin = require("./routes/admin");

app.use("/api/users", users);
app.use("/api/admin", admin);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
