import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import NightsStayIcon from "@material-ui/icons/NightsStay";

import { ThemeContext } from "../../theme/themeContext";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  title: {
    flexGrow: 1,
  },
}));
const Header = (props) => {
  const classes = useStyles();

  const themeContext = useContext(ThemeContext);

  return (
    <header>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={props.handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            FurPort
          </Typography>
          {themeContext.isDark ? (
            <IconButton
              color="inherit"
              onClick={() => themeContext.handleThemeChange(false)}
            >
              <WbSunnyIcon />
            </IconButton>
          ) : (
            <IconButton
              color="inherit"
              onClick={() => themeContext.handleThemeChange(true)}
            >
              <NightsStayIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;
