import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";
import logo from "../common/images/fct_logo_small.png";

// Components
import MenuDrawer from "./MenuDrawer";

// Material UI
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class Navbar extends Component {
  state = {
    auth: true,
    anchorEl: null,
    menuOpen: false
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  onLogoutClick = e => {
    e.preventDefault();
    this.setState({ anchorEl: null });
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  };

  render() {
    const { auth } = this.props;
    const { anchorEl, menuOpen } = this.state;
    const { classes } = this.props;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={this.toggleDrawer("menuOpen", true)}
            >
              <MenuIcon />
            </IconButton>
            <img src={logo} alt="totallogo" style={{ width: 30, height: 30 }} />
            <Typography
              variant="title"
              color="inherit"
              className={classes.grow}
            >
              &nbsp;&nbsp;FC 토탈
            </Typography>
            {auth.isAuthenticated && (
              <div>
                <IconButton
                  aria-owns={open ? "menu-appbar" : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>프로파일</MenuItem>
                  <MenuItem onClick={this.onLogoutClick}>로그아웃</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
        <MenuDrawer
          toggleDrawer={this.toggleDrawer}
          menuOpen={menuOpen}
          onLogoutClick={this.onLogoutClick}
          auth={auth}
        />
      </div>
    );
  }
}

Navbar.propTypes = {
  clearCurrentProfile: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(withRouter(withStyles(styles)(Navbar)));
