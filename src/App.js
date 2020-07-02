import React, { useContext, useEffect } from "react";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Drawer from "./components/Drawer/Drawer";
import { ThemeContext } from "./theme/themeContext";
import darkTheme from "./theme/darkTheme";
import defaultTheme from "./theme/defaultTheme";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

function App() {
  const classes = useStyles();

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const context = useContext(ThemeContext);
  useEffect(() => {
    const isDark = localStorage.getItem("isDark");
    if (isDark === "true") {
      context.handleThemeChange(true);
    }
  }, [context]);

  return (
    <ThemeProvider
      theme={createMuiTheme(context.isDark ? darkTheme : defaultTheme)}
    >
      <CssBaseline />
      <div className={classes.root}>
        <Header handleDrawerToggle={handleDrawerToggle} />
        <Drawer
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
        <Container>
          <Home />
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
