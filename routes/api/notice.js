const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Notice model
const Notice = require("../../models/Notice");
// Profile model
const Profile = require("../../models/Profile");
// Validation
const validatePostInput = require("../../validation/post");
const validateNoticeInput = require("../../validation/notice");

// @route   GET api/posts/notice
// @desc    Get Notices
// @access  Public
router.get("/", (req, res) => {
  Notice.find()
    .sort({ date: -1 })
    .then(notices => res.json(notices))
    .catch(err =>
      res.status(404).json({ nonotice: "No notice is uploaded yet" })
    );
});

// @route   GET api/posts/notice/:id
// @desc    Get Notice by id
// @access  Public
router.get("/:id", (req, res) => {
  Notice.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ nonoticefound: "No Notice found with that id" })
    );
});

// @route   POST api/posts/notice
// @desc    Create notice post
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateNoticeInput(req.body);

    //Check Validation
    if (!isValid) {
      // If any errors, send 400 with error object
      return res.status(400).json(errors);
    }
    const newPost = new Notice({
      title: req.body.title,
      text: req.body.text,
      name: req.body.name,
      thumbnail_image: req.body.thumbnail_image,
      user: req.user.id
    });

    newPost.save().then(notice => res.json(notice));
  }
);

// @route   DELETE api/posts/notice/:id
// @desc    Delete notice
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Notice.findById(req.params.id).then(notice => {
        // Check for notice owner
        if (notice.user.toString() !== req.user.id) {
          return res
            .status(401)
            .json({ notauthorized: "User not authorized to delete notice" });
        }

        // Delete
        notice
          .remove()
          .then(() => {
            res.json({ success: true });
          })
          .catch(err =>
            res.status(404).json({ noticenotfound: "No post found" })
          );
      });
    });
  }
);

// @route   POST api/posts/notice/like/:id
// @desc    Like notice
// @access  Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Notice.findById(req.params.id)
        .then(notice => {
          if (
            notice.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: "User already liked this notice" });
          }

          // Add user id to likes array
          notice.likes.unshift({ user: req.user.id });
          notice.save().then(notice => res.json(notice));
        })
        .catch(err =>
          res.status(404).json({ noticenotfound: "No notice found" })
        );
    });
  }
);

// @route   POST api/posts/notice/unlike/:id
// @desc    Unlike notice
// @access  Private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Notice.findById(req.params.id)
        .then(notice => {
          if (
            notice.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: "You have not yet liked this notice" });
          }

          // GEt remove index
          const removeIndex = notice.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          // Splice out of array
          notice.likes.splice(removeIndex, 1);

          // Save
          notice.save().then(notice => res.json(notice));
        })
        .catch(err =>
          res.status(404).json({ noticenotfound: "No post found" })
        );
    });
  }
);

// @route   POST api/posts/notice/comment/:id
// @desc    Add comment to notice
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

    Notice.findById(req.params.id)
      .then(notice => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          thumbnail_image: req.body.thumbnail_image,
          user: req.user.id
        };

        // Add to comments array
        notice.comments.unshift(newComment);

        // Save
        notice.save().then(notice => res.json(notice));
      })
      .catch(err =>
        res.status(404).json({ noticenotfound: "No notice found" })
      );
  }
);

// @route   DELETE api/posts/notice/comment/:id/:comment_id
// @desc    Remove comment from notice
// @access  Private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Notice.findById(req.params.id)
      .then(notice => {
        // Check to see if comment exists
        if (
          notice.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: "Comment does not exist" });
        }

        // Get remove index
        const removeIndex = notice.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        // Splice comment out of array
        notice.comments.splice(removeIndex, 1);

        // Save
        notice.save().then(notice => res.json(notice));
      })
      .catch(err =>
        res.status(404).json({ noticenotfound: "No notice found" })
      );
  }
);

module.exports = router;
