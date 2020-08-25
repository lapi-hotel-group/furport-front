import React, { useState } from "react";
import {
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core/";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import { useTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";

const Attendees = (props) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUser = (username) => {
    props.history.push("/users/" + username);
  };

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <AvatarGroup>
          {props.event.attend.map((el) => (
            <Avatar key={el.user} alt={el.user} src={el.avatar} />
          ))}
        </AvatarGroup>
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{t("app:components.events.attendees.title")}</DialogTitle>
        <DialogContent>
          <List>
            {props.event.attend.map((el) => (
              <ListItem
                key={el.user}
                button
                onClick={() => handleUser(el.user)}
              >
                <ListItemIcon>
                  <Avatar alt={el.user} src={el.avatar} />
                </ListItemIcon>
                <ListItemText primary={el.user} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} color="primary">
            {t("common:ui.button.close")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default withRouter(Attendees);
