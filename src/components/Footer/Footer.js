import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box, Divider } from "@material-ui/core";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  footer: {
    position: "absolute",
    bottom: "0",
    width: "100%",
    height: "100px",
  },
  divider: {
    margin: theme.spacing(2),
  },
  link: {
    textDecoration: "none",
    color: "inherit",
    margin: theme.spacing(1),
  },
}));

const Footer = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <footer className={classes.footer}>
      <Divider className={classes.divider} />
      <Box align="center">
        <Typography display="inline" variant="body2" className={classes.link}>
          {t("FurPortについて")}
        </Typography>
        <Typography display="inline" variant="body2" className={classes.link}>
          {t("利用規約")}
        </Typography>
      </Box>
      <Typography align="center" variant="body2" color="secondary">
        Copyright © 2020 lapi.gq
      </Typography>
    </footer>
  );
};

export default Footer;
