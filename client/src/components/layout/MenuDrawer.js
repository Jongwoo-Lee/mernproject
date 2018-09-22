import React, { Component } from "react";
import PropTypes from "prop-types";

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
import LogoutIcon from "@material-ui/icons/ToggleOff";

const styles = {
  list: {
    width: 250
  }
};

class MenuDrawer extends Component {
  render() {
    const { classes, toggleDrawer, menuOpen, onLogoutClick } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
          <ListItem button component="a" href="/feed">
            <ListItemIcon>
              <FeedIcon />
            </ListItemIcon>
            <ListItemText primary="게시판" />
          </ListItem>
          <ListItem button component="a" href="/dashboard">
            <ListItemIcon>
              <CollectionIcon />
            </ListItemIcon>
            <ListItemText primary="자료실" />
          </ListItem>
          <ListItem button component="a" href="/schedule">
            <ListItemIcon>
              <CalendarIcon />
            </ListItemIcon>
            <ListItemText primary="스케쥴" />
          </ListItem>
          <ListItem button component="a" href="/results">
            <ListItemIcon>
              <ResultIcon />
            </ListItemIcon>
            <ListItemText primary="경기결과" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button component="a" href="/profile">
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
  }
}

MenuDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  menuOpen: PropTypes.bool.isRequired,
  onLogoutClick: PropTypes.func.isRequired
};

export default withStyles(styles)(MenuDrawer);
