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
import SvgIcon from "@material-ui/core/SvgIcon";

function TeamIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M17.997 18h-11.995l-.002-.623c0-1.259.1-1.986 1.588-2.33 1.684-.389 3.344-.736 2.545-2.209-2.366-4.363-.674-6.838 1.866-6.838 2.491 0 4.226 2.383 1.866 6.839-.775 1.464.826 1.812 2.545 2.209 1.49.344 1.589 1.072 1.589 2.333l-.002.619zm4.811-2.214c-1.29-.298-2.49-.559-1.909-1.657 1.769-3.342.469-5.129-1.4-5.129-1.265 0-2.248.817-2.248 2.324 0 3.903 2.268 1.77 2.246 6.676h4.501l.002-.463c0-.946-.074-1.493-1.192-1.751zm-22.806 2.214h4.501c-.021-4.906 2.246-2.772 2.246-6.676 0-1.507-.983-2.324-2.248-2.324-1.869 0-3.169 1.787-1.399 5.129.581 1.099-.619 1.359-1.909 1.657-1.119.258-1.193.805-1.193 1.751l.002.463z" />
    </SvgIcon>
  );
}

const styles = {
  list: {
    width: 250
  }
};

const MenuDrawer = props => {
  const { classes, toggleDrawer, menuOpen, onLogoutClick, auth } = props;

  const profileLink = `/profile/${auth.user.handle}`;

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
        <ListItem button component={Link} to="/members">
          <ListItemIcon>
            <TeamIcon />
          </ListItemIcon>
          <ListItemText primary="선수단" />
        </ListItem>
        <ListItem button component={Link} to="/schedule">
          <ListItemIcon>
            <CalendarIcon />
          </ListItemIcon>
          <ListItemText primary="스케쥴" />
        </ListItem>
        <ListItem button component={Link} to="/matches">
          <ListItemIcon>
            <ResultIcon />
          </ListItemIcon>
          <ListItemText primary="경기결과" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button component={Link} to={profileLink}>
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
