const express = require("express");
const router = express.Router();
require("../db/connection");
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const authenticate = require("../middleware/authenticate");

router.get("/", (req, res) => {
  res.send("Home Page router");
});

// Promises
// router.post("/register", (req, res) => {
//   const { name, email, phone, work, password, cpassword } = req.body;
//   if (!name || !email || !phone || !work || !password || !cpassword) {
//     return res.status(422).json({ error: "plz filled the feild properly" });
//   }

//   User.findOne({ email: email })
//     .then((userExist) => {
//       if (userExist) {
//         res.status(422).json({ error: "Email Already Exist" });
//       }

//       const user = new User({ name, email, phone, work, password, cpassword });
//       user
//         .save()
//         .then(() => {
//           res.status(201).json({ message: "registered successfuly" });
//         })
//         .catch((err) => {
//           res.status(500).json({ error: "Failed registered" });
//         });
//     })
//     .catch((err) => console.log(err));
// });

// Async - Await
router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;
  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "plz filled the feild properly" });
  }

  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      res.status(422).json({ error: "Email Already Exist" });
    } else if (password != cpassword) {
      res.status(422).json({ error: "Password are not Matching" });
    } else {
      const user = new User({ name, email, phone, work, password, cpassword });
      await user.save();
      res.status(201).json({ message: "registered successfuly" });
    }
  } catch (err) {
    console.log(err);
  }
});

// login code
router.post("/signin", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;
    const emailExist = await User.findOne({ email: email });
    if (emailExist) {
      const match = await bcrypt.compare(password, emailExist.password);
      token = await emailExist.generateAuthToken();
      //  console.log(token);
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });
      if (!match) {
        res.status(422).json({ error: "Invalid Confidential" });
      } else {
        res.status(201).json({ message: "Login Successfully" });
      }
    } else {
      res.status(422).json({ error: "Invalid Confidential" });
    }
  } catch (error) {
    console.log(error);
  }
});

// about ka page
router.get("/about", authenticate, (req, res) => {
  res.send(req.rootUser);
});

// get user data for contact & home
router.get("/getdata", authenticate, (req, res) => {
  res.send(req.rootUser);
});

// contact form data
router.post("/contact", authenticate, async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !phone || !message) {
      res.json({ error: "plz fill the form properly" });
    }
    const userContact = await User.findOne({ _id: req.userID });
    if (userContact) {
      const userMessage = await userContact.addMessage(
        name,
        email,
        phone,
        message
      );
      await userContact.save();
      res.status(201).json({ message: "your message send" });
    }
  } catch (error) {
    console.log(error);
  }
});

// logout
router.get("/logout", (req, res) => {
  res.clearCookie("jwtoken", { path: "/" });
  // res.cookie("jwtoken", "", { expires: new Date(0), httpOnly: true, sameSite: "None", secure: true });
});

module.exports = router;
