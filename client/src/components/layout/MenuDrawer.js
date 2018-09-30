import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Material UI
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import FeedIcon from "@material-ui/icons/ChatOutlined";
import CalendarIcon from "@material-ui/icons/TodayOutlined";
import CollectionIcon from "@material-ui/icons/CollectionsOutlined";
import ResultIcon from "@material-ui/icons/ListAlt";
import FaceIcon from "@material-ui/icons/Face";
import RegisterIcon from "@material-ui/icons/PersonAddOutlined";
import LoginIcon from "@material-ui/icons/ToggleOn";
import LogoutIcon from "@material-ui/icons/ToggleOff";
import NoticeIcon from "@material-ui/icons/NotificationsOutlined";

const styles = {
  list: {
    width: 250
  }
};

const MenuDrawer = props => {
  const { classes, toggleDrawer, menuOpen, onLogoutClick, auth } = props;

  const sideList = auth.isAuthenticated ? (
    <div className={classes.list}>
      <List>
        <ListItem button component={Link} to="/notices">
          <ListItemIcon>
            <NoticeIcon />
          </ListItemIcon>
          <ListItemText primary="공지사항" />
        </ListItem>
        <ListItem button component={Link} to="/feed">
          <ListItemIcon>
            <FeedIcon />
          </ListItemIcon>
          <ListItemText primary="게시판" />
        </ListItem>
        <ListItem button component={Link} to="/dashboard">
          <ListItemIcon>
            <CollectionIcon />
          </ListItemIcon>
          <ListItemText primary="자료실" />
        </ListItem>
        <ListItem button component={Link} to="/schedule">
          <ListItemIcon>
            <CalendarIcon />
          </ListItemIcon>
          <ListItemText primary="스케쥴" />
        </ListItem>
        <ListItem button component={Link} to="/results">
          <ListItemIcon>
            <ResultIcon />
          </ListItemIcon>
          <ListItemText primary="경기결과" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button component={Link} to="/profile">
          <ListItemIcon>
            <FaceIcon />
          </ListItemIcon>
          <ListItemText primary="프로필" />
        </ListItem>
        <ListItem button onClick={onLogoutClick}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="로그아웃" />
        </ListItem>
      </List>
    </div>
  ) : (
    <div className={classes.list}>
      <List>
        <ListItem button component={Link} to="/register">
          <ListItemIcon>
            <RegisterIcon />
          </ListItemIcon>
          <ListItemText primary="회원 가입" />
        </ListItem>
        <ListItem button component={Link} to="/login">
          <ListItemIcon>
            <LoginIcon />
          </ListItemIcon>
          <ListItemText primary="로그인" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <Drawer open={menuOpen} onClose={toggleDrawer("menuOpen", false)}>
      <div
        tabIndex={0}
        role="button"
        onClick={toggleDrawer("menuOpen", false)}
        onKeyDown={toggleDrawer("menuOpen", false)}
      >
        {sideList}
      </div>
    </Drawer>
  );
};

MenuDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  menuOpen: PropTypes.bool.isRequired,
  onLogoutClick: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

export default withStyles(styles)(MenuDrawer);
