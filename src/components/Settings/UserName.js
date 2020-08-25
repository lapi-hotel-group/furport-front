import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { useTranslation } from "react-i18next";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  field: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const UserName = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <>
      <Card className={classes.root}>
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5">
            {props.variant === "username"
              ? t("app:components.settings.change-username.title")
              : t("app:components.settings.change-email.title")}
          </Typography>
          <TextField
            required
            name={props.variant}
            label={
              props.variant === "username"
                ? t("glossary:words.username")
                : t("glossary:words.email")
            }
            type="text"
            fullWidth
            defaultValue={
              props.variant === "username"
                ? props.user.username
                : props.user.email
            }
            className={classes.field}
          />
        </CardContent>
        <CardActions>
          <Grid item xs={12} align="right">
            <Button type="submit" variant="contained" color="primary" disabled>
              {t("common:ui.button.change")}
            </Button>
          </Grid>
        </CardActions>
      </Card>
    </>
  );
};

export default UserName;
