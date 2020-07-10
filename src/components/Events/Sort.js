import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginBottom: theme.spacing(4),
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  formControl: {
    margin: theme.spacing(1),
    marginRight: theme.spacing(4),
    minWidth: 120,
  },
}));

export default function Sort(props) {
  const classes = useStyles();
  const { t } = useTranslation();

  const handleChangeSort = (event) => {
    props.setSort(event.target.value);
  };

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>{t("ソート")}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <FormControl className={classes.formControl}>
              <InputLabel>{t("ソート順")}</InputLabel>
              <Select value={props.sort} onChange={handleChangeSort}>
                <MenuItem value="dateTime_down">
                  {t("開催日時が新しい順")}
                </MenuItem>
                <MenuItem value="dateTime_up">{t("開催日時が古い順")}</MenuItem>
                <MenuItem value="stars">{t("スターが多い順")}</MenuItem>
                <MenuItem value="attends">{t("参加者が多い順")}</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  checked={props.filterStared}
                  onChange={() => props.setFilterStared(!props.filterStared)}
                  color="primary"
                />
              }
              label={t("スター付きのみ表示")}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={props.filterAttended}
                  onChange={() =>
                    props.setFilterAttended(!props.filterAttended)
                  }
                  color="primary"
                />
              }
              label={t("参加付きのみ表示")}
            />
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
