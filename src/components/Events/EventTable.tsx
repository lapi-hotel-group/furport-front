import React, { useContext } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
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

import TagComponent from "./Tag";
import Star from "./Star";
import Attend from "./Attend";
import { AuthContext } from "../../auth/authContext";

import { Event } from "../../models";
import { IProfile } from "../../types";

const PAGE_SIZE = 20;

const useStyles = makeStyles((theme) =>
  createStyles({
    pointer: { cursor: "pointer" },
    pagination: {
      marginTop: theme.spacing(1),
      display: "inline-block",
    },
    fab: {
      position: "fixed",
      bottom: theme.spacing(2),
      right: theme.spacing(3),
      zIndex: 10,
    },
  })
);

interface IEventTableProps {
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[] | null>>;
  sortedEvents: Event[];
  profile: IProfile | null;
  setProfile: React.Dispatch<React.SetStateAction<IProfile | null>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  generalTagsQuery: string[];
  setGeneralTagsQuery: React.Dispatch<React.SetStateAction<string[]>>;
}

const EventTable: React.FC<IEventTableProps> = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();

  const authContext = useContext(AuthContext);

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{t("glossary:words.event-datetime")}</TableCell>
              <TableCell>{t("glossary:words.event-name")}</TableCell>
              <TableCell>{t("glossary:words.place")}</TableCell>
              <TableCell>{t("glossary:words.star")}</TableCell>
              <TableCell>{t("glossary:words.attend")}</TableCell>
              <TableCell>{t("glossary:words.tag")}</TableCell>
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
                    <Typography>{event.getDateString()}</Typography>
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
                      profile={props.profile}
                      setProfile={props.setProfile}
                    />
                  </TableCell>
                  <TableCell>
                    <Attend
                      id={event.id}
                      events={props.events}
                      setEvents={props.setEvents}
                      profile={props.profile}
                      setProfile={props.setProfile}
                    />
                  </TableCell>
                  <TableCell>
                    <TagComponent
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
      <Box>
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
};

export default EventTable;
