import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useTranslation } from "react-i18next";

import { AuthContext } from "../../auth/authContext";
import EventForm from "./EventForm";

const useStyles = makeStyles((theme) => ({
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
  field: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  formControl: {
    display: "flex",
  },
  searchInput: {
    flexGrow: "1",
  },
}));

export default function NewEvent(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [redirect, setRedirect] = useState(null);

  const authContext = useContext(AuthContext);
  const { t } = useTranslation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!authContext.token) {
    return null;
  }

  return (
    <div>
      {redirect ? <Redirect to={"/events/" + redirect} /> : null}
      <Tooltip title="Add" aria-label="add" onClick={handleClickOpen}>
        <Fab color="primary" className={classes.absolute}>
          <AddIcon />
        </Fab>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{t("イベント作成")}</DialogTitle>
        <EventForm
          events={props.events}
          setEvents={props.setEvents}
          setRedirect={setRedirect}
          handleClose={handleClose}
          organizationTags={props.organizationTags}
          setOrganizationTags={props.setOrganizationTags}
          characterTags={props.characterTags}
          setCharacterTags={props.setCharacterTags}
          generalTags={props.generalTags}
          setGeneralTags={props.setGeneralTags}
        />
      </Dialog>
    </div>
  );
}
