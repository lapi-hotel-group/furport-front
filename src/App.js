import React, { useContext, useEffect } from "react";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Route, Switch } from "react-router-dom";

import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Drawer from "./components/Drawer/Drawer";
import Home from "./containers/Home/Home";
import Dashboard from "./containers/Dashboard/Dashboard";
import Events from "./containers/Events/Events";
import Statistics from "./containers/Statistics/Statistics";
import Social from "./containers/Social/Social";
import Settings from "./containers/Settings/Settings";
import Logout from "./containers/Logout/Logout";
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
          <Main>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/events" component={Events} />
              <Route exact path="/statistics" component={Statistics} />
              <Route exact path="/social" component={Social} />
              <Route exact path="/settings" component={Settings} />
              <Route exact path="/logout" component={Logout} />
            </Switch>
          </Main>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
