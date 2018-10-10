const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Post model
const Match = require("../../models/Match");
const Post = require("../../models/Post");
// Profile model
const Profile = require("../../models/Profile");
// Validation
const validateMatchInput = require("../../validation/match");
const validatePostInput = require("../../validation/post");

// @route   GET api/posts/test
// @desc    Test post route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Posts Works" }));

// @route   GET api/match
// @desc    Get Matches
// @access  Public
router.get("/", (req, res) => {
  Match.find()
    .sort({ date: -1 })
    .then(matches => res.json(matches))
    .catch(err =>
      res.status(404).json({ nomatch: "No match is uploaded yet" })
    );
});
// @route   GET api/match/page/:pagenum
// @desc    Get Matches by pagenum
// @access  Public
router.get("/page/:pagenum", (req, res) => {
  const perPage = 8;
  const { pagenum } = req.params;
  Match.find()
    .sort({ start: -1 })
    .skip(perPage * pagenum - perPage)
    .limit(perPage)
    .exec(function(err, matches) {
      Match.countDocuments().exec(function(err, count) {
        if (err) return next(err);
        res.json({
          matches: matches,
          current: pagenum,
          pages: Math.ceil(count / perPage)
        });
      });
    });
  //.catch(err => res.status(404).json({ nopost: "No post is uploaded yet" }));
});

// @route   GET api/match/:id
// @desc    Get Match by id
// @access  Public
router.get("/:id", (req, res) => {
  Match.findById(req.params.id)
    .then(match => res.json(match))
    .catch(err =>
      res.status(404).json({ nomatchfound: "등록된 경기가 없습니다." })
    );
  //.catch(err => res.status(404).json({ nopost: "No post is uploaded yet" }));
});

// @route   POST api/match
// @desc    Create match
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateMatchInput(req.body);

    //Check Validation
    if (!isValid) {
      // If any errors, send 400 with error object
      return res.status(400).json(errors);
    }
    const newMatch = new Match({
      type: req.body.type,
      text: req.body.text,
      title: req.body.title,
      start: req.body.start,
      end: req.body.end,
      place: req.body.place,
      user: req.user.id
    });

    newMatch.save().then(match => res.json(match));
  }
);

// @route   POST api/match/result
// @desc    Upload match result
// @access  Private
router.post(
  "/result",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { players, scorer, result } = req.body;
    Match.findOneAndUpdate(
      { _id: req.body.matchID },
      { $set: { players, scorer, result } }
    ).then(match => res.json(match));
  }
);

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id).then(post => {
        // Check for post owner
        if (post.user.toString() !== req.user.id) {
          return res
            .status(401)
            .json({ notauthorized: "User not authorized to delete post" });
        }

        // Delete
        post
          .remove()
          .then(() => {
            res.json({ success: true });
          })
          .catch(err =>
            res.status(404).json({ postnotfound: "No post found" })
          );
      });
    });
  }
);

// @route   POST api/match/comment/:id
// @desc    Add comment to match
// @access  Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    //Check Validation
    if (!isValid) {
      // If any errors, send 400 with error object
      return res.status(400).json(errors);
    }

    Match.findById(req.params.id)
      .then(match => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          thumbnail_image: req.body.thumbnail_image,
          user: req.user.id
        };

        // Add to comments array
        match.comments.unshift(newComment);

        // Save
        match.save().then(match => res.json(match));
      })
      .catch(err => res.status(404).json({ matchnotfound: "No match found" }));
  }
);

// @route   DELETE api/match/comment/:id/:comment_id
// @desc    Remove comment from match
// @access  Private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Match.findById(req.params.id)
      .then(match => {
        // Check to see if comment exists
        if (
          match.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: "Comment does not exist" });
        }

        // Get remove index
        const removeIndex = match.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        // Splice comment out of array
        match.comments.splice(removeIndex, 1);

        // Save
        match.save().then(match => res.json(match));
      })
      .catch(err => res.status(404).json({ matchnotfound: "No match found" }));
  }
);

module.exports = router;
