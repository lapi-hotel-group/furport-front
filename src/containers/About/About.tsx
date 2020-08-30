import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ReactMarkdown from "react-markdown";

import ChangeLog from "../../components/Home/ChangeLog";
import Connection from "../../components/Home/Connection";

import { about } from "../../assets/text/about";
import { forDevelopers } from "../../assets/text/forDevelopers";

const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: "700px",
    padding: theme.spacing(3),
    margin: `0 auto`,
  },
  link: {
    color: "inherit",
  },
  markdown: {
    "& a": {
      color: "inherit",
    },
  },
}));

const About: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Grid container justify="center" spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <ReactMarkdown className={classes.markdown} source={about} />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <ReactMarkdown
                  className={classes.markdown}
                  source={forDevelopers}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Connection />
        </Grid>
        <Grid item xs={12}>
          <ChangeLog />
        </Grid>
      </Grid>
    </>
  );
};

export default About;
