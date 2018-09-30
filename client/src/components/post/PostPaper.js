import React from "react";
import PropTypes from "prop-types";

// Material UI
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Button from "@material-ui/core/Button";
import ThumbUpIcon from "@material-ui/icons/ThumbUpRounded";
import ThumbDownIcon from "@material-ui/icons/ThumbDownRounded";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";

const PostPaper = props => {
  const {
    post,
    likeByUser,
    isUserPost,
    classes,
    onLikeClick,
    onUnlikeClick,
    onDeleteClick
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
    <Paper className={classes.root}>
      <Grid container spacing={16}>
        <Grid item>
          <ButtonBase className={classes.image}>
            <img
              className={classes.img}
              alt="complex"
              src={post.thumbnail_image}
            />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={16}>
            <Grid item xs>
              <Typography gutterBottom variant="subheading">
                {post.name}
              </Typography>
              <Typography gutterBottom>{post.text}</Typography>
              <Typography color="textSecondary">{date}</Typography>
            </Grid>
            <Grid item xs>
              <Grid item xs container direction="row" spacing={16}>
                <Button
                  size="small"
                  className={classes.controls}
                  aria-label="Like"
                >
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
              </Grid>
            </Grid>
          </Grid>
          {isUserPost ? (
            <Grid item>
              <DeleteIcon
                style={{ cursor: "pointer" }}
                onClick={onDeleteClick(post._id)}
              />
            </Grid>
          ) : null}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PostPaper;
