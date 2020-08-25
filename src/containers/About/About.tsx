import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ReactMarkdown from "react-markdown";
import { about } from "../../assets/text/about";
import { forDevelopers } from "../../assets/text/forDevelopers";

const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: "700px",
    padding: theme.spacing(3),
  },
  link: {
    color: "inherit",
  },
}));

const About: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Grid container spacing={3}>
        <Grid container justify="center" item xs={12}>
          <Paper className={classes.paper}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <ReactMarkdown source={about} />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid container justify="center" item xs={12}>
          <Paper className={classes.paper}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <ReactMarkdown source={forDevelopers} />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default About;
