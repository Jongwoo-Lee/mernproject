const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");

// @route   GET api/users/test
// @desc    Test users route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json({ errors });
    } else {
      const newUser = new User({
        username: req.body.username,
        name: req.body.username,
        email: req.body.email,
        thumbnail_image:
          "https://s3.ap-northeast-2.amazonaws.com/jongwooleetestbucket/default_profile.png",
        password: req.body.password
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

router.put(
  "/name",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const handle = req.body.handle;
    // Find user by email
    User.findById(id).then(user => {
      // Check for user
      if (!user) {
        errors.email = "User not found";
        return res.status(404).json(errors);
      } else {
        user.name = name;
        user.handle = handle;
        user
          .save()
          .then((
            user // User Matched
          ) => {
            const payload = {
              id: user.id,
              name: user.name,
              handle: user.handle,
              thumbnail_image: user.thumbnail_image,
              active: user.active,
              admin: user.admin
            }; // Create JWT payload

            // Sign Token
            jwt.sign(
              payload,
              keys.secret,
              { expiresIn: "2h" },
              (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token
                });
              }
            );
          })
          .catch(err => console.log(err));
      }
    });
  }
);

// @route   POST api/users/login
// @desc    Login user / Returning JWT Token
// @access  Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = {
          id: user.id,
          name: user.name,
          handle: user.handle,
          thumbnail_image: user.thumbnail_image,
          active: user.active,
          admin: user.admin
        }; // Create JWT payload

        // Sign Token
        jwt.sign(payload, keys.secret, { expiresIn: "2h" }, (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token
          });
        });
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route   POST api/users/current
// @desc    Return current user
// @access  Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
