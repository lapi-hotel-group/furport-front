import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box, Divider } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import p from "../../../package.json";

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
        <Link to="/about" className={classes.link}>
          <Typography display="inline" variant="body2">
            {t("FurPortについて")}
          </Typography>
        </Link>
        <Link to="/terms" className={classes.link}>
          <Typography display="inline" variant="body2">
            {t("利用規約")}
          </Typography>
        </Link>
        <a
          href="https://api.furport.tk/swagger"
          className={classes.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Typography display="inline" variant="body2">
            {t("API")}
          </Typography>
        </a>
      </Box>
      <Typography align="center" variant="body2" color="secondary">
        FurPort v{p.version} Copyright © 2020 lapi.gq
      </Typography>
    </footer>
  );
};

export default Footer;
