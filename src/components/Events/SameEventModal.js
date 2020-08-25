import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  buttonProgress: {
    color: "primary",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));
export default function AlertDialog(props) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <>
      <Dialog open onClose={() => props.setSameEventsName(null)}>
        <DialogTitle>
          {t("app:components.events.same-event-modal.title")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t(
              "app:components.events.same-event-modal.messages.confirm-register-same-day-event",
              { eventName: props.subDataBuf.name }
            )}
          </DialogContentText>
          <DialogContentText>
            {t(
              "app:components.events.same-event-modal.messages.already-registered-events",
              {
                count: props.sameEventsName.length,
              }
            )}
            <br />
            <ul>
              {props.sameEventsName.map((el, i) => (
                <li key={i}>{el}</li>
              ))}
            </ul>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => props.setSameEventsName(null)}
            color="secondary"
          >
            {t("common:ui.button.cancel")}
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={props.loading}
            onClick={() =>
              props.submitHandler({
                ...props.subDataBuf,
                create_same_day_event: "true",
              })
            }
          >
            {t("common:ui.button.create")}
            {props.loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
