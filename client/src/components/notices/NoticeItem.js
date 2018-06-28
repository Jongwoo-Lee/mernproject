import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
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
    const { notice } = this.props;
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
                <b>{notice.name}</b>&nbsp;<i>{date}</i>
              </small>
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

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
