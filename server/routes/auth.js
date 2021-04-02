const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Admin = mongoose.model("Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");
const requireLogin = require("../middleware/requireLogin");
const requireAdmin = require("../middleware/requireAdmin");


//admin signup
router.post("/adminSignup", (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    return res.status(422).json({ error: "please add all the fields" });
  }
  Admin.findOne({ email: email })
    .then((savedAdmin) => {
      if (savedAdmin) {
        return res
          .status(422)
          .json({ error: "Admin already exits with this email" });
      }
      bcrypt.hash(password, 12).then((hashedpassword) => {
        const admin = new Admin({
          email,
          password: hashedpassword,
          name,
        });
        admin
          .save()
          .then((admin) => {
            res.json({ message: "saved" });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
//user signup
router.post("/signup", (req, res) => {
  const { firstName,lastName,dateOfBirth,photo, email, password } = req.body;
  if (!email || !password || !firstName) {
    return res.status(422).json({ error: "please add all the fields" });
  }
  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res
          .status(422)
          .json({ error: "User already exits with this email" });
      }
      bcrypt.hash(password, 12).then((hashedpassword) => {
        const user = new User({
          email,dateOfBirth,photo,
          password: hashedpassword,
          name : {firstName,lastName}
        });
        user
          .save()
          .then((user) => {
            res.json({ message: "saved" });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});


//user Signin
router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "please add email or password" });
  }
  User.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: "Invalid Email or password" });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((doMatch) => {
        if (doMatch) {
          //res.json({message:"successfully signed in"})
          const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
         const email = savedUser.email
         const _id = savedUser._id
         const firstName = savedUser.name.firstName
         const lastName = savedUser.name.lastName
         const  dateOfBirth = savedUser.dateOfBirth
         const ign = savedUser.ign
         
          res.json({ token, user: { _id, email,firstName,lastName,dateOfBirth,ign } });
        } else {
          return res.status(422).json({ error: "Invalid Email or password" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

//admin signin
router.post("/adminSignin", (req, res) => {
  const { email, password, } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "please add email or password" });
  }
  Admin.findOne({ email: email }).then((savedAdmin) => {
    if (!savedAdmin) {
      return res.status(422).json({ error: "Invalid Email or password" });
    }
    bcrypt
      .compare(password, savedAdmin.password)
      .then((doMatch) => {
        if (doMatch) {
          //res.json({message:"successfully signed in"})
          const token = jwt.sign({ _id: savedAdmin._id }, JWT_SECRET);
          const { _id, name, email } = savedAdmin;
          res.json({ token, admin: { _id, name, email } });
        } else {
          return res.status(422).json({ error: "Invalid Email or password" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

router.get("/allAdmin", requireAdmin, (req, res) => {
  Admin.find()
    .then((admin) => {
      res.json({ admin });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/allUser", requireAdmin, (req, res) => {
  User.find()
    .then((admin) => {
      res.json({ admin });
    })
    .catch((err) => {
      console.log(err);
    });
});
module.exports = router;
