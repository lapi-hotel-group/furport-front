import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useTranslation } from "react-i18next";
import CloseFormModal from "./CloseFormModal";

import EventForm from "./EventForm";

export default function EventDetail(props) {
  const [showCloseModal, setShowCloseModal] = useState(false);
  const history = useHistory();
  const params = useParams();
  const event = props.events.find((el) => el.id.toString() === params.id);
  const { t } = useTranslation();
  return (
    <div>
      {!event ? history.push("/events/" + params.id) : null}
      {showCloseModal ? (
        <CloseFormModal
          setShowCloseModal={setShowCloseModal}
          closeHandler={() => history.push("/events/" + params.id)}
        />
      ) : null}
      <Dialog open onClose={() => setShowCloseModal(true)}>
        <DialogTitle>{t("app:components.events.event-edit.title")}</DialogTitle>
        <EventForm
          edit
          events={props.events}
          setEvents={props.setEvents}
          handleClose={() => setShowCloseModal(true)}
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
