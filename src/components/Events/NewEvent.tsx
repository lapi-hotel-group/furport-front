import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import { Trans, useTranslation } from "react-i18next";

import { AuthContext } from "../../auth/authContext";
import EventForm from "./EventForm";
import CloseFormModal from "./CloseFormModal";

import { Event, Tag } from "../../models";

interface INewEventProps {
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[] | null>>;
  organizationTags: Tag[];
  setOrganizationTags: React.Dispatch<React.SetStateAction<Tag[] | null>>;
  characterTags: Tag[];
  setCharacterTags: React.Dispatch<React.SetStateAction<Tag[] | null>>;
  generalTags: Tag[];
  setGeneralTags: React.Dispatch<React.SetStateAction<Tag[] | null>>;
}

export const NewEvent: React.FC<INewEventProps> = (props) => {
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
        <DialogTitle>{t("app:components.events.new-event.title")}</DialogTitle>
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
            <Trans
              i18nKey="app:components.events.new-event.notice.check-guideline"
              components={{
                linkToGuidelineForCreateEvent: (
                  // eslint-disable-next-line
                  <a
                    href="https://docs.furport.tk/docs/how-to-create-event#イベント作成ガイドライン"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "inherit",
                    }}
                  />
                ),
              }}
            />
          </Typography>
        </blockquote>
        <EventForm
          events={props.events}
          setEvents={props.setEvents}
          organizationTags={props.organizationTags}
          setOrganizationTags={props.setOrganizationTags}
          characterTags={props.characterTags}
          setCharacterTags={props.setCharacterTags}
          generalTags={props.generalTags}
          setGeneralTags={props.setGeneralTags}
          handleClose={() => setShowCloseModal(true)}
          edit={false}
        />
      </Dialog>
    </div>
  );
};
