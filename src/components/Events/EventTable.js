import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { useTranslation } from "react-i18next";
import { withRouter } from "react-router";
import csc from "country-state-city";

import Tag from "./Tag";
import Star from "./Star";
import Attend from "./Attend";

const useStyles = makeStyles({
  pointer: { cursor: "pointer" },
});

function EventTable(props) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{t("開催日時")}</TableCell>
              <TableCell>{t("イベント名")}</TableCell>
              <TableCell>{t("場所")}</TableCell>
              <TableCell>{t("スター")}</TableCell>
              <TableCell>{t("参加")}</TableCell>
              <TableCell>{t("タグ")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.sortedEvents.map((event) => (
              <TableRow hover key={event.id}>
                <TableCell
                  onClick={() => props.history.push("/events/" + event.id)}
                  className={classes.pointer}
                >
                  <Typography>
                    {new Date(event.start_datetime).toLocaleDateString() ===
                    new Date(event.end_datetime).toLocaleDateString()
                      ? new Date(event.start_datetime).toLocaleDateString()
                      : new Date(event.start_datetime).toLocaleDateString() +
                        " 〜 " +
                        new Date(event.end_datetime).toLocaleDateString()}
                  </Typography>
                </TableCell>
                <TableCell
                  onClick={() => props.history.push("/events/" + event.id)}
                  className={classes.pointer}
                >
                  <Typography>{event.name}</Typography>
                </TableCell>
                <TableCell
                  onClick={() => props.history.push("/events/" + event.id)}
                  className={classes.pointer}
                >
                  <Typography>
                    {t(csc.getCountryById(event.country.toString()).name) +
                      " " +
                      t(csc.getStateById(event.state.toString()).name)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Star
                    id={event.id}
                    events={props.events}
                    setEvents={props.setEvents}
                    stars={props.stars}
                    setStars={props.setStars}
                  />
                </TableCell>
                <TableCell>
                  <Attend
                    id={event.id}
                    events={props.events}
                    setEvents={props.setEvents}
                    attends={props.attends}
                    setAttends={props.setAttends}
                  />
                </TableCell>
                <TableCell>
                  <Tag generalTags={event.general_tag} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default withRouter(EventTable);
