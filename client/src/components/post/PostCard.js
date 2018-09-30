import React from "react";
import PropTypes from "prop-types";

// Material UI
import ThumbUpIcon from "@material-ui/icons/ThumbUpRounded";
import ThumbDownIcon from "@material-ui/icons/ThumbDownRounded";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const PostCard = props => {
  const {
    post,
    likeByUser,
    classes,
    onLikeClick,
    onUnlikeClick,
    onPostClick
  } = props;

  const date = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric"
  }).format(new Date(post.date));

  let likeContent;
  if (likeByUser) {
    likeContent = (
      <ThumbUpIcon
        color="secondary"
        fontSize="small"
        onClick={onLikeClick(post._id)}
      />
    );
  } else {
    likeContent = (
      <ThumbUpIcon fontSize="small" onClick={onLikeClick(post._id)} />
    );
  }

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cover}
        image={post.thumbnail_image}
        title="Live from space album cover"
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography variant="subheading" onClick={onPostClick(post._id)}>
            {post.name}
            &nbsp;&nbsp;&nbsp;
            <small color="grey">
              <i>{date}</i>
            </small>
          </Typography>

          <Typography
            variant="body1"
            color="textSecondary"
            onClick={onPostClick(post._id)}
          >
            {post.text}
          </Typography>

          <div className={classes.button}>
            <Button size="small" className={classes.controls} aria-label="Like">
              {likeContent}
              &nbsp;
              <span>{post.likes.length}</span>
            </Button>
            <Button
              size="small"
              className={classes.controls}
              aria-label="Dislike"
              onClick={onUnlikeClick(post._id)}
            >
              <ThumbDownIcon fontSize="small" />
            </Button>
            <Button
              size="small"
              className={classes.controls}
              aria-label="comments"
              onClick={onPostClick(post._id)}
            >
              댓글 {post.comments.length}
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default PostCard;
