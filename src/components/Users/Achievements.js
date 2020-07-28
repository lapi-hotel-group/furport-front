import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import { Typography, Chip, Popover } from "@material-ui/core";
import ExploreIcon from "@material-ui/icons/Explore";
import CardTravelIcon from "@material-ui/icons/CardTravel";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
import DoneIcon from "@material-ui/icons/Done";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  popover: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
  },
}));

const Achievements = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState();
  const [popoverText, setPopoverText] = useState();

  let contribution = null;
  if (props.profile.events_created < 1) {
    // do nothing
  } else if (props.profile.events_created < 10) {
    contribution = (
      <Chip
        label={t("コントリビューター")}
        clickable
        color="primary"
        onClick={(e) => {
          setAnchorEl(e.currentTarget);
          setPopoverText(t("イベント情報を1個以上作成した。"));
        }}
        icon={<ExploreIcon />}
        className={classes.button}
      />
    );
  } else if (props.profile.events_created < 30) {
    contribution = (
      <Chip
        label={t("スーパーコントリビューター")}
        clickable
        style={{ backgroundColor: theme.palette.warning.main }}
        onClick={(e) => {
          setAnchorEl(e.currentTarget);
          setPopoverText(t("イベント情報を10個以上作成した。"));
        }}
        icon={<ExploreIcon />}
        className={classes.button}
      />
    );
  } else {
    contribution = (
      <Chip
        label={t("ダイアモンドコントリビューター")}
        clickable
        style={{ backgroundColor: theme.palette.info.main }}
        onClick={(e) => {
          setAnchorEl(e.currentTarget);
          setPopoverText(t("イベント情報を30個以上作成した。"));
        }}
        icon={<ExploreIcon />}
        className={classes.button}
      />
    );
  }

  let attend = null;
  if (props.profile.attend.length < 1) {
    // do nothing
  } else if (props.profile.attend.length < 30) {
    attend = (
      <Chip
        label={t("イベント経験者")}
        clickable
        color="primary"
        onClick={(e) => {
          setAnchorEl(e.currentTarget);
          setPopoverText(t("イベントに累計1回以上参加した。"));
        }}
        icon={<CardTravelIcon />}
        className={classes.button}
      />
    );
  } else if (props.profile.attend.length < 100) {
    attend = (
      <Chip
        label={t("イベント熟練者")}
        clickable
        style={{ backgroundColor: theme.palette.warning.main }}
        onClick={(e) => {
          setAnchorEl(e.currentTarget);
          setPopoverText(t("イベントに累計30回以上参加した。"));
        }}
        icon={<CardTravelIcon />}
        className={classes.button}
      />
    );
  } else {
    attend = (
      <Chip
        label={t("イベントマスター")}
        clickable
        style={{ backgroundColor: theme.palette.info.main }}
        onClick={(e) => {
          setAnchorEl(e.currentTarget);
          setPopoverText(t("イベントに累計100回以上参加した。"));
        }}
        icon={<CardTravelIcon />}
        className={classes.button}
      />
    );
  }

  const set = new Set([]);
  let countryNum = 0;
  props.events.forEach((el) => {
    if (!set.has(el.country)) {
      countryNum++;
      set.add(el.country);
    }
  });
  let overseas = null;
  if (countryNum < 2) {
    // do nothing
  } else if (countryNum < 10) {
    overseas = (
      <Chip
        label={t("インターナショナル")}
        clickable
        color="primary"
        onClick={(e) => {
          setAnchorEl(e.currentTarget);
          setPopoverText(t("2か国以上のイベントに参加した。"));
        }}
        icon={<FlightTakeoffIcon />}
        className={classes.button}
      />
    );
  } else if (countryNum < 20) {
    overseas = (
      <Chip
        label={t("グローバル")}
        clickable
        style={{ backgroundColor: theme.palette.warning.main }}
        onClick={(e) => {
          setAnchorEl(e.currentTarget);
          setPopoverText(t("10か国以上のイベントに参加した。"));
        }}
        icon={<FlightTakeoffIcon />}
        className={classes.button}
      />
    );
  } else {
    overseas = (
      <Chip
        label={t("スーパーグローバル")}
        clickable
        style={{ backgroundColor: theme.palette.info.main }}
        onClick={(e) => {
          setAnchorEl(e.currentTarget);
          setPopoverText(t("20か国以上のイベントに参加した。"));
        }}
        icon={<FlightTakeoffIcon />}
        className={classes.button}
      />
    );
  }

  return (
    <div>
      {props.profile.is_moderator ? (
        <Chip
          label={t("モデレーター")}
          clickable
          color="primary"
          onClick={(e) => {
            setAnchorEl(e.currentTarget);
            setPopoverText(t("FurPortイベント情報管理者。"));
          }}
          icon={<DoneIcon />}
          className={classes.button}
        />
      ) : null}
      {contribution}
      {attend}
      {overseas}
      <Popover
        open={anchorEl}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Typography className={classes.popover}>{popoverText}</Typography>
      </Popover>
    </div>
  );
};

export default Achievements;
