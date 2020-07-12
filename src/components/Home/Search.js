import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";
import { init } from "ityped";

const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: "700px",
  },
  search: {
    width: "100%",
    display: "flex",
    marginBottom: theme.spacing(1),
  },
  relative: {
    position: "relative",
  },
  searchInput: {
    flexGrow: "1",
    marginLeft: theme.spacing(3),
  },
  searchButton: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(3),
    height: "56px",
  },

  "@keyframes typing": {
    from: { width: 0 },
  },

  "@keyframes cursor": {
    "50%": { borderRightColor: "transparent" },
  },

  animeType: {
    position: "absolute",
    left: theme.spacing(3) + 15,
    top: "12px",
    width: "20ch",
  },
}));

const UserName = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();
  useEffect(() => {
    const myElement = document.querySelector("#myElement");
    init(myElement, {
      showCursor: false,
      backDelay: 2500,
      strings: [
        "Anthrocon",
        "JMoF",
        "United States",
        "東京都",
        "Convention",
        "Poker",
      ],
    });
  }, []);
  return (
    <>
      <Paper className={classes.paper}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Typography gutterBottom variant="h5">
              {t("賢く検索")}
            </Typography>
            <Typography>
              {t(
                "イベント名、開催地、タグ、キーワードから素早くイベントを検索できます。"
              )}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.relative + " " + classes.search}>
              <TextField
                id="outlined-search"
                disabled
                type="search"
                placeholder=""
                InputLabelProps={{
                  shrink: true,
                }}
                className={classes.searchInput}
              ></TextField>
              <div className={classes.animeType}>
                <Typography
                  align="left"
                  id="myElement"
                  variant="h6"
                ></Typography>
              </div>
              <Button
                variant="contained"
                color="primary"
                className={classes.searchButton}
              >
                {t("検索")}
              </Button>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default UserName;
