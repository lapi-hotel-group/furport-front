import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import NightsStayIcon from "@material-ui/icons/NightsStay";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TranslateIcon from "@material-ui/icons/Translate";

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
  formControl: {
    margin: theme.spacing(1),
  },
}));

const Header = (props) => {
  const { i18n } = useTranslation();
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
          <FormControl className={classes.formControl}>
            <Select
              displayEmpty
              defaultValue=""
              onChange={(e) => i18n.changeLanguage(e.target.value)}
            >
              <MenuItem value="" disabled>
                <TranslateIcon />
              </MenuItem>
              <MenuItem value="ja">日本語</MenuItem>
              <MenuItem value="en">English</MenuItem>
            </Select>
          </FormControl>
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
