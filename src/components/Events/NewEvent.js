import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
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
        <blockquote
          style={{
            margin: "0 24px",
            padding: "4px 24px",
            borderLeft: "5px solid #ffe564",
            backgroundColor: "rgba(255,229,100,0.2)",
            whiteSpace: "pre-line",
          }}
        >
          <Typography display="inline" variant="body2">
            {t("イベント作成は初めてですか？\nまずは")}
            <a
              href="/docs/how-to-create-event#イベント作成ガイドライン"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "inherit",
              }}
            >
              {t("イベント作成ガイドライン")}
            </a>
            {t("をご覧ください！")}
          </Typography>
        </blockquote>
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
