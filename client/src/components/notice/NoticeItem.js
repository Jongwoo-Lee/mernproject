import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { withRouter } from "react-router-dom";
import { deleteNotice, addLike, removeLike } from "../../actions/noticeActions";

export class NoticeItem extends Component {
  onDeleteClick(id) {
    this.props.deleteNotice(id);
  }

  onPostClick(id) {
    this.props.history.push(`/notice/${id}`);
  }

  onLikeClick(id) {
    this.props.addLike(id);
  }

  onUnlikeClick(id) {
    this.props.removeLike(id);
  }

  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { notice, auth, showActions } = this.props;

    const date = new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric"
    }).format(new Date(notice.date));

    return (
      <div className="notice">
        <div className="card card-body mb-3">
          <div className="row">
            <div className="col-md-10">
              <h3 onClick={this.onPostClick.bind(this, notice._id)}>
                {notice.title}
              </h3>
              <small>
                <i>{date}</i>
              </small>
              <br />
              <br />
              <p
                className="lead"
                onClick={this.onPostClick.bind(this, notice._id)}
              >
                {notice.text}
              </p>
              {showActions ? (
                <span>
                  <button
                    onClick={this.onLikeClick.bind(this, notice._id)}
                    type="button"
                    className="btn btn-light mr-1"
                  >
                    <i
                      className={classnames("fas fa-thumbs-up", {
                        "text-info": this.findUserLike(notice.likes)
                      })}
                    />
                    <span className="badge badge-light">
                      {notice.likes.length}
                    </span>
                  </button>{" "}
                  <button
                    onClick={this.onUnlikeClick.bind(this, notice._id)}
                    type="button"
                    className="btn btn-light mr-1"
                  >
                    <i className="text-secondary fas fa-thumbs-down" />
                  </button>
                  {notice.user === auth.user.id ? (
                    <button
                      onClick={this.onDeleteClick.bind(this, notice._id)}
                      type="button"
                      className="float-right align-top btn btn-light mr-1"
                    >
                      <i className="fas fa-times" />
                    </button>
                  ) : null}
                </span>
              ) : null}
            </div>
            <div className="col-md-2">
              <a href="/profile">
                <img
                  className="rounded-circle d-none d-md-block"
                  src={notice.thumbnail_image}
                  alt=""
                />
              </a>
              <br />
              <p className="text-center">
                <b>{notice.name}</b>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

NoticeItem.defaultProps = {
  showActions: true
};

NoticeItem.propTypes = {
  deleteNotice: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  notice: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {
  deleteNotice,
  addLike,
  removeLike
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NoticeItem));
