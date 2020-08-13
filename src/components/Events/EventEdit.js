import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useTranslation } from "react-i18next";

import EventForm from "./EventForm";

export default function EventDetail(props) {
  const event = props.events.find(
    (el) => el.id.toString() === props.match.params.id
  );
  const [redirect, setRedirect] = useState(false);
  const { t } = useTranslation();

  const handleClose = () => {
    setRedirect(true);
  };

  return (
    <div>
      {redirect || !event ? (
        <Redirect to={"/events/" + props.match.params.id} />
      ) : null}
      <Dialog open onClose={handleClose}>
        <DialogTitle>{t("イベント編集")}</DialogTitle>
        <EventForm
          edit
          events={props.events}
          setEvents={props.setEvents}
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
