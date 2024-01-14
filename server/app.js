const dotenv = require("dotenv");
const express = require("express");
const cors = require('cors');
const app = express();
require("./db/connection");
const cookieParser = require('cookie-parser');

dotenv.config({ path: "./.env" });
const port = process.env.PORT;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000", // Your frontend server URL
  credentials: true,
}));
app.use(cookieParser());



app.use(require("./router/auth"));

// routing
// app.get("/about", (req, res) => {
//   res.send("About Page");
// });

// app.get("/contact", (req, res) => {
//   res.send("Contact Page");
// });

app.get("/signin", (req, res) => {
  res.send("Login Page");
});

app.get("/signup", (req, res) => {
  res.send("Registration Page");
});

app.listen(port, () => {
  console.log(`server is running at port no ${port}`);
});
