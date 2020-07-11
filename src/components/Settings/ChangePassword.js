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

const ChangePassword = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <>
      <Card className={classes.root}>
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5">
            {t("パスワード変更")}
          </Typography>
          <TextField
            required
            name="old_password"
            label={t("現在のパスワード")}
            type="password"
            fullWidth
            className={classes.field}
          />
          <TextField
            required
            name="new_password"
            label={t("新しいパスワード")}
            type="password"
            fullWidth
            className={classes.field}
          />
        </CardContent>
        <CardActions>
          <Grid item xs={12} align="right">
            <Button type="submit" variant="contained" color="primary" disabled>
              {t("更新")}
            </Button>
          </Grid>
        </CardActions>
      </Card>
    </>
  );
};

export default ChangePassword;
