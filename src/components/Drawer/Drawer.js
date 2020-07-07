import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import DashboardIcon from "@material-ui/icons/Dashboard";
import EventIcon from "@material-ui/icons/Event";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PeopleIcon from "@material-ui/icons/People";
import PersonIcon from "@material-ui/icons/Person";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { useTranslation } from "react-i18next";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { AuthContext } from "../../auth/authContext";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    margin: "auto",
    marginTop: "30px",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
}));

function ResponsiveDrawer(props) {
  const { t } = useTranslation();
  const classes = useStyles();
  const theme = useTheme();
  const authContext = useContext(AuthContext);

  let drawer = (
    <div>
      <Avatar alt="Avatar" src="" className={classes.avatar} />
      <Typography variant="h6" align="center" paragraph>
        SampleUser
      </Typography>
      <List>
        <Link to="/dashboard" className={classes.link}>
          <ListItem button key={t("ダッシュボード")}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary={t("ダッシュボード")} />
          </ListItem>
        </Link>
        <Link to="/events" className={classes.link}>
          <ListItem button key={t("イベント")}>
            <ListItemIcon>
              <EventIcon />
            </ListItemIcon>
            <ListItemText primary={t("イベント")} />
          </ListItem>
        </Link>
        <Link to="/statistics" className={classes.link}>
          <ListItem button key={t("統計")}>
            <ListItemIcon>
              <EqualizerIcon />
            </ListItemIcon>
            <ListItemText primary={t("統計")} />
          </ListItem>
        </Link>
        <Link to="/social" className={classes.link}>
          <ListItem button key={t("ソーシャル")}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary={t("ソーシャル")} />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <Link to="/settings" className={classes.link}>
          <ListItem button key={t("設定")}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary={t("設定")} />
          </ListItem>
        </Link>
        <Link to="/logout" className={classes.link}>
          <ListItem button key={t("ログアウト")}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={t("ログアウト")} />
          </ListItem>
        </Link>
      </List>
    </div>
  );

  if (authContext.token === null) {
    drawer = (
      <div>
        <List>
          <Link to="/login" className={classes.link}>
            <ListItem button key={t("ログイン")}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary={t("ログイン")} />
            </ListItem>
          </Link>
          <Link to="/register" className={classes.link}>
            <ListItem button key={t("新規登録")}>
              <ListItemIcon>
                <PersonAddIcon />
              </ListItemIcon>
              <ListItemText primary={t("新規登録")} />
            </ListItem>
          </Link>
        </List>
      </div>
    );
  }
  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      <Hidden smUp implementation="js">
        <Drawer
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={props.mobileOpen}
          onClose={props.handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="js">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
}

export default ResponsiveDrawer;
