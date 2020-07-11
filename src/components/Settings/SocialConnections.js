import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";
import IconButton from "@material-ui/core/IconButton";
import TwitterIcon from "@material-ui/icons/Twitter";
import GitHubIcon from "@material-ui/icons/GitHub";

const useStyles = makeStyles((theme) => ({
  field: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const SocialConnections = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <>
      <Card className={classes.root}>
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5">
            {t("ソーシャルアカウント連携")}
          </Typography>
          <IconButton>
            <TwitterIcon />
          </IconButton>
          <IconButton>
            <GitHubIcon />
          </IconButton>
        </CardContent>
      </Card>
    </>
  );
};

export default SocialConnections;
