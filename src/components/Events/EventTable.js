import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Pagination from "@material-ui/lab/Pagination";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import { Box } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import csc from "../../utils/csc";

import Tag from "./Tag";
import Star from "./Star";
import Attend from "./Attend";
import { AuthContext } from "../../auth/authContext";

const PAGE_SIZE = 20;

const useStyles = makeStyles((theme) => ({
  pointer: { cursor: "pointer" },
  pagination: {
    marginTop: theme.spacing(1),
    display: "inline-block",
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(3),
    zIndex: "10",
  },
}));

function EventTable(props) {
  const classes = useStyles();
  const history = useHistory();
  const { t, i18n } = useTranslation();

  const authContext = useContext(AuthContext);

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
            {props.sortedEvents
              .slice((props.page - 1) * PAGE_SIZE, props.page * PAGE_SIZE)
              .map((event) => (
                <TableRow hover key={event.id}>
                  <TableCell
                    onClick={() => history.push("/events/" + event.id)}
                    className={classes.pointer}
                  >
                    <Typography>
                      {new Date(event.start_datetime).toLocaleDateString() ===
                      new Date(event.end_datetime).toLocaleDateString()
                        ? new Intl.DateTimeFormat(i18n.language, {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            timeZone: event.timezone,
                          }).format(new Date(event.start_datetime))
                        : new Intl.DateTimeFormat(i18n.language, {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            timeZone: event.timezone,
                          }).format(new Date(event.start_datetime)) +
                          " 〜 " +
                          new Intl.DateTimeFormat(i18n.language, {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            timeZone: event.timezone,
                          }).format(new Date(event.end_datetime))}
                    </Typography>
                  </TableCell>
                  <TableCell
                    onClick={() => history.push("/events/" + event.id)}
                    className={classes.pointer}
                  >
                    <Typography>{event.name}</Typography>
                  </TableCell>
                  <TableCell
                    onClick={() => history.push("/events/" + event.id)}
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
                    <Tag
                      generalTags={event.general_tag}
                      generalTagsQuery={props.generalTagsQuery}
                      setGeneralTagsQuery={props.setGeneralTagsQuery}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box align="center">
        <Pagination
          count={Math.ceil(props.sortedEvents.length / PAGE_SIZE)}
          color="primary"
          className={classes.pagination}
          page={props.page}
          onChange={(event, page) => props.setPage(page)}
        />
      </Box>
      {authContext.token ? (
        <Tooltip
          title="Add"
          aria-label="add"
          onClick={() => history.push("/events/new")}
        >
          <Fab color="primary" className={classes.fab}>
            <AddIcon />
          </Fab>
        </Tooltip>
      ) : null}
    </>
  );
}

export default EventTable;
