import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useTranslation } from "react-i18next";

import { AuthContext } from "../../auth/authContext";
import EventForm from "./EventForm";
import CloseFormModal from "./CloseFormModal";

export default function NewEvent(props) {
  const history = useHistory();
  const [showCloseModal, setShowCloseModal] = useState(false);
  const authContext = useContext(AuthContext);
  const { t } = useTranslation();

  if (!authContext.token) {
    history.push("/events");
  }

  return (
    <div>
      {showCloseModal ? (
        <CloseFormModal
          setShowCloseModal={setShowCloseModal}
          closeHandler={() => history.push("/events")}
        />
      ) : null}
      <Dialog open onClose={() => setShowCloseModal(true)}>
        <DialogTitle>{t("イベント作成")}</DialogTitle>
        <EventForm
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
