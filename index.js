const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const flash = require("express-flash");

const route = require("./routers");

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "uSSSfiEKds7n5s",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());

app.use(route);

app.listen(3000, () => {
  console.log("Running on localhost:3000");
});