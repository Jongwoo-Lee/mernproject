import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import NoticeForm from "./NoticeForm";
import NoticeFeed from "./NoticeFeed";
import Spinner from "../common/spinner";
import { getNotices } from "../../actions/noticeActions";
import Pagination from "../common/Pagination";

class Notices extends Component {
  constructor() {
    super();
    this.state = {
      isPost: false,
      width: window.innerWidth
    };

    this.onChangePage = this.onChangePage.bind(this);
  }

  componentWillMount() {
    window.addEventListener("resize", this.handleWindowSizeChange);
  }

  // make sure to remove the listener
  // when the component is not mounted anymore
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  componentDidMount() {
    this.props.getNotices(1);
  }

  onChangePage(page) {
    this.props.getNotices(page);
  }

  onPostClick() {
    this.setState({ isPost: !this.state.isPost });
  }

  render() {
    const { notices, loading, pages, current } = this.props.notice;
    const { admin } = this.props.auth.user;
    let postSubmitform, postContent;

    const { width } = this.state;
    const isMobile = width <= 500;

    if (admin && this.state.isPost) {
      postSubmitform = <NoticeForm />;
    } else {
      postSubmitform = null;
    }

    if (notices === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <NoticeFeed notices={notices} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-10">
                  <h1 className="mb-4">공지사항</h1>
                </div>
                {admin ? (
                  <div className="col-md-1">
                    <button
                      onClick={this.onPostClick.bind(this)}
                      type="button"
                      className=" btn btn-lg btn-light mr-1"
                    >
                      <i className="fas fa-paste" />
                      <span className="badge badge-light">글쓰기</span>
                    </button>
                  </div>
                ) : null}
              </div>
              {postSubmitform}
              {postContent}
              <Pagination
                maxPage={pages}
                currentPage={Number(current)}
                onChangePage={this.onChangePage}
                isMobile={isMobile}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Notices.propTypes = {
  getNotices: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  notice: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  notice: state.notice
});

export default connect(
  mapStateToProps,
  { getNotices }
)(Notices);
